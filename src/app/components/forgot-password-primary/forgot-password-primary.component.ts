import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { LoaderService } from '../../services/utilities/loader.service';
import { ProfileService } from '../../services/user/profile.service';
import { AlertService } from '../../services/utilities/alert.service';
import { PasswordValidator, PatternValidator } from '../../shared/validators';
import { SharedData } from 'src/app/shared/shared.components';

@Component({
  selector: 'app-forgot-password-primary',
  templateUrl: './forgot-password-primary.component.html',
  styleUrls: ['./forgot-password-primary.component.scss', '../../../theme/payments.scss'],
})
export class ForgotPasswordPrimaryComponent implements OnInit {

  phoneForm: FormGroup;
  emailForm: FormGroup;
  resetPinForm: FormGroup;
  passwordForm: FormGroup;

  didInit;


  get phone() {
    return this.resetPinForm.get('phone').value;
  }

  get emailAddress() {
    return this.emailForm.get('email').value;
  }

  get password() {
    return this.passwordForm.get('password').value;
  }


  email;
  phoneNumber;
  pin;
  confirmPin;
  hideButtonBool;

  passwordType = 'password';
  passwordShown = false;

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '2rem',
      height: '2rem',
      color: '#000000',
    },
    containerClass: 'otp-container'
  };

  @ViewChild('ngOtpInput',  {static: false}) ngOtpInput: any;
  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  otp;
  displayForm;

  postData = {
    phonenumber: '',
    token: '',
    password: '',
    confirmPassword: '',
  };

  constructor(
    private modalCtrl: ModalController,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private profileSrvc: ProfileService,
    private formBildr: FormBuilder,
    private alertSrvc: AlertService,
    public sharedData: SharedData
  ) {
    console.log(this.sharedData.fromLandingPage)
  }

  ngOnInit() {
    // this.email = this.profileSrvc.getUserEmail();
    // this.phoneNumber = this.profileSrvc.getUserPhone();

    this.phoneForm = this.formBildr.group({
      phone: ['', Validators.required]
    });

    this.emailForm = this.formBildr.group({
      email: ['', Validators.required]
    });

    this.passwordForm = this.formBildr.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
         // check whether the entered password has a number
        PatternValidator(/\d/, { hasNumber: true }),
        // check whether the entered password has upper case letter
        PatternValidator(/[A-Z]/, { hasCapitalCase: true }),
        // check whether the entered password has a lower-case letter
        PatternValidator(/[a-z]/, { hasSmallCase: true }),
         // special Character
         PatternValidator(/[!@#$%^&*]/, { hasSpecialCharacters: true }),
      ]],
      confirmPassword: ['']
    }, {validator: PasswordValidator});
  }

  ngAfterViewInit() {
    this.didInit = true;
  }


  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  slideToNext() {
    // console.log('Hello');
    this.slides.slideNext();
  }

  resetPassword() {
    this.loaderSrvc.showLoader();
    const phone = this.phoneForm.value.phone;
    this.email = this.emailForm.value.email;
    this.userSrvc.generateTokenForPasswordReset(this.email, phone).subscribe(res => {
      if (res) {
        this.loaderSrvc.hideLoader();
        if (res.resultCode === '200') {
          this.slides.slideNext();
        } else {
          this.alertSrvc.showErrorToast(res.message);
        }
      }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing Request, try again later');
    });
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp.length);
    if (this.otp.length === 6) {
      this.displayForm = true;
    }
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

  resetAction() {
    this.loaderSrvc.showLoader();
    this.postData.token = this.otp;
    this.postData.password = this.passwordForm.value.password;
    this.postData.confirmPassword = this.passwordForm.value.confirmPassword;
    this.postData.phonenumber = this.phoneForm.value.phone;
    this.userSrvc.resetPassword(this.postData).subscribe(res => {
      if (res) {
        this.loaderSrvc.hideLoader();
        if (res.resultCode === '200') {
          this.alertSrvc.displayAuthSuccessModal('Password Was changed successfully', null);
          this.dismiss();
        } else {
          this.alertSrvc.showErrorToast(res.message);
        }
      }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing Request, try again later');
    });
  }

}
