import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage/storage.service';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';
import { Handlers } from 'src/app/shared/handlers';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-confirmpayment',
  templateUrl: './confirmpayment.page.html',
  styleUrls: ['./confirmpayment.page.scss', '../../../../../theme/payments.scss'],
})
export class ConfirmpaymentPage implements OnInit {

  paygateData;
  transactionRef;
  orderId;
  paymentDetails;
  busy;

  constructor(
    private storageService: StorageService,
    private navCtrl: NavController,
    public sharedData: SharedData,
    private walletService: WalletService,
    public handlers: Handlers,
    private alertSrvc: AlertService,
    private router: Router,
    public events: EventsService,
  ) {

    this.storageService.get('paygatedata').then(res => {
      console.log(res);
      this.paygateData = res;
    })

  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.confirm();
    }, 1000)
  }

  confirm() {
    console.log("I'm working");
    console.log(this.paygateData);
    
    let x = this.paygateData.split("&");
    let transactionRef = x[0];
    let orderId = x[1];
    this.transactionRef = transactionRef.split("=")[1];
    this.orderId = orderId.split("=")[1];

    console.log("OrderID = " + this.orderId);
    console.log("TransactionReference = " + this.transactionRef);
    console.log(this.sharedData.paymentObj)
    
    const data = {
      phoneNumber: this.sharedData.userProfile.walletAcctNumber,
      channel: "Wallet",
      orderID: this.orderId,
      merchantID: "07666",
      currencyCode: "566",
      amount: this.sharedData.paymentObj["amount"],
      transactionReference: this.transactionRef
    }

    console.log(data);

    this.busy = this.handlers.busy();
    this.walletService.Verifytransactionstatus(data)
    .subscribe(
      (res: any) => {
        this.busy = !this.handlers.busy();
        if (res.responseCode === '00' && res.data) {
          this.paymentDetails = res.data
          this.sharedData.paymentDetails = res.data
          this.sharedData.paymentInfo = data.amount + " has been credited to your wallet";
          this.navCtrl.navigateForward('payments/success');
          this.reloadAccounts();
          this.refreshWallet();
          this.refreshDashboardWallet();
        } else if (res.responseCode !== '00') {
          this.navCtrl.navigateBack('payments/wallet');
          this.alertSrvc.showErrorToast(res.responseMessage);
        } else {
          this.navCtrl.navigateBack('payments/wallet');
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
        console.log(res);
      },
      err => {
        this.busy = !this.handlers.busy();
        this.navCtrl.navigateBack('payments/wallet');
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
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
