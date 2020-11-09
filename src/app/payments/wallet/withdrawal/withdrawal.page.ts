import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Handlers } from 'src/app/shared/handlers';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { AccountService } from 'src/app/services/superapp/account.service';

@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.page.html',
  styleUrls: ['./withdrawal.page.scss', '../../../../theme/payments.scss'],
})
export class WithdrawalPage implements OnInit {

  pageReady;
  accountNo;
  amount;
  selectedBank;
  banks;
  narration;
  selectedAccount;
  accounts;
  busy;
  accountDetails;
  getAllUserAccountsSubscription;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    public handlers: Handlers,
    private walletService: WalletService,
    private billsPaymentsService: BillspaymentsService,
    private accountSrvc: AccountService,
  ) {
    this.banks = [{ bankName: 'Fidelity', value: "1" }];
    this.accounts = this.sharedData.userAccounts;

    if ((this.accounts && this.accounts.length < 1) || (!this.accounts && this.sharedData.userProfile.finaclePhoneNumber && this.sharedData.userProfile.isFidelityCustomerValidated)) {
      const data = {
        phoneNo: this.sharedData.userProfile.finaclePhoneNumber
      }
      this.getUserAccounts(data);
    }
  }

  ngOnInit() {

  }

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

  ionViewWillLeave() {
    this.getAllUserAccountsSubscription && this.getAllUserAccountsSubscription.unsubscribe();
  }
  
  accountSelected() {
    console.log(this.selectedBank)
    if(!this.selectedBank) {
      this.alertSrvc.showErrorToast("Please select bank");
    } else if (this.selectedAccount && this.selectedBank) {
      this.accountDetails = null;
      console.log(this.selectedAccount);
      this.getAccountDetails();
    }
  }

  amountChange() { }

  bankSelected() {
    if(this.selectedAccount) {
      this.getAccountDetails();
    }
  }

  narrationChange() { }

  proceed(route) {
    if (parseFloat(this.amount) < 1) {
      this.alertSrvc.showErrorToast('Invalid Amount');
      return
    } else {
      this.sharedData.paymentObj = {
        phoneNumber: this.sharedData.userProfile.walletAcctNumber,
        amount: this.amount,
        fidelityAccountNumber: this.selectedAccount,
        DestinationAccountName: this.accountDetails[0].accountName,
        narration: this.narration,
        channelSource: 'Wallet',
        transactionPin: null
      }
      this.sharedData.paymentInfo = {
        amount: this.amount,
        accountNo: this.selectedAccount,
        name: this.accountDetails[0].accountName
      }
      this.navCtrl.navigateForward(route);
    }
  }

  getAccountDetails() {
    const data = {
      accountNumber: this.selectedAccount
    }

    this.busy = this.handlers.busy();
    this.walletService.GetAccountDetails(data)
    .subscribe(
      (res: any) => {
        this.busy = !this.handlers.busy();
        if (res.responseCode === '00' && res.data) {
          this.accountDetails = res.data;
          console.log(this.accountDetails)
        } else if (res.code !== '00') {
          this.alertSrvc.showErrorToast(res.responseMessage);
        } else {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
        console.log(res)
      },
      err => {
        this.busy = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        console.log(err);
      }
    )
  }

  getUserAccounts(data) {
    this.busy = this.handlers.busy();
    if (data && data.phoneNo) {
      this.getAllUserAccountsSubscription = this.billsPaymentsService.GetAllUserAccounts(data.phoneNo).subscribe(
        res => {
          this.busy = !this.handlers.busy();
          console.log(res);
          this.sharedData.userAccounts = res;
          this.accounts = this.sharedData.userAccounts;
          if (this.accounts && this.accounts.length < 1) {
            this.alertSrvc.showErrorToast('Accounts could not be fetched at this time, please try again later');
            this.navCtrl.back();
          }
        },
        err => {
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast('Accounts could not be fetched at this time, please try again later');
          this.navCtrl.back();
        }
      );
    }
  }

}
