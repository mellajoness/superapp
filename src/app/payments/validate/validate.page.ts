import { Encryption } from './../../services/encryption/encryption';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Router } from '@angular/router';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { Handlers } from 'src/app/shared/handlers';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { TravelService } from 'src/app/services/payments/travel/travel.service';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';
import { EventsService } from 'src/app/services/events/events.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.page.html',
  styleUrls: ['./validate.page.scss', '../../../theme/payments.scss'],
})
export class ValidatePage implements OnInit {

  password;
  paymentDetails;

  constructor(
    private navCtrl: NavController,
    public sharedData: SharedData,
    private router: Router,
    private billsPaymentsService: BillspaymentsService,
    public handlers: Handlers,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private travelService: TravelService,
    private wallerService: WalletService,
    public events: EventsService,
    private encryption: Encryption
  ) {
    this.password = "";
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    this.password = "";

    if (!this.sharedData.userProfile.isTranPinSet && this.sharedData.billsPaymentsMode !== this.handlers.variables().wallet) {
      this.sharedData.fromValidatePage = true;
      this.sharedData.customAlertView = 'pinsetup';
      this.handlers.showCustomAlertModal(CustomalertComponent);
    }

    if (this.sharedData.billsPaymentsMode !== this.handlers.variables().flight) {
      this.sharedData.paymentObj['hash'] = this.encryption.hash_SHA512Bills(this.handlers.hash());
    }
  }

  ionViewWillLeave() {
    this.password = "";
  }

  val(x) {
    this.update(x);
  }

  update(x) {
    this.password += x;
    if (this.password.length === 4) {
      this.pay(this.password);
    }
  }

  delete() {
    if (this.password) {
      let str = this.password;
      this.password = str.slice(0, -1);
    }
  }

  resetWalletPin() {
    this.loaderSrvc.showLoader();
    this.wallerService.ResetPin(this.sharedData.userProfile.walletAcctNumber)
    .subscribe(
      (res: any) => {
        this.loaderSrvc.hideLoader();
        console.log(res)
        if(res && res.responseCode === '00' && res.data && res.data.otp) {
          this.handlers.displayResetWalletPINModal(null);
          this.sharedData.resetWalletPinData = res.data;
        } else if(res && res.responseCode !== '00' && res.responseMessage) {
          this.alertSrvc.showErrorToast(res.responseMessage)
        } else {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      },
      err => {
        console.log(err);
        this.loaderSrvc.hideLoader();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
      }
    )
  }

  pay(pin) {
    if (pin) {
      if (this.sharedData.billsPaymentsMode === this.handlers.variables().wallet && this.sharedData.wallet.pageView === 'transfer-wallet') {
        this.sharedData.paymentObj['tran_pin'] = pin;
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().wallet) {
        this.sharedData.paymentObj['transactionPin'] = pin;
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().flight) {
        this.sharedData.paymentObj['pin'] = pin;
      } else {
        this.sharedData.paymentObj['pin'] = pin;
        console.log(this.sharedData.paymentObj['pin']);
        this.sharedData.paymentObj['pin'] = this.encryption.encrypt_AES256_CBC(this.sharedData.paymentObj['pin']);
      }
      console.log(this.sharedData.paymentObj);

      if (this.sharedData.billsPaymentsMode === this.handlers.variables().electricity) {
        this.payElectricity(this.sharedData.paymentObj);
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().internet) {
        this.buyInternetData(this.sharedData.paymentObj);
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().cable) {
        this.subscribeTv(this.sharedData.paymentObj);
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().airtime) {
        this.airtimeRecharge(this.sharedData.paymentObj);
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().betting) {
        this.payBetting(this.sharedData.paymentObj);
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().boropower) {
        this.borrowPower(this.sharedData.paymentObj);
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().flight) {
        this.buyFlightTicket(this.sharedData.paymentObj);
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().wallet && (this.sharedData.wallet.pageView === 'withdrawal' || this.sharedData.wallet.pageView === 'transfer-bank')) {
        if (this.sharedData.paymentInfo['numericCode']) {
          console.log('WALLET TO OTHER BANKS');
          console.log(this.sharedData.paymentInfo['numericCode']);
          this.walletWithdrawalInter(this.sharedData.paymentObj);
        } else {
          this.walletWithdrawal(this.sharedData.paymentObj);
        }
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().wallet && this.sharedData.wallet.pageView === 'transfer-wallet') {
        this.walletToWalletTransfer(this.sharedData.paymentObj);
      } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().wallet && this.sharedData.wallet.pageView === 'fundwallet-bank') {
        this.fundWalletFromBank(this.sharedData.paymentObj);
      }
    }
  }

  payElectricity(data) {
    this.loaderSrvc.showLoader();
    this.billsPaymentsService.PayElectricity(data)
      .subscribe(
        (res: any) => {
          if (res && res.code === '00' && res.data) {
            this.paymentDetails = res.data.paymentInfo.data
            this.sharedData.paymentDetails = res.data.paymentInfo.data;
            this.sharedData.paymentDetails['accountType'] = data['accountType'];
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res && res.code !== '00' && res.data) {
            this.alertSrvc.showErrorToast(res.data.paymentInfo && res.data.paymentInfo.responseMessage || res.message);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  buyInternetData(data) {
    this.loaderSrvc.showLoader();
    this.billsPaymentsService.BuyInternetData(data)
      .subscribe(
        (res: any) => {
          if (res && res.code === '00' && res.data) {
            this.paymentDetails = res.data
            this.sharedData.paymentDetails = res.data;
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.code !== '00' && res.data) {
            this.alertSrvc.showErrorToast(res.data.paymentInfo && res.data.paymentInfo.responseMessage || res.message);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  borrowPower(data) {
    this.loaderSrvc.showLoader();
    this.billsPaymentsService.BorrowPower(data)
      .subscribe(
        (res: any) => {
          if (res && res.code === '00' && res.data) {
            this.paymentDetails = res.data.paymentInfo.data;
            this.sharedData.paymentDetails = res.data.paymentInfo.data;
            this.sharedData.paymentDetails['accountType'] = data['accountType'];
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.code !== '00' && res.message) {
            this.alertSrvc.showErrorToast(res.message);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  subscribeTv(data) {
    this.loaderSrvc.showLoader();
    this.billsPaymentsService.SubscribeTv(data)
      .subscribe(
        (res: any) => {
          if (res.code === '00' && res.data) {
            this.paymentDetails = res.data
            this.sharedData.paymentDetails = res.data;
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.code !== '00' && res.data) {
            this.alertSrvc.showErrorToast(res.data.paymentInfo && res.data.paymentInfo.responseMessage || res.message);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  airtimeRecharge(data) {
    this.loaderSrvc.showLoader();
    this.billsPaymentsService.AirtimeRecharge(data)
      .subscribe(
        (res: any) => {
          if (res.code === '00' && res.data) {
            this.paymentDetails = res.data
            this.sharedData.paymentDetails = res.data;
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.code !== '00' && res.data) {
            this.alertSrvc.showErrorToast(res.data.paymentInfo && res.data.paymentInfo.responseMessage || res.message);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  payBetting(data) {
    this.loaderSrvc.showLoader();
    this.billsPaymentsService.PayBetting(data)
      .subscribe(
        (res: any) => {
          if (res.code === '00' && res.data) {
            this.paymentDetails = res.data
            this.sharedData.paymentDetails = res.data;
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.code !== '00' && res.data) {
            this.alertSrvc.showErrorToast(res.data.paymentInfo && res.data.paymentInfo.responseMessage || res.message);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  buyFlightTicket(paymentObj) {
    //  {UserId}{Channel}{BookingReference}{validationSalt}{Amount}{PaymentSourceId}{PaymentMethod}

    // const  hash = ()=> {
    //   const hashed = this.encryption.hash_SHA512(
    //     paymentObj.userId +
    //     paymentObj.channel +
    //     paymentObj.bookingReference,
    //     paymentObj.amount +
    //     paymentObj.paymentSourceId +
    //     paymentObj.paymentMethod
    //   )
    //   return hashed;
    // }

    this.sharedData.travel.paymentComplete = false;
    this.loaderSrvc.showLoader();
    // paymentObj['hash'] = hash();
    const cipherPaymentObj = {
      cipheredPaymentPayload: this.encryption.encrypt_AES256_Flight(JSON.stringify(paymentObj))
    }
    this.travelService.buyTicket(cipherPaymentObj)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.data && res.data.paymentStatus && res.data.paymentStatus.responseCode === '00') {
            this.paymentDetails = res.data;
            this.sharedData.paymentDetails = res.data;
            this.sharedData.travel.paymentComplete = true;
            this.password = "";
            this.handlers.navigate().forward('payments/travel/booking-confirmation/booking-successful');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else {
            this.sharedData.travel.paymentComplete = false;
            if (res.data && res.data.paymentStatus && res.data.paymentStatus.responseMessage) {
              this.alertSrvc.showErrorToast(res.data.paymentStatus.responseMessage);
            }
            else {
              this.alertSrvc.showErrorToast(res.responseMessage);
            }
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
        },
        err => {
          this.password = "";
          this.sharedData.travel.paymentComplete = false;
          console.log(err);
          this.loaderSrvc.hideLoader();
        }
      )
  }

  walletWithdrawal(data) {
    this.loaderSrvc.showLoader();
    this.wallerService.Cashoutwallettofidelityaccount(data)
      .subscribe(
        (res: any) => {
          if (res.responseCode === '00' && res.data) {
            this.paymentDetails = res.data
            this.sharedData.paymentDetails = res.data;

            if (this.sharedData.wallet.pageView === 'withdrawal') {
              this.sharedData.paymentInfo = data.amount + " withdrawal to " + this.sharedData.paymentInfo['name'] + " in Fidelity Bank Plc was successful";
            } else if (this.sharedData.wallet.pageView === 'transfer-bank') {
              this.sharedData.paymentInfo = data.amount + " transfer to " + this.sharedData.paymentInfo['name'] + " in Fidelity Bank Plc was successful";
            }
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.responseCode !== '00') {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  walletWithdrawalInter(data) {
    this.loaderSrvc.showLoader();
    this.wallerService.Cashoutwallettononfidelityaccount(data)
      .subscribe(
        (res: any) => {
          if (res.responseCode === '00' && res.data) {
            this.paymentDetails = res.data
            this.sharedData.paymentDetails = res.data;

            if (this.sharedData.wallet.pageView === 'withdrawal') {
              this.sharedData.paymentInfo = data.amount + " withdrawal to " + this.sharedData.paymentInfo['name'] + " in Fidelity Bank Plc was successful";
            } else if (this.sharedData.wallet.pageView === 'transfer-bank') {
              this.sharedData.paymentInfo = data.amount + " transfer to " + this.sharedData.paymentInfo['name'] + " " + this.sharedData.paymentInfo['bank'];
            }
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.responseCode !== '00') {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  walletToWalletTransfer(data) {
    this.loaderSrvc.showLoader();
    this.wallerService.Fundwallettowallet(data)
      .subscribe(
        (res: any) => {
          if (res.responseCode === '00' && res.data) {
            this.paymentDetails = res.data
            this.sharedData.paymentDetails = res.data;
            this.sharedData.paymentInfo = data.tran_amount + " transfer to " + this.sharedData.paymentInfo['accountNo'] + " - " + this.sharedData.paymentInfo['name'] + " Wallet was successful";
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.responseCode !== '00') {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  fundWalletFromBank(data) {
    this.loaderSrvc.showLoader();
    this.wallerService.Fundwalletfromfidelityaccount(data)
      .subscribe(
        (res: any) => {
          if (res.responseCode === '00' && res.data) {
            this.paymentDetails = res.data
            this.sharedData.paymentDetails = res.data;
            this.sharedData.paymentInfo = data.amount + " has been credited to your wallet";
            this.navCtrl.navigateForward('payments/success');
            this.reloadAccounts();
            this.refreshWallet();
            this.refreshDashboardWallet();
          } else if (res.responseCode !== '00') {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.password = "";
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.password = "";
          }
          this.loaderSrvc.hideLoader();
          console.log(res)
        },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.password = "";
          console.log(err);
        }
      )
  }

  reloadAccounts() {
    this.sharedData.reloadAccount = "yes";
    this.events.getEvent();
  }

  refreshWallet() {
    this.sharedData.wallet.refreshWallet = "yes";
    this.events.getWalletEvent();
  }

  refreshDashboardWallet() {
    this.sharedData.wallet.refreshDashboardWallet = "yes";
    this.events.getDashboardWalletEvent();
  }

}
