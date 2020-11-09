import { Router } from '@angular/router';
import { Handlers } from 'src/app/shared/handlers';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../../services/user/user.service';
import { catchError } from 'rxjs/operators';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertService } from '../../services/utilities/alert.service';
import { ProfileService } from '../../services/user/profile.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { File as Filler, IWriteOptions, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Platform } from '@ionic/angular';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss', '../../../theme/payments.scss'],
})
export class ProfilePage implements OnInit {

  userPhone;
  images;

  state = {
    hasBVN: false,
    hasProfilePic: false,
    hasDocuments: false,
    hasDob: false,
    hasNok: false
  };

  currentUser = {
    firstName: null,
    lastName: null,
    emailAddress: null
  }
  sourceType;

  options: CameraOptions = {
    quality: 40,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
    // sourceType: this.sourceType,
    targetWidth: 400,
    targetHeight: 400,
    // allowEdit: true,
    correctOrientation: true
  };

  cropOptions: CropOptions = {
    quality: 30,
    // targetHeight: 800,
    // targetWidth: 800
  }

  BVN: string;
  photo: SafeResourceUrl;

  constructor(
    private profileSrvc: ProfileService,
    private alertSrvc: AlertService,
    private loaderSrvc: LoaderService,
    private userSrvc: UserService,
    private readonly sanitizer: DomSanitizer,
    private file: Filler,
    private camera: Camera,
    private filePath: FilePath,
    private webview: WebView,
    private plt: Platform,
    private handlers: Handlers,
    private crop: Crop,
    private router: Router
  ) { }

  ngOnInit() {
    this.plt.ready().then(() => {
      // this.loadStoredImages();
    });

    this.userPhone = this.profileSrvc.getUserPhone();
    this.profileSrvc.getUserProfilePicture().subscribe(res => {
      // console.log(res);
      this.photo = res;
    });
  }

  ionViewWillEnter() {
    this.getUserProfile();
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      const converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const fd = new FormData();
      fd.append('PhoneNumber', this.userPhone);
      fd.append('ProfilePassport', imgBlob);
      this.loaderSrvc.showLoader();
      this.profileSrvc._uploadProfileSelfie(fd).subscribe((res: any) => {
        this.loaderSrvc.dismissAllLoaders();
        if (res.resultCode === '200') {
          // save photo.localStorage
          // this.profileSrvc.storeProfilePhoto(photoPath);
          this.alertSrvc.displaySuccessModal('Picture Upload Successful', '/home/profile');
        } else {
          this.alertSrvc.showErrorToast('Upload Unsuccessful, please try again');
        }
        console.log(res);
      }, (err) => this.catchError());
    };
    reader.readAsArrayBuffer(file);
  }

  selectImageSource() {
    const buttons = [
      {
        text: 'Camera',
        role: 'camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Camera clicked');
          this.options['sourceType'] = this.camera.PictureSourceType.CAMERA;
          this.takePicture();
        }
      },
      {
        text: 'Gallery',
        role: 'gallery',
        icon: 'images-outline',
        handler: () => {
          console.log('Gallery clicked');
          this.options['sourceType'] = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
          this.takePicture();
        }
      },
    ]
    this.handlers.showActionSheet("Select image source", buttons)
  }

  takePicture() {
    this.camera.getPicture(this.options).then((imageData) => {
      this.cropAndConvertImage(imageData).then(
        imageBase64 => {
          imageData = imageBase64
          console.log(this.handlers.base64FileSize(imageData), "bytes");

          if (this.handlers.base64FileSize(imageData) > 100000) {
            this.alertSrvc.showErrorToast("Image selected is too large. Please select another and try again");
            return;
          }

          const fd = new FormData();
          fd.append('PhoneNumber', this.userPhone);
          fd.append('PhotoAsBase64String', imageData);

          this.loaderSrvc.showLoader();
          this.profileSrvc._uploadProfileSelfie(fd).subscribe((res: any) => {
            this.loaderSrvc.dismissAllLoaders();
            if (res.resultCode === '200') {
              // save photo.localStorage
              // this.profileSrvc.storeProfilePhoto(photoPath);
              this.loaderSrvc.hideLoader();
              this.alertSrvc.displaySuccessModal('Picture Upload Successful', '/home/profile');
              this.profileSrvc.setUserProfilePicture('data:image/jpeg;base64,' + imageData);
            } else {
              this.loaderSrvc.hideLoader();
              this.alertSrvc.showErrorToast('Upload Unsuccessful, please try again');
            }
            console.log(res);
          }, (err) => {
            this.loaderSrvc.hideLoader();
            this.catchError()
          });

        },
        err => {
          this.alertSrvc.showErrorToastDown("An error occurred. Please select another image");
          console.log("Error at cropping image is ==> ", err);
        }
      );

    }, (err) => {
      console.log(err);
      this.alertSrvc.showErrorToast(err);
      // Handle error
    });
  }

  cropAndConvertImage(imgPath) {
    return new Promise((resolve, reject) => {
      this.crop.crop(imgPath, this.cropOptions)
        .then(
          croppedImage => {
            const ImagePath = croppedImage.split('?')[0];
            const splitPath = ImagePath.split('/');
            const imageName = splitPath[splitPath.length - 1];
            const filePath = ImagePath.split(imageName)[0];

            this.file.readAsDataURL(filePath, imageName).then(base64 => {
              resolve(base64.split(',')[1]);
            }, error => {
              console.log('Error in showing image' + error);
            });
          },
          error => {
            reject(error);
          }
        );
    })

    // if (this.plt.is('ios')) {
    //   imgPath = imgPath;
    // } else if (this.plt.is('android')) {
    //   // Modify fileUri format, may not always be necessary
    //   imgPath = 'file://' + imgPath;
    // }
  }

  getUserProfile() {
    this.loaderSrvc.showLoader();
    this.userSrvc.getUserProfileData(this.userPhone).subscribe(res => {
      if (res) {
        this.loaderSrvc.hideLoader();
        this.profileSrvc.setUserProfileData(res);
        // console.log(res)
        this.setState(res, this.state);
      } else {
        this.catchError();
      }
    }, () => this.catchError());
  }

  setState(data, state) {
    state.hasBVN = data.isBvnSET;
    state.hasProfilePic = data.isProfilePicSET;
    state.hasDocuments = data.isDocumentsUploaded;
    state.hasNok = (data.nokFullName && data.nokEmailAddress && data.nokPhone && data.nokRelationship) ? true : false;

    // Set Dob state using response data
    if (data.dob === '0001-01-01T00:00:00' || data.dob === null || data.dob === undefined) {
      console.log('No birthday');
      state.hasDob = false;
    } else {
      state.hasDob = true;
    }

    // Set BVN state using response data
    if (data.bvn === '' || data.bvn === null || data.bvn === undefined) {
      state.hasBVN = false;
    } else {
      state.hasBVN = true;
      this.BVN = data.bvn;
    }
    console.log(state);


    this.currentUser.firstName = data.firstName;
    this.currentUser.lastName = data.lastName;
    this.currentUser.emailAddress = data.emailAddress;
  }

  catchError() {
    this.loaderSrvc.dismissAllLoaders();
    this.alertSrvc.showErrorToast('Error while processing request');
  }

  updateSQnA() {
    console.log("Update SQnA");
    this.router.navigate(['home/profile/security-questions'], { state: { update: true } })
  }


}
