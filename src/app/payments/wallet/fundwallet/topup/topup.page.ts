import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss', '../../../../../theme/payments.scss'],
})
export class TopupPage implements OnInit {

  pageReady;
  amount;
  narration;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    public handlers: Handlers,
  ) { }

  ngOnInit() {

  }

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

  amountChange() {}

  narrationChange() {}

  proceed(route, view) {
    if (view === 'fundwallet-bank') {
      if(parseFloat(this.amount) < 1) {
        this.alertSrvc.showErrorToast('Invalid Amount');
        return
      } else {
        this.sharedData.paymentObj['amount'] = this.amount;
        this.sharedData.paymentObj['narration'] = this.narration;
        this.sharedData.paymentInfo = {
          amount: this.amount,
          accountNo: this.sharedData.paymentObj['sourceAccountNumber']
        }
        this.navCtrl.navigateForward(route);
      }
    } else {
      if (parseFloat(this.amount) < 1) {
        this.alertSrvc.showErrorToast('Invalid Amount');
        return
      } else {
        this.sharedData.paymentObj = {
          amount: this.amount,
          narration: this.narration,
          email: this.sharedData.userProfile.emailAddress,
          orderId: null
        }
        console.log(this.sharedData.paymentObj);
        this.navCtrl.navigateForward(route);
      }
    }
  }

}
