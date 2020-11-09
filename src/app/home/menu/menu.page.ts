import { SharedData } from 'src/app/shared/shared.components';
import { AuthService } from './../../services/auth/auth.service';
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

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  photo: SafeResourceUrl;
  userPhone;
  currentUser = {
    firstName: null,
    lastName: null,
    emailAddress: null
  };

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
    private authSrvc: AuthService,
    private sharedData: SharedData
  ) {
    this.getUserProfile();
   }

  ngOnInit() {
    this.profileSrvc.getUserProfilePicture().subscribe(res => {
      // console.log(res);
      this.photo = res;
    });
  }

  logout() {
    this.authSrvc.clearData();
    this.presentExitApp();
  }

  async presentExitApp() {
    this.alertSrvc.displayExitAppModal('Logout?', '/auth')
  }

  getUserProfile() {
    const res = this.sharedData.userProfile;
    this.currentUser.firstName = res.firstName;
    this.currentUser.lastName = res.lastName;
    this.currentUser.emailAddress = res.emailAddress;
    // this.userPhone = this.profileSrvc.getUserPhone();
    // this.loaderSrvc.showLoader();
    // this.userSrvc.getUserProfileData(this.userPhone).subscribe(res => {
    //   if (res) {
    //     this.loaderSrvc.hideLoader();
    //     console.log(res);
    //   } else {
    //     this.catchError();
    //   }
    // }, () => this.catchError());
  }

  catchError() {
    this.loaderSrvc.dismissAllLoaders();
    this.alertSrvc.showErrorToast('Error while processing request');
  }

}
