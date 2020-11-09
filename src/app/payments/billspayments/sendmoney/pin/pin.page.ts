import { Component, OnInit, ViewChild } from '@angular/core';
import { Handlers } from 'src/app/shared/handlers';
import { SharedData } from 'src/app/shared/shared.components';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { AccountService } from 'src/app/services/superapp/account.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { EventsService } from 'src/app/services/events/events.service';
import { Encryption } from 'src/app/services/encryption/encryption';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.page.html',
  styleUrls: ['./pin.page.scss', '../../../../../theme/payments.scss'],
})
export class PinPage implements OnInit {

  @ViewChild('ngOtpInput', {static: false}) ngOtpInput: any;
  otp;
  data;
  config = {
    allowNumbersOnly: true,
    length: 4,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '2rem',
      'height': '2.5rem',
      'border': 'none',
      'border-bottom': '2px solid',
      'border-radius': '0px',
      'margin': '0px 1.2rem',
      'background': '#fafafa'
    }
  };

  constructor(
    public handlers: Handlers,
    private sharedData: SharedData,
    private router: Router,
    private navCtrl: NavController,
    private billsPaymentsService: BillspaymentsService,
    private alertSrvc: AlertService,
    private loaderSrvc: LoaderService,
    public events: EventsService,
    private encryption: Encryption
  ) {

    this.data = this.sharedData.paymentObj;

  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp.length);
  }

  ionViewWillEnter() {
    if (this.sharedData.userProfile && !this.sharedData.userProfile.isTranPinSet) {
      this.sharedData.fromValidatePage = true;
      this.sharedData.customAlertView = 'pinsetup';
      this.handlers.showCustomAlertModal(CustomalertComponent);
    }
  }

  submit(route) {
    this.sharedData.paymentObj['transactionPin'] = this.otp;
    console.log(this.sharedData.paymentObj);

    if(this.sharedData.tranType === 'inter') {
      console.log('INTER');
      this.loaderSrvc.showLoader();
      const data = JSON.stringify(this.sharedData.paymentObj);
      console.log(data);
      console.log(this.encryption.encrypt_AES256_TRANSFERS(data));
      const obj =  {paymentPayload: this.encryption.encrypt_AES256_TRANSFERS(data)}
      console.log(obj);
      this.billsPaymentsService.Transfer(obj)
      .subscribe(
        (res: any) => {
          this.loaderSrvc.hideLoader();
          if(res && res.code === '00' && res.data) {
            this.navCtrl.navigateForward(route);
            this.reloadAccounts();
          } else if (res && res.code !== '00') {
            this.alertSrvc.showErrorToast(res.message);
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }
          console.log(res);
        },
        err => {
          console.log(err);
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      )
    } else if (this.sharedData.tranType === 'intra') {
      console.log('INTRA');
      this.loaderSrvc.showLoader();
      const data = JSON.stringify(this.sharedData.paymentObj);
      console.log(data);
      console.log(this.encryption.encrypt_AES256_TRANSFERS(data));
      const obj =  {paymentPayload: this.encryption.encrypt_AES256_TRANSFERS(data)}
      console.log(obj);
      this.billsPaymentsService.Intrabank(obj)
      .subscribe(
        (res: any) => {
          this.loaderSrvc.hideLoader();
          if(res && res.code === '00' && res.data) {
            this.navCtrl.navigateForward(route);
            this.reloadAccounts();
          } else if (res && res.code !== '00') {
            this.alertSrvc.showErrorToast(res.message);
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }
          console.log(res);
        },
        err => {
          console.log(err);
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      )
    }
  }

  reloadAccounts() {
    this.sharedData.reloadAccount = "yes";
    this.events.getEvent();
  }

}
