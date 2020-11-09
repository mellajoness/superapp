import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { TransactionPinService } from '../../services/security/transaction-pin.service';
import { LoaderService } from '../../services/utilities/loader.service';
import { UserService } from '../../services/user/user.service';
import { ProfileService } from '../../services/user/profile.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../services/utilities/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-pin',
  templateUrl: './forgot-pin.component.html',
  styleUrls: ['./forgot-pin.component.scss', '../../auth/signup/signup.page.scss', '../../../theme/payments.scss'],
})
export class ForgotPinComponent implements OnInit, AfterViewInit {
  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };


  email;
  phoneNumber;
  pin;
  confirmPin;
  hideButtonBool;
  subscription: Subscription;

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

  pinConfig = {
    allowNumbersOnly: true,
    length: 4,
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
  @ViewChild('ngOtpInput',  {static: false}) ngOtpPinInput: any;
  @ViewChild('ngOtpInput',  {static: false}) ngOtpConfirmPinInput: any;

  resetPinForm: FormGroup;

  otp;
  displayForm;
  didInit;

  postData = {
    tokenOTP: '',
    transactionPin: '',
    confirmTransactionPin: '',
    phoneNumber: '',
    password: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private profileSrvc: ProfileService,
    private formBildr: FormBuilder,
    private alertSrvc: AlertService
  ) { }

  ngOnInit() {
    this.email = this.profileSrvc.getUserEmail();
    this.phoneNumber = this.profileSrvc.getUserPhone();
    this.resetPinForm = this.formBildr.group({
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]]
    });
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

  async slideToToken() {
    console.log('hello');
    // await this.slides.slideTo(1);
  }

  async slideToNext() {
    // console.log('Hello');
    this.slides.slideNext();
  }

  async resetPIN() {
    this.loaderSrvc.showLoader();
    this.subscription = this.userSrvc.generateTokenForTranPinReset(this.phoneNumber).subscribe(res => {
      this.loaderSrvc.hideLoader();
      if (res.resultCode === '200') {
          console.log('Hello');
          this.slideToNext();
        } else {
          this.alertSrvc.showErrorToast(res.message);
        }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing Request, try again later');
      // this.slides.slidePrev();
    });
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp.length);
    if (this.otp.length === 6) {
      this.displayForm = true;
    }
  }

  onPinChange(pin) {
    this.pin = pin;
  }

  onConfirmPinChange(confirmPin){
    this.confirmPin = confirmPin;
  }

  hideButton() {
    if (this.pin === this.confirmPin && this.pin !== '' && this.confirmPin !== '') {
      if (isNaN(parseInt(this.pin, 10)) || isNaN(parseInt(this.confirmPin, 10))) {
        return this.hideButtonBool = true;
      } else {
        return this.hideButtonBool = false;
      }
    } else {
      return this.hideButtonBool = true;
    }
    // return this.hideButtonBool();
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

  changeAction() {
    this.loaderSrvc.showLoader();
    this.postData.tokenOTP = this.otp;
    this.postData.transactionPin = this.pin;
    this.postData.confirmTransactionPin = this.confirmPin;
    this.postData.phoneNumber = this.phoneNumber;
    this.postData.password = this.resetPinForm.value.password;
    this.userSrvc.resetTransPin(this.postData).subscribe(res => {
      if (res) {
        this.loaderSrvc.hideLoader();
        if (res.resultCode === '200') {
          this.alertSrvc.displaySuccessModal('PIN Was changed successfully', null);
          this.dismiss();
        } else {
          this.alertSrvc.showErrorToast('Error Processing Request, try again later');
        }
      }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing Request, try again later');
    });
  }

}
