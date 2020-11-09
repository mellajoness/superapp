import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { SharedData } from 'src/app/shared/shared.components';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { Handlers } from 'src/app/shared/handlers';
import { AccountService } from 'src/app/services/superapp/account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss', '../../../../../theme/payments.scss'],
})
export class AccountsPage implements OnInit {

  pageReady;
  accounts;
  busy;
  getAllUserAccountsSubscription;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    private accountSrvc: AccountService,
    private alertService: AlertService,
  ) {
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

  ionViewWillLeave() {
    this.getAllUserAccountsSubscription && this.getAllUserAccountsSubscription.unsubscribe();
  }

  goBack() {
    this.navCtrl.back();
  }

  go(route, account) {
    console.log(account);
    if (this.sharedData.userProfile && this.sharedData.userProfile.walletAcctNumber) {
      this.sharedData.paymentObj = {
        phoneNumber: this.sharedData.userProfile.walletAcctNumber,
        amount: null,
        sourceAccountNumber: account.foracid,
        SourceAccountName: account.accT_NAME,
        narration: null,
        channelSource: "Wallet",
        transactionPin: null
      }
      this.navCtrl.navigateForward(route);
    }
  }

  getUserAccounts(data) {
    if (data && data.phoneNo) {
      this.busy = this.handlers.busy();
      this.getAllUserAccountsSubscription = this.billsPaymentsService.GetAllUserAccounts(data.phoneNo).subscribe(
        res => {
          this.busy = !this.handlers.busy();
          console.log(res);
          this.sharedData.userAccounts = res;
          this.accounts = this.sharedData.userAccounts;
          if(this.accounts && this.accounts.length < 1) {
            this.alertService.showErrorToast('Accounts could not be fetched at this time, please try again later');
            this.navCtrl.back();
          }
        },
        err => {
          this.busy = !this.handlers.busy();
          this.alertService.showErrorToast('Accounts could not be fetched at this time, please try again later');
          this.navCtrl.back();
        }
      );
    }
  }

}
