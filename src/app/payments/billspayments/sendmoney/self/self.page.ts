import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { WalletmodalComponent } from 'src/app/components/walletmodal/walletmodal.component';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { PaymentslogicService } from 'src/app/services/payments/paymentslogic/paymentslogic.service';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-self',
  templateUrl: './self.page.html',
  styleUrls: ['./self.page.scss', '../../../../../theme/payments.scss'],
})
export class SelfPage implements OnInit {

  pageReady;
  amount;
  narration;

  accountToDebit;
  atd;
  atc;
  accountToCredit;
  accounts;
  destinationAccounts;
  busy;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
    private alertSrvc: AlertService,
    private paymentlogicService: PaymentslogicService
  ) {

    this.accountToDebit = "Account to debit";
    this.atd = false;
    this.atc = false;
    this.accountToCredit = "Account to credit"

    this.accounts = [
      { 
        "foracid": "50XXXXXXXX",
        "schM_CODE": "CA505",
        "schM_TYPE": "CAA",
        "clR_BAL_AMT": 123456.58,
        "balance": 123456.58,
        "freZ_CODE": " ",
        "soL_ID": "062",
        "accT_NAME": "HARDCODED VALUE",
        "cusT_ID": "R04901215",
        "emP_ID": "",
        "accT_OPN_DATE":
        "2019-08-20T00:00:00"
      },
      {
        "foracid": "63XXXXXXXX",
        "schM_CODE": "SB632",
        "schM_TYPE": "SBA",
        "clR_BAL_AMT": 123456.29,
        "balance": 123456.29,
        "freZ_CODE": " ",
        "soL_ID": "098",
        "accT_NAME": "HARDCODED VALUE",
        "cusT_ID": "R04901215",
        "emP_ID": "S0539",
        "accT_OPN_DATE": "2019-07-02T00:00:00"
      }
    ]
    this.accounts = this.paymentlogicService.formatAccounts(this.accounts);
    console.log(this.accounts);

  }

  ngOnInit() {

  }

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

  amountChange() { }

  narrationChange() { }

  proceed(route) {
    if (parseFloat(this.amount) < 1) {
      this.alertSrvc.showErrorToast('Invalid Amount');
      return
    } else {
      this.navCtrl.navigateForward(route);
    }
  }

  accountToTransferTo(accountObj) {
    let accounts = new Array();
    this.accounts.map((item) => {
      if (this.paymentlogicService.filterDestinationAccount(item, accountObj)) {
        accounts.push(item);
      }
    })
    // store the final object to a global variable
    this.destinationAccounts = accounts;
    console.log(this.destinationAccounts);
  }


  async showAccounts(mode) {
    let buttons = mode === 'from' ? this.accounts : this.destinationAccounts;
    let account = await this.handlers.showActionSheet("Select the account to be debited", buttons);
    if (account.role !== 'backdrop' && mode === 'from') {
      this.atd = true;
      this.atc = false;
      console.log(account);
      this.accountToCredit = "Account to credit";
      this.accountToDebit = account.role['text'];
      this.accountToTransferTo(account);
    } else if (account.role !== 'backdrop' && mode === 'to') {
      this.atc = true;
      console.log(account);
      this.accountToCredit = account.role['text'];
    }
  }

}
