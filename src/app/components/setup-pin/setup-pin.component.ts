import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides, NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProfileService } from '../../services/user/profile.service';
import { UserService } from '../../services/user/user.service';
import { LoaderService } from '../../services/utilities/loader.service';
import { AlertService } from '../../services/utilities/alert.service';
import { TransactionPinService } from '../../services/security/transaction-pin.service';
import { SharedData } from 'src/app/shared/shared.components';

@Component({
  selector: 'app-setup-pin',
  templateUrl: './setup-pin.component.html',
  styleUrls: ['./setup-pin.component.scss', '../../auth/signup/signup.page.scss', '../../../theme/payments.scss'],
})
export class SetupPinComponent implements OnInit {
  otp = 'otp';
  confirmOtp = 'confirmOtp';
  hideButtonBool;
  createPinForm: FormGroup;
  phoneNumber;

  postData = {
    transactionPin: '',
    confirmTransactionPin: '',
    phoneNumber: '',
    password: ''
  };

  config = {
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

  @ViewChild('slide',  {static: false}) slides: IonSlides;
  @ViewChild('ngOtpInput',  {static: false}) ngOtpInput: any;
  @ViewChild('ngOtpInput2',  {static: false}) ngOtpInput2: any;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  passwordType = 'password';
  passwordShown = false;

  constructor(
    private modalCtrl: ModalController,
    private formBildr: FormBuilder,
    private profileSrvc: ProfileService,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private transactionSrvc: TransactionPinService,
    public sharedData: SharedData,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    this.createPinForm = this.formBildr.group({
      password: ['', [
        Validators.required,
        Validators.minLength(6),
      ]]
    });
    this.phoneNumber = this.profileSrvc.getUserPhone();
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });

    if(this.sharedData.fromValidatePage) {
      this.navCtrl.back();
      this.sharedData.fromValidatePage = null;
    }
  }

  clearOTP() {
    this.ngOtpInput.setValue(0);
    this.ngOtpInput2.setValue(0);
  }

  slideToNext() {
    // console.log('Hello');
    this.slides.slideNext();
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp);
  }

  onOtpConfirmChange(otp) {
    this.confirmOtp = otp;
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

  hideButton() {
    if (this.otp === this.confirmOtp && this.otp !== '' && this.confirmOtp !== '') {
      if (isNaN(parseInt(this.otp, 10)) || isNaN(parseInt(this.confirmOtp, 10))) {
        return this.hideButtonBool = true;
      } else {
        return this.hideButtonBool = false;
      }
    } else {
      return this.hideButtonBool = true;
    }
    // return this.hideButtonBool();
  }

  ionModalDidDismiss() {
    console.log('Hey');
    // this.transactionPinSrvc.getTransactionPinStatus();
    // this.hasPin = true;
  }

  createAction() {
    this.loaderSrvc.showLoader();
    this.postData.transactionPin = this.otp;
    this.postData.confirmTransactionPin = this.confirmOtp;
    this.postData.phoneNumber = this.phoneNumber;
    this.postData.password = this.createPinForm.value.password;
    //  console.log(this.postData);
    this.userSrvc.createTransactionPIN(this.postData).subscribe(res => {
      if (res) {
        this.loaderSrvc.hideLoader();
        console.log(res);
        if (res.resultCode === '200') {
          this.alertSrvc.displayAuthSuccessModal('Your PIN was set successfully', null);
          this.transactionSrvc.setTransactionPinStatus(true);
          this.dismiss();
          this.sharedData.userProfile.isTranPinSet = true;
          if(this.sharedData.fromValidatePage) {
            this.sharedData.userProfile.isTranPinSet = true;
            this.sharedData.fromValidatePage = null;
          }
        } else if (res.resultCode === '400') {
          this.alertSrvc.showErrorToast('Error Processing request, please try again');
        } else if (res.resultCode === '304') {
          this.alertSrvc.showSuccessToast('Transaction PIN already exist');
        }
      }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing Request, try again later');
    });
  }
}
