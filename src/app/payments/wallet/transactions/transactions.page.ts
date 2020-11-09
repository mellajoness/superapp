import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.page.html',
  styleUrls: ['./transactions.page.scss', '../../../../theme/payments.scss'],
})
export class TransactionsPage implements OnInit {

  pageReady;
  transactionData;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.transactionData = this.sharedData.wallet.transactionData;
  }

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

}
