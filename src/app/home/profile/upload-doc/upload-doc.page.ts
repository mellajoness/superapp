import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { ProfileService } from '../../../services/user/profile.service';
import { LoaderService } from '../../../services/utilities/loader.service';
import { AlertService } from '../../../services/utilities/alert.service';
import { FileUploader, FileLikeObject, FileItem } from 'ng2-file-upload';
import { FormGroup, FormControl, Validators } from '@angular/forms';


export interface MyData {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-upload-doc',
  templateUrl: './upload-doc.page.html',
  styleUrls: ['./upload-doc.page.scss', '../../../../theme/payments.scss'],
})
export class UploadDocPage implements OnInit {

  fileuploaderOptions = {
    allowedMimeType: ['application/pdf', 'image/jpeg', 'image/png'],
    maxFileSize: 5 * 1024 * 1024, // 5mb
  };

  idTypeForm = new FormGroup({
    idType: new FormControl('', Validators.required),
  });

  public idUploader: FileUploader = new FileUploader(this.fileuploaderOptions);
  public signatureUploader: FileUploader = new FileUploader(this.fileuploaderOptions);
  public utilUploader: FileUploader = new FileUploader(this.fileuploaderOptions);


  ValidID: any = ['Driver\'s license', 'International Passport', 'NIMC', 'Voter\'s Card'];

   // File details
   fileName: string;
   fileSize: number;

   utilBillName;
   signatureName;
   IDName;

   userPhone;
   errorMsg;

   form: {
    phoneNumber: string;
    utilBill: File | null;
    signature: File | null;
    validID: File | null;
  };

  documentData = new FormData();

  constructor(
    // private appSrvc: AppServiceService,
    private profileSrvc: ProfileService,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService) {
    this.form = {
      phoneNumber: '',
      utilBill: null,
      signature: null,
      validID: null
    };
   }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userSrvc.currentUserProfile.subscribe(res => {
      this.userPhone = res.phoneNumber;
    });
  }

  getIDFile(): FileLikeObject[] {
    return this.idUploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  getSignFile(): FileLikeObject[] {
    return this.signatureUploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  getUtilBillFile(): FileLikeObject[] {
    return this.utilUploader.queue.map((fileItem) => {
      return fileItem.file;
    });
  }

  onBillFileChanged(event) {
    console.log( event.target.files[0].name);
    this.utilBillName = event.target.files[0].name;
  }

  onSignatureFileChanged(event) {
    console.log( event.target.files[0].name);
    this.signatureName = event.target.files[0].name;
  }

  onIDFileChanged(event) {
    console.log( event.target.files[0].name);
    this.IDName = event.target.files[0].name;
  }

  get documentState(){
    return this.utilUploader.queue.length > 0 &&
    this.signatureUploader.queue.length &&
    this.idUploader.queue.length > 0 &&
    this.idTypeForm.valid;
  }


  async upload() {
   
    const IdFile = this.getIDFile();
    const signatureFile = this.getSignFile();
    const utilityBillFile = this.getUtilBillFile();

    this.documentData.append('PhoneNumber', this.userPhone);
    this.documentData.append('ValidIdName', this.idTypeForm.value.idType);

    await IdFile.forEach((file) => {
        this.documentData.append('ValidId', file.rawFile);
    });

    await signatureFile.forEach((file) => {
        this.documentData.append('Signature', file.rawFile);
    });

    await utilityBillFile.forEach((file) => {
        this.documentData.append('UtilBill', file.rawFile);
    });
    this.loaderSrvc.showLoader();
    console.log(this.documentData.has('PhoneNumber'));
    console.log(this.documentData.has('UtilBill'));
    console.log(this.documentData.has('ValidId'));
    console.log(this.documentData.has('Signature'));
    console.log(this.documentData.has('Chuzzyure'));

    await this.profileSrvc._uploadFile(this.documentData).subscribe((response: any) => {
      this.loaderSrvc.hideLoader();
      if (response.resultCode === '200') {
        this.alertSrvc.displayProfileSuccessModal('Documents successfully updated', 'home/profile');
      } else {
        this.alertSrvc.showErrorToast('Upload Unsuccessful, please try again');
      }
      console.log(response);
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing request');
    });

  }

//   upload() {
//     this.documentData.append('PhoneNumber', this.userPhone);
//     this.documentData.append('UtilBill', this.form.utilBill);
//     this.documentData.append('ValidId', this.form.phoneNumber);
//     this.documentData.append('Signature', this.form.signature);
//     // let formData = new FormData();
//     // for (var i = 0; i < this.uploadedFiles.length; i++) {
//     //     formData.append("uploads[]", this.uploadedFiles[i], this.uploadedFiles[i].name);
//     // }
//     // console.log(formData);
//     // this.http.post('/api/upload', formData)
//     //     .subscribe((response) => {
//     //         console.log('response received is ', response);
//     //     })
//     console.log(this.documentData.has('PhoneNumber'));
//     console.log(this.documentData.has('UtilBill'));
//     console.log(this.documentData.has('ValidId'));
//     console.log(this.documentData.has('Signature'));
//     console.log(this.documentData.has('Chuzzyure'));
//     console.log(this.documentData.get('Signature'));
// }

  changeID(e) {
    this.documentData.set('ValidIdName', e.target.value);
  }


  uploadFile(e, fileName) {
      // The File object
      // const file = e.item(0) as File;
      const file = e.target.files[0] as File;
      const allowedExtension = ['png', 'jpeg', 'jpg'];
      const fileSize = file.size / 1000;
      const fileExtension = file.type.split('/')[1];

      if (fileSize > 1000 ) {
        this.errorMsg = 'Allowed file size is 1 MB';
        // setTimeout(() => {
        //   this.errorMsg = null;
        // }, 5000);
        return;
      } else if ( allowedExtension.indexOf(fileExtension) < 0) {
        this.errorMsg = 'Only PNG, JPG, and JPEg files are allowed';
        // setTimeout(() => {
        //   this.errorMsg = null;
        // }, 5000);
        return;
      } else {
        this.documentData.append(fileName, file);
        this.documentData.append('PhoneNumber', this.userPhone);
        // this.formData.append('documentName', fileName);
        // console.log(formData, fileName);
        // this.uploadedFiles.push(fileName);
        // this.submitFile(formData, fileName);
      }
  }

  submitFile() {
    this.documentData.append('PhoneNumber', this.userPhone);
    this.loaderSrvc.showLoader();
    this.profileSrvc._uploadFile(this.documentData).subscribe((response: any) => {
      this.loaderSrvc.hideLoader();
      if(response.resultCode === '200'){
        this.alertSrvc.displayProfileSuccessModal('Documents successfully updated', 'home/profile');
      } else{
        this.alertSrvc.showErrorToast('Upload Unsuccessful, please try again');
      }
      console.log(response);
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing request');
    });
    // new Response(this.documentData).text().then(console.log);
    // console.log(this.documentData.has('ValidIdName'));
    // console.log(this.documentData.get('ValidIdName'));
    // console.log(this.documentData.get('PhoneNumber'));
    //     console.log(this.documentData.has('UtilBill'));
    //     console.log(this.documentData.has('ValidId'));
    //     console.log(this.documentData.has('Signature'));
    //     console.log(this.documentData.has('Chuzzyure'));
    //     console.log(this.documentData.get('Signature'));
 }

}
