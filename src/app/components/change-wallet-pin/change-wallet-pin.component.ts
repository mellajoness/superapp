import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ModalController, IonSlides } from '@ionic/angular';
import { LoaderService } from '../../services/utilities/loader.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { SharedData } from 'src/app/shared/shared.components';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';
import { WalletlogicService } from 'src/app/services/payments/walletlogic/walletlogic.service';

@Component({
  selector: 'app-change-wallet-pin',
  templateUrl: './change-wallet-pin.component.html',
  styleUrls: ['./change-wallet-pin.component.scss', '../../auth/signup/signup.page.scss', '../../../theme/payments.scss'],
})
export class ChangeWalletPinComponent implements OnInit {

  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };


  email;
  phoneNumber;
  oldPin;
  newPin;
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

  @ViewChild('ngOtpInput',  {static: false}) ngOtpInput: any;

  resetPinForm: FormGroup;

  otp;
  displayForm;
  didInit;

  constructor(
    private modalCtrl: ModalController,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    private walletService: WalletlogicService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.didInit = true;
  }

  dismiss() {
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
    
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp.length);
    if (this.otp.length === 6) {
      this.displayForm = true;
    }
  }

  oldPinChange() { console.log(this.oldPin); }

  newPinChange() { console.log(this.newPin); }

  confirmPinChange() { console.log(this.confirmPin); }

  setPin() {
    if(this.oldPin === this.newPin) {
      this.alertSrvc.showErrorToast('New PIN cannot be same as Old PIN');
    } else if (this.newPin !== this.confirmPin) {
      this.alertSrvc.showErrorToast('New PIN does not match')
    } else {
      const data = {
        otp: this.otp,
        phoneNumber: this.sharedData.userProfile.walletAcctNumber,
        oldPin: this.oldPin,
        newPin: this.newPin,
        confirmNewPin: this.confirmPin
      }
      console.log(data);
      this.changePin(data);
    }
  }

  changePin(data) {
    this.loaderSrvc.showLoader();
    this.walletService.ConfirmResetpin(data)
    .subscribe(
      (res: any) => {
        this.loaderSrvc.hideLoader();
        if(res && res.data && res.responseCode === '00' && res.responseMessage === 'Successful') {
          this.alertSrvc.showSuccessToast('PIN Changed Successfully')
          this.dismiss();
        } else if (res && res.data && res.responseCode !== '00' && res.responseMessage) {
          this.alertSrvc.showErrorToast(res.responseMessage)
        } else {
          this.alertSrvc.showErrorToast('An error occurred. Please try again later.')
        }
        console.log(res)
      },
      err => {
        console.log(err);
        this.loaderSrvc.hideLoader();
        this.alertSrvc.showErrorToast('An error occurred. Please try again later.')
      }
    )
  }

}
