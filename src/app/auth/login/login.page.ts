import { Device } from '@ionic-native/device/ngx';
import { DeviceService } from './../../services/utilities/device.service';
import { Encryption } from './../../services/encryption/encryption';
import { BiometricsService } from './../../services/auth/biometrics.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { LoaderService } from '../../services/utilities/loader.service';
import { AlertService } from '../../services/utilities/alert.service';
import { ProfileService } from '../../services/user/profile.service';
import { UserService } from '../../services/user/user.service';
import { PasswordPinService } from 'src/app/services/security/password-pin.service';
import { Constants } from '../../config/constants';
import { SharedData } from 'src/app/shared/shared.components';
import { SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss', '../../../theme/login.scss'],
})
export class LoginPage implements OnInit {

  postData = {
    phonemail: '',
    password: '',
    phoneUUID: '',
    playerId: '',
    mobileAppVersion: ''
  };

  storedUserPhone: string;

  userRes;

  loginForm: FormGroup;
  passwordType = 'password';
  passwordShown = false;

  biometricToken;
  canUseBiometrics;
  isDivHidden = true;
  isDivHidden_ = true;

  photo: SafeResourceUrl;
  deviceInfo!: Device;



  get emailOrPhone() {
    return this.loginForm.get('emailOrPhone');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(
    private formBildr: FormBuilder,
    private router: Router,
    private authSrvc: AuthService,
    private alertSrvc: AlertService,
    private storageService: StorageService,
    private loaderSrvc: LoaderService,
    private profileSrvc: ProfileService,
    private passwordPinSrvc: PasswordPinService,
    private userSrvc: UserService,
    public sharedData: SharedData,
    private biometricsService: BiometricsService,
    private encryption: Encryption,
    private deviceService: DeviceService
  ) {
    this.deviceService.deviceInfo.subscribe(
      res => {
        this.deviceInfo = res;
      }
    )
  }

  ngOnInit() {

    this.loginForm = this.formBildr.group({
      emailOrPhone: ['', [Validators.required,
        // Regex validator for email or phonenumber
        // Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$|(\d+)$/)
      ]],
      password: ['', [Validators.required]],
    });

    this.storageService.get(Constants.USERPHONE).then(res => {
      if (res && res !== undefined) {
        console.log(res)
        this.storedUserPhone = res;
        this.loginForm.controls.emailOrPhone.setValue(this.storedUserPhone);
      } else {
        return;
      }
    });

    console.log(this.sharedData.NOTIFICATIONS)

  }

  ionViewWillEnter() {
    this.authSrvc.clearData();
    this.biometrics().getToken();
    this.loginForm.controls['emailOrPhone'].valueChanges.subscribe(value => {
      this.biometrics().canUse();
    });
    this.loginForm.controls['password'].valueChanges.subscribe(value => {
      this.biometrics().canUse();
    });
    this.storageService.store('authToken', null);
    this.loginForm.controls.password.setValue("");

    this.storageService.get(Constants.USERPHOTO).then(
      res => {
        if (res) {
          this.photo = res;
        }
        else {
          this.photo = '../../assets/icon/head.svg';
        }
      }
    )
  }

  ionViewDidEnter() {
    this.biometrics().canUse();
  }

  toggleVisibility() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  async loginAction(biometric?) {
    const MobileAppVersion = await this.authSrvc.getAppVersion();
    this.postData.mobileAppVersion = MobileAppVersion;
    this.postData.playerId = this.sharedData.PLAYER_ID;
    this.postData.phonemail = this.loginForm.value.emailOrPhone;
    this.postData.phoneUUID = this.deviceInfo.uuid;
    if (!biometric) {
      this.postData.password = this.encryption.hash_SHA512_Login(this.loginForm.value.password).toUpperCase();
    }
    this.loaderSrvc.showLoader();
    this.authSrvc.login(this.postData)
      .subscribe((res: any) => {
        this.loaderSrvc.hideLoader();
        if (res) {
          this.loaderSrvc.hideLoader();
          if (res.resultCode === '200') {
            this.storageService.store('authToken', this.postData.password); //Temporary storing password throughout the lifecycle of the app for fingerprint enrolment
            this.userRes = res;
            const parsedMessage = JSON.parse(this.userRes.message);
            console.log(parsedMessage)
            const userPhone = parsedMessage.MobilePhone;
            this.sharedData.TOKEN = parsedMessage.Token;
            this.sharedData.SESSIONID = parsedMessage.SessionID;
            this.sharedData.PHONENUMBER = parsedMessage.MobilePhone;
            this.authSrvc.updateTokenSubject(parsedMessage.Token);
            this.authSrvc.updateSessionIDSubject(parsedMessage.SessionID);
            this.storeToken(parsedMessage.Token);
            this.profileSrvc.setUserPhone(userPhone);
            if (parsedMessage.ProfilePicPath) {
              this.profileSrvc.setUserProfilePicture('data:image/jpeg;base64,' + parsedMessage.ProfilePicPath);
            }
            this.storePhoneNumber(userPhone);
            this.router.navigate(['home']);
            this.isUserChanged();
            this.authSrvc.isAuthenticated = true;
          }
          else if (res.resultCode === '222') {
            this.loaderSrvc.hideLoader();
            this.router.navigate(['auth/security-questions'], { state: { answer: true, data: res.data } });
            this.alertSrvc.showErrorToast(res.message);
          } else if (res.resultCode === '223') {
            this.loaderSrvc.hideLoader();
            this.router.navigate(['auth/security-questions'], { state: { incompleteRegistration: true } });
            this.alertSrvc.showErrorToast(res.message);
          } else if (res.resultCode === '401') {
            this.loaderSrvc.hideLoader();
            this.alertSrvc.showErrorToast('Account profile not found');
          } else if (res.resultCode === '750') {
            this.loaderSrvc.hideLoader();
            this.alertSrvc.showErrorToast('Account profile is blocked, Please check your mail for steps to proceed');
          } else if (res.resultCode === '700') {
            this.storePhoneNumber(this.loginForm.value.emailOrPhone);
            this.loaderSrvc.hideLoader();
            this.alertSrvc.showErrorToast('Account profile not active, please input otp');
            this.router.navigate(['auth/sign-up/otp']);
          } else {
            this.alertSrvc.showErrorToast('Error processing request');
          }
        } else {
          this.loaderSrvc.hideLoader();
          console.log('Oops! Something went wrong, try again later');
        }
      }, error => {
        this.loaderSrvc.hideLoader();
        if (error && error.error && (error.error.resultCode === '401' || error.error.resultCode === '404')) {
          this.alertSrvc.showErrorToast('Wrong Username or Password');
        }
        else if (typeof (error) === 'string') {
          this.alertSrvc.showErrorToast(error);
        }
        else {
          this.alertSrvc.showErrorToast('Oops! Something went wrong, try again later');
        }
      });
  }

  ionViewWillLeave() {
    if (this.loaderSrvc === undefined) {
      this.loaderSrvc.hideLoader();
    }
    //  this.profileSrvc.getUserPhone();
  }

  openForgotPassword() {
    this.passwordPinSrvc.displayForgotPasswordModalPrimary();
  }

  storePhoneNumber(value) {
    this.authSrvc.storeUserPhone(value);
  }

  storeUserData(value) {
    this.userSrvc.setUserProfileData(value);
  }

  storeToken(value) {
    this.userSrvc.storeToken(value);
  }

  isUserChanged() {
    this.sharedData.userChanged = false;
    if (this.storedUserPhone && (this.storedUserPhone !== this.postData.phonemail)) {
      this.sharedData.userChanged = true;
    }
  }

  biometrics() {
    const methods = {

      canUse: () => {
        setTimeout(() => {
          if (this.biometricToken && this.biometricToken.u) {
            if (this.biometricToken.u === this.loginForm.value.emailOrPhone && this.loginForm.value.password.length < 1) {
              this.canUseBiometrics = true;
              console.log('can use biometrics');
            }
            else {
              console.log('cant use biometrics');
              this.canUseBiometrics = false;
            }
          }
        }, 100);
      },

      getToken: () => {
        this.storageService.get('bioToken')
          .then(
            (res: any) => {
              if (res) {
                this.biometricToken = res;
                // this.sharedData.biometricEnrolled = true;
                this.biometricsService.updateBiometricSubject(true, 'login213');
              }
              else {
                // this.sharedData.biometricEnrolled = false;
                this.biometricsService.updateBiometricSubject(false, 'login217');
                this.biometricToken = undefined;
              }
            }
          )
      },

      login: () => {
        this.biometricsService.showBiometricsDialog()
          .then(
            () => {
              this.postData.password = this.biometricToken.p;
              this.loginAction(true);
            }
          )
          .catch(
            (err) => {
              console.log(err);
            }
          )
      }
    }
    return methods
  }

  signup() {
    this.router.navigate(['auth/sign-up']);
  }

}
