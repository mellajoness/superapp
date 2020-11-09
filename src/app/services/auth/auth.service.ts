import { AppVersion } from '@ionic-native/app-version/ngx';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { Observable, pipe, throwError, BehaviorSubject, Subject } from 'rxjs';
import { Constants } from '../../config/constants';
import { map, tap, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../utilities/alert.service';
import { UserService } from '../user/user.service';
import { LoaderService } from '../utilities/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthenticated: boolean;
  private currentToken: BehaviorSubject<any>;
  public currentTokenData: Observable<any>;
  private currentSessionID: BehaviorSubject<any>

  constructor(
    private httpService: HttpService,
    private storageService: StorageService,
    private router: Router,
    private alertService: AlertService,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private platform: Platform,
    private appVersion: AppVersion
  ) {
    this.currentToken = new BehaviorSubject<any>('');
    this.currentTokenData = this.currentToken.asObservable();
    this.currentSessionID = new BehaviorSubject<any>('');
  }

  updateTokenSubject(data) {
    this.currentToken.next(data);
  }

  updateSessionIDSubject(data) {
    this.currentSessionID.next(data);
  }

  get currentSessionIDData() {
    return this.currentSessionID.asObservable();
  }

  // toaster: any;

  login(postData: any): Observable<any> {
    // return this.httpService.post('UserProfile/Login', postData);
    return this.httpService.post('Login', postData);
  }

  setSession(authResult) {
    console.log(authResult);
    this.storageService.store(Constants.USERDATA, {
      id_token: authResult.Token,
      user_firstName: authResult.FirstName,
      user_lastName: authResult.LastName,
      user_email: authResult.EmailAddress,
      user_phone: authResult.MobilePhone
    });
  }

  storeUserPhone(value) {
    this.storageService.store('userPhone', value);
  }


  async getUserProfile(authResult) {
    await this.userSrvc.getUserProfileData(authResult.MobilePhone).subscribe(
      res => {
        this.userSrvc.setUserProfileData(res);
      }
    );
  }

  signup(postData: any): Observable<any> {
    // return this.httpService.post('UserProfile/CreateUser', postData).pipe(
    return this.httpService.post('CreateUser', postData).pipe(
      tap(() => this.storeUserPhone(postData.phoneNumber))
    );
  }

  clearData() {
    this.isAuthenticated = false;
    this.updateTokenSubject('');
    this.storageService.removeItem(Constants.TOKEN);
    this.storageService.removeItem(Constants.USERPROFILE);
    this.storageService.removeItem(Constants.FINPHONE);
  }

  handleError(error: HttpErrorResponse) {
    if (error.error.resultCode === '401') {
      this.alertService.showErrorToast('Wrong username or password');
      return;
    }
    this.loaderSrvc.dismissAllLoaders();
    this.alertService.showErrorToast('Error Processing Request');

    return throwError(error);
  }

  async getAppVersion() {
    let versionObject = {
      code: null,
      number: null
    }
    if (this.platform.is('cordova')) {
      await this.appVersion.getVersionCode().then(
        res => {
          versionObject.code = res;
          console.log("App version code is", res)
        }
      );
      await this.appVersion.getVersionNumber().then(
        res => {
          versionObject.number = res;
          console.log("App version number is", res)
        }
      );
      console.log(versionObject);
      return versionObject.number
    }
    else {
      console.log("AppVersion: Platform is not Cordova", "Setting manual version for test sake");
      versionObject = {
        number: "0.0.1",
        code: "1"
      }
      return versionObject.number
    }
    
  }
}
