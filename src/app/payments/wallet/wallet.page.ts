import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Handlers } from 'src/app/shared/handlers';
import { WalletmodalComponent } from 'src/app/components/walletmodal/walletmodal.component';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';
import { WalletlogicService } from 'src/app/services/payments/walletlogic/walletlogic.service';
import { EventsService } from 'src/app/services/events/events.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.page.html',
  styleUrls: ['./wallet.page.scss', '../../../theme/payments.scss'],
})
export class WalletPage implements OnInit {

  pageReady;
  transactionData;
  shortenTransactionData;
  walletData;
  accounts;
  currEvent;
  getalltransactionsSubscription;
  checkbalanceSubscription;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    public handlers: Handlers,
    private walletService: WalletService,
    private walletlogicService: WalletlogicService,
    public events: EventsService
  ) {
    this.sharedData.billsPaymentsMode = this.handlers.variables().wallet;
    this.accounts = this.sharedData.userAccounts;
  }

  ngOnInit() {
    this.init();
    this.subscribeToAccountReload();
  }

  goBack() {
    if (this.sharedData.wallet.url === '/home') {
      this.navCtrl.navigateBack('/home')
    } else {
      this.navCtrl.navigateBack('/payments')
    }
  }

  go(route, item, view) {
    this.sharedData.wallet.pageView = view
    if (item && (!this.sharedData.userProfile.isFidelityCustomerValidated && !this.sharedData.userProfile.finaclePhoneNumber)) {
      this.identifyCustomer()
    } else {
      this.navCtrl.navigateForward(route);
    }
  }

  presentModal(view) {
    this.sharedData.walletBeneficiary = null;
    this.sharedData.walletBeneficiaries = null;
    this.sharedData.walletBank = null;
    this.sharedData.walletBanks = null;
    this.sharedData.wallet.modalView = view;
    this.handlers.showWalletModal(WalletmodalComponent)
  }

  ionViewWillLeave() {
    this.getalltransactionsSubscription && this.getalltransactionsSubscription.unsubscribe();
    this.checkbalanceSubscription && this.checkbalanceSubscription.unsubscribe();
  }

  getalltransactions() {
    if (this.sharedData.userProfile && this.sharedData.userProfile.walletAcctNumber) {
      const data = { wallet_id: this.sharedData.userProfile.walletAcctNumber }
      this.getalltransactionsSubscription = this.walletService.Getalltransactions(data)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res && res.responseCode === "00") {
            this.transactionData = res.data;
            this.transactionData = this.walletlogicService.formatTransactionsData(this.transactionData);
            this.shortenTransactionData = this.walletlogicService.shortenTransactionData(this.transactionData);
            this.sharedData.wallet.transactionData = this.transactionData;
            console.log("UNCOMMENT this.navCtrl.back();")
            this.pageReady = true;
          } else {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.navCtrl.back();
          }
        },
        err => {
          console.log(err);
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.navCtrl.back();
        }
      )
    }
  }

  checkbalance() {
    if (this.sharedData.userProfile && this.sharedData.userProfile.walletAcctNumber) {
      const data = { wallet_id: this.sharedData.userProfile.walletAcctNumber }

      this.checkbalanceSubscription = this.walletService.Checkbalance(data)
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res && res.responseCode === "00") {
            this.walletData = res.data
            this.getalltransactions();
          } else {
            this.alertSrvc.showErrorToast(res.responseMessage);
            this.navCtrl.back();
          }
        },
        err => {
          console.log(err);
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.navCtrl.back();
        }
      )
    }
  }
  
  // SEPARATE METHOD SUBSCRIBED TO TO REFRESH WALLET PAGE
  refreshWallet() {
    if (this.sharedData.userProfile && this.sharedData.userProfile.walletAcctNumber) {
      const data = { wallet_id: this.sharedData.userProfile.walletAcctNumber }
      this.walletService.Checkbalance(data)
        .subscribe(
          (res: any) => {
            if (res && res.responseCode === "00") {
              console.log("WALLET BALANCE REFERESHED");
              this.sharedData.wallet.walletData = res.data;
              this.walletData = this.sharedData.wallet.walletData;
              const data = { wallet_id: this.sharedData.userProfile.walletAcctNumber }
              this.walletService.Getalltransactions(data)
                .subscribe(
                  (res: any) => {
                    if (res && res.responseCode === "00") {
                      console.log("WALLET TRANSACTIONS REFRESHED");
                      this.transactionData = res.data;
                      this.transactionData = this.walletlogicService.formatTransactionsData(this.transactionData);
                      this.shortenTransactionData = this.walletlogicService.shortenTransactionData(this.transactionData);
                      this.sharedData.wallet.transactionData = this.transactionData;
                      this.pageReady = true;
                    }
                  },
                  err => {}
                )
            } else {}
          },
          err => {}
        )
    }
  }

  init() {
    this.checkbalance();
  }

  subscribeToAccountReload() {
    this.currEvent = this.events.observeWallet.subscribe(res => {
      console.log("WALLET SUBSCRIPTION INITIATED")
      if (res === 'yes') {
        console.log("WALLET SUBSCRIBED");
        this.refreshWallet();
      } else {}
    });
  }

  identifyCustomer() {
    this.handlers.validateFidelityCustomer(CustomalertComponent);
  }

}
