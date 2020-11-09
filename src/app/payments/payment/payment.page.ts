import { Component, OnInit, NgZone } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Handlers } from 'src/app/shared/handlers';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { StorageService } from '../../services/storage/storage.service';
import { WalletlogicService } from 'src/app/services/payments/walletlogic/walletlogic.service';
import { Subscription } from 'rxjs';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { AccountService } from 'src/app/services/superapp/account.service';
import { UserService } from 'src/app/services/user/user.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { Encryption } from 'src/app/services/encryption/encryption';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss', '../../../theme/payments.scss'],
})
export class PaymentPage implements OnInit {

  paymentData;
  selectedAccount;
  yes;
  currEvent;
  truthy;
  spinnerEvent;
  fidelityCustomerValidated;

  subscription: Subscription;

  constructor(
    public sharedData: SharedData,
    public handlers: Handlers,
    private router: Router,
    private navCtrl: NavController,
    private inAppBrowser: InAppBrowser,
    private spinnerDialog: SpinnerDialog,
    private alertSrvc: AlertService,
    private storageService: StorageService,
    private ngZone: NgZone,
    private walletlogicService: WalletlogicService,
    private accountService: AccountService,
    private userService: UserService,
    private billsPaymentsService: BillspaymentsService,
    private encryption: Encryption
  ) {

    this.paymentData = {
      walletId: this.sharedData.userProfile && this.sharedData.userProfile.walletAcctNumber ? this.sharedData.userProfile.walletAcctNumber : null,
      // accounts: this.sharedData.userAccounts ? this.sharedData.userAccounts : null
    };
    this.accountService.currentAccountsData.subscribe(
      res => {
        if (res && res.length > 0) {
          this.paymentData['accounts'] = res;
        } else if ((this.sharedData.userAccounts && this.sharedData.userAccounts.length < 1)) {
          this.paymentData['accounts'] = this.sharedData.userAccounts;
          const data = { phoneNo: this.sharedData.userProfile.finaclePhoneNumber }
          this.getUserAccounts(data);
        } else if (!this.sharedData.userAccounts && this.sharedData.userProfile.finaclePhoneNumber && this.sharedData.userProfile.isFidelityCustomerValidated) {
          this.paymentData['accounts'] = [];
          const data = { phoneNo: this.sharedData.userProfile.finaclePhoneNumber }
          this.getUserAccounts(data);
        } else {
          this.paymentData['accounts'] = null;
        }
      },
      err => {
        this.paymentData['accounts'] = null;
      }
    )
    console.log(this.paymentData);
    // this.isFidelityCustomerValidated();

  }

  ngOnInit() { }

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    this.storageService.store('paygatedata', null);
    this.truthy = true;

  }

  ionViewDidEnter() {
    this.identifyCustomer();
  }

  identifyCustomer() {
    this.userService.currentUserProfile
      .subscribe(
        (res: any) => {
          // this.fidelityCustomerValidated = res.isFidelityCustomerValidated;
          // if (this.sharedData.firstPayment && !res.isFidelityCustomerValidated) {
          if (this.sharedData.firstPayment && res.isFidelityCustomerValidated !== true) {
            // this.sharedData.customAlertView = 'identifyCustomer';
            // this.handlers.showCustomAlertModal(CustomalertComponent);
            // this.userService.validateFidelityCustomer();


            this.handlers.validateFidelityCustomer(CustomalertComponent);
            if (res.custId) {
              this.storageService.store(res.custId + 'FirstPayment', true);
            }
            this.sharedData.firstPayment = false;
          }
        }
      )


    // if (this.sharedData.firstPayment && !this.fidelityCustomerValidated) {
    //   this.sharedData.customAlertView = 'identifyCustomer';
    //   this.handlers.showCustomAlertModal(CustomalertComponent);
    //   this.userService.currentUserProfile.subscribe(
    //     (res: any) => {
    //       if (res.custId) {
    //         this.storageService.store(res.custId + 'FirstPayment', true);
    //       }
    //     }
    //   )
    // }
  }

  // isFidelityCustomerValidated() {
  //   this.userService.currentUserProfile
  //     .subscribe(
  //       (res: any) => {
  //         this.fidelityCustomerValidated = res.isFidelityCustomerValidated;
  //       }
  //     )
  // }

  proceed(mode) {
    if (mode === 'wallet') {
      this.sharedData.paymentObj['paymentSourceId'] = this.paymentData.walletId || this.sharedData.userProfile.walletAcctNumber;
      console.log(this.sharedData.paymentObj['paymentSourceId']);
      if (this.sharedData.billsPaymentsMode !== this.handlers.variables().flight) {
        this.sharedData.paymentObj['paymentSourceId'] = this.encryption.encrypt_AES256_CBC(this.sharedData.paymentObj['paymentSourceId']);
      }

      if (this.sharedData.billsPaymentsMode) {
        this.sharedData.paymentObj['paymentMethod'] = mode
      }
      
      // if (this.sharedData.billsPaymentsMode !== this.handlers.variables().boropower) {
      //   this.sharedData.paymentObj['paymentMethod'] = mode
      // } else {
      //   this.sharedData.paymentObj['serviceChargePaymentMethod'] = mode
      // }

      console.log(this.sharedData.paymentObj);
      this.navCtrl.navigateForward('payments/validate');
    } else {
      this.paygatePayment();
    }
  }

  // PAYGATE IMPLEMENTATION
  // PAYGATE IMPLEMENTATION
  paygatePayment() {
    this.sharedData.paymentObj['orderId'] = this.walletlogicService.generateOrderID();
    let pageContent = `<html><head></head><body><form class="w100" #form id="upay_form" name="upay_form" action="https://fidelitypaygate.fidelitybank.ng/cipg/MerchantServices/MakePayment.aspx" method="post">` +
      `<input type="hidden" name="mercId" value="07666">` +
      `<input type="hidden" name="currCode" value="566">` +
      `<input type="hidden" name="amt" value="${this.sharedData.paymentObj['amount']}">` +
      `<input type="hidden" name="orderId" value="${this.sharedData.paymentObj['orderId']}">` +
      `<input type="hidden" name="prod" value="${this.sharedData.paymentObj['narration']}">` +
      `<input type="hidden" name="email" value="${this.sharedData.paymentObj['email']}">` +
      `</form> <script type="text/javascript">document.getElementById("upay_form").submit();</script></body></html>`

    let pageContentUrl = 'data:text/html;base64,' + btoa(pageContent);
    let options = "hidden=no,location=yes,clearsessioncache=yes,clearcache=yes,hideurlbar=yes,closebuttoncolor=#ffffff,closebuttoncaption=EXIT,toolbarcolor=#0E237E,navigationbuttoncolor=#ffffff"
    let browserRef = this.inAppBrowser.create(pageContentUrl, "_blank", options);

    this.subscription = browserRef.on('loadstart').subscribe((data) => {
      this.spinnerDialog.show("Loading", "Please wait", true);
      this.spinnerEvent = data;
      console.log("SPINNER EVENT")
      console.log(this.spinnerEvent);

      setTimeout(() => {
        if (this.spinnerEvent && this.spinnerEvent.type === 'loadstart') {
          this.spinnerDialog.hide();
          browserRef.close();
          this.subscription.unsubscribe();
          this.alertSrvc.showErrorToast("Request timed out. Please try again.");
        } else {
          this.subscription.unsubscribe();
          console.log("CONDITION NOT TRUE")
          console.log(this.spinnerEvent);
        }
      }, 45000)

    }, err => {
      this.spinnerDialog.hide();
      this.subscription.unsubscribe();
      this.spinnerEvent = err;
      console.log("SPINNER EVENT")
      console.log(this.spinnerEvent);
    })

    browserRef.on('loadstop').subscribe((data) => {
      this.subscription.unsubscribe();
      this.spinnerEvent = data;
      console.log("SPINNER EVENT")
      console.log(this.spinnerEvent);

      browserRef.insertCSS({ code: "html { margin-top: -50px }" });
      let global = this;
      this.spinnerDialog.hide();
      console.log(data);
      console.log(data.url);
      let x = data.url;
      let y = x.split("/wallet/pay?");
      console.log(y);
      y.map(i => {
        let _global = global;
        if (i === 'http://localhost:8100/payments') {
          console.log(y[1].split("=")[3])
          if (y[1].split("=")[3] !== "DuplicateOrderID") {
            this.spinnerDialog.hide();
            browserRef.close();
            setTimeout(() => {
              console.log(y[1]);
              _global.storageService.store('paygatedata', y[1]);
              this.ngZone.run(() => {
                this.navCtrl.navigateForward('payments/wallet/fundwallet/confirmpayment');
              });
            }, 100)
          } else {
            this.spinnerDialog.hide();
            browserRef.close();
          }
        }
      })

      if (x.split("?Transaction")[0] === "http://localhost:8100/payments/wallet/cancel") {
        console.log("YES");
        this.spinnerDialog.hide();
        browserRef.close();
      }

      if (x.split("?")[0] === "https://fidelitypaygate.fidelitybank.ng/cipg/MerchantServices/Rejects.aspx") {
        console.log("AN ERROR HAS OCCURED");
        this.spinnerDialog.hide();
        browserRef.close();
        this.alertSrvc.showErrorToast("Payment service is currently unavailable. Please try again later.");
      }

      if (x === "https://fidelitypaygate.fidelitybank.ng/CIPG/https:/fidelitypaygate.fidelitybank.ng/cipg/customerlogin.aspx") {
        console.log("AN ERROR HAS OCCURED");
        this.spinnerDialog.hide();
        browserRef.close();
        this.alertSrvc.showErrorToast("Payment service is currently unavailable. Please try again later.");
      }

    }, err => {
      this.subscription.unsubscribe();
      this.spinnerEvent = err;
      console.log("SPINNER EVENT")
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    })

    browserRef.on('loaderror').subscribe((data) => {
      this.subscription.unsubscribe();
      this.spinnerEvent = data;
      console.log("SPINNER EVENT")
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    }, err => {
      this.subscription.unsubscribe();
      this.spinnerEvent = err;
      console.log("SPINNER EVENT")
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    })

    browserRef.on('exit').subscribe((data) => {
      this.subscription.unsubscribe();
      this.spinnerEvent = data;
      console.log("SPINNER EVENT")
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    }, err => {
      this.subscription.unsubscribe();
      this.spinnerEvent = err;
      console.log("SPINNER EVENT")
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    })
  }
  // PAYGATE IMPLEMENTATION
  // PAYGATE IMPLEMENTATION

  addNewCard(route) {
    this.navCtrl.navigateForward(route);
  }

  payFromAcc(route) {
    // this.navCtrl.navigateForward(route);
    this.handlers.validateFidelityCustomer(CustomalertComponent)
  }

  createWallet(route) {
    this.navCtrl.navigateForward(route);
  }

  accountSelected() { }

  proceedWithAccount(mode) {
    this.sharedData.paymentObj['paymentSourceId'] = this.selectedAccount;
    console.log(this.sharedData.paymentObj['paymentSourceId']);
    if (this.sharedData.billsPaymentsMode !== this.handlers.variables().flight) {
      this.sharedData.paymentObj['paymentSourceId'] = this.encryption.encrypt_AES256_CBC(this.sharedData.paymentObj['paymentSourceId']);
    }

    if (this.sharedData.billsPaymentsMode) {
      this.sharedData.paymentObj['paymentMethod'] = mode
    }

    // if (this.sharedData.billsPaymentsMode !== this.handlers.variables().boropower) {
    //   this.sharedData.paymentObj['paymentMethod'] = mode
    // } else {
    //   this.sharedData.paymentObj['serviceChargePaymentMethod'] = mode
    // }

    console.log(this.sharedData.paymentObj)
    this.navCtrl.navigateForward('payments/validate');
  }

  validateFidelityCustomer() {
    this.handlers.validateFidelityCustomer(CustomalertComponent);
  }

  getUserAccounts(data) {
    if (data && data.phoneNo) {
      this.billsPaymentsService.GetAllUserAccounts(data.phoneNo).subscribe(
        res => {
          console.log(res);
          this.sharedData.userAccounts = res;
          this.paymentData['accounts'] = this.sharedData.userAccounts;
          if (this.paymentData['accounts'] && this.paymentData['accounts'].length < 1) {
            this.alertSrvc.showErrorToast('Accounts could not be fetched at this time, please try again later');
          }
        },
        err => { }
      );
    }
  }

}
