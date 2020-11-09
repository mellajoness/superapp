import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { Handlers } from 'src/app/shared/handlers';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { EventsService } from 'src/app/services/events/events.service';
import { WalletlogicService } from 'src/app/services/payments/walletlogic/walletlogic.service';

@Component({
  selector: 'app-walletcreation',
  templateUrl: './walletcreation.page.html',
  styleUrls: ['./walletcreation.page.scss', '../../../../theme/payments.scss'],
})
export class WalletcreationPage implements OnInit {

  pageReady;
  bvn;
  busy;
  verifyPhoneData;
  enrollmentData;
  verificationSuccess;
  currEvent;
  pin;
  confirmPin;
  updateFailed;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    private walletService: WalletService,
    private walletlogicService: WalletlogicService,
    public events: EventsService
  ) {

    this.verifyphonenumber(this.sharedData.userPhone);

    console.log(this.sharedData.userProfile)

  }

  ngOnInit() { }

  ionViewWillEnter() {

    if (this.sharedData.userProfile && this.sharedData.userProfile.bvn) {
      this.bvn = this.sharedData.userProfile.bvn
      console.log("BVN HERE")
      console.log(this.bvn)
    }

    this.currEvent = this.events.observeWalletBalance.subscribe(res => {
      if (res === 'yes') {
        console.log("CLOSED")
        this.close();
      } else { }
    });
  }

  ionViewWillLeave() {
    this.currEvent.unsubscribe();
  }

  close() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

  bvnChange() { }
  pinChange() { }
  confirmPinChange() { }

  verifyphonenumber(phoneNumber) {
    if (phoneNumber) {
      const data = { phoneNumber: phoneNumber }
      this.verificationSuccess = false;
      this.busy = this.handlers.busy();
      this.walletService.Verifyphonenumber(data)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res && res.responseCode === "00") {
              this.verifyPhoneData = res.data;
              this.walletAccountUpdateByPhoneForVerification(phoneNumber);
            } else {
              this.busy = !this.handlers.busy();
              this.verificationSuccess = undefined;
            }
          },
          err => {
            this.close();
            this.busy = !this.handlers.busy();
            console.log(err);
          }
        )
    }
  }

  submit() {
    if (this.bvn.length < 11) {
      this.alertSrvc.showErrorToast("Invalid BVN");
      return
    } else if (this.pin.length < 4 || this.confirmPin.length < 4) {
      this.alertSrvc.showErrorToast("Invalid PIN");
    } else if (this.pin !== this.confirmPin) {
      this.alertSrvc.showErrorToast("PIN does not match");
    } else {
      const data = {        
        channel_source: "wallet",
        full_name: this.sharedData.userProfile.firstName + " " + this.sharedData.userProfile.lastName,
        bvn: this.bvn,
        phone_number: this.sharedData.userPhone,
        email: this.sharedData.userProfile.emailAddress,
        date_of_birth: this.walletlogicService.formatDate(this.sharedData.userProfile.dob),
        transaction_pin: this.pin,
        confirm_transaction_pin: this.pin,
        gender: this.sharedData.userProfile.gender
      }

      console.log(data);

      this.busy = this.handlers.busy();

      this.walletService.Register(data)
        .subscribe(
          (res: any) => {
            console.log(res);
            if (res && res.responseCode === "00") {
              this.enrollmentData = res.data;
              this.walletAccountUpdateByPhone(this.sharedData.userPhone);
            } else if (res && res.responseCode !== "00") {
              this.busy = !this.handlers.busy();
              this.alertSrvc.showErrorToast(res.responseMessage)
            } else {
              this.busy = !this.handlers.busy();
              this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            }
          },
          err => {
            this.busy = !this.handlers.busy();
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            console.log(err);
          }
        )
    }
  }

  walletAccountUpdateByPhone(phoneNumber) {
    if (this.updateFailed) {
      this.busy = this.handlers.busy();
      this.updateFailed = false;
    }
    this.walletService.WalletAccountUpdateByPhone(phoneNumber)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.busy = !this.handlers.busy();
        if(res && res.status) {
          this.updateBvn()
          this.sharedData.userProfile['walletAcctNumber'] = this.enrollmentData.wallet_id;
          this.presentModal();
        } else {
          this.updateFailed = true;
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      },
      err => {
        this.updateFailed = true;
        this.busy = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        console.log(err)
      }
    )
  }

  walletAccountUpdateByPhoneForVerification(phoneNumber) {
    this.walletService.WalletAccountUpdateByPhone(phoneNumber)
    .subscribe(
      (res: any) => {
        console.log(res);
        this.busy = !this.handlers.busy();
        if(res && res.status) {
          this.verificationSuccess = true;
          this.sharedData.userProfile['walletAcctNumber'] = this.verifyPhoneData.wallet_id;
          this.presentModal();
        } else if (res.resultCode === '304' ) {
          this.close();
          this.alertSrvc.showErrorToast("Wallet account already exist");
        } else {
          this.close();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      },
      err => {
        this.close();
        this.busy = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        console.log(err)
      }
    )
  }

  updateBvn() {
    if (this.sharedData.userProfile && !this.sharedData.userProfile.bvn) {
      const data = { phoneNo: this.sharedData.userPhone, bvn: this.bvn}
      this.billsPaymentsService.UpdateBvn(data)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.sharedData.userProfile.bvn = this.bvn;
        },
        err => {
          console.log(err);
        }
      )
    }
  }

  presentModal() {
    this.sharedData.customAlertView = "walletcreation";
    this.handlers.showCustomAlertModal(CustomalertComponent);
  }

}
