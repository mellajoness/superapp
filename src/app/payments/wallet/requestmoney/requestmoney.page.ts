import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { WalletmodalComponent } from 'src/app/components/walletmodal/walletmodal.component';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';

@Component({
  selector: 'app-requestmoney',
  templateUrl: './requestmoney.page.html',
  styleUrls: ['./requestmoney.page.scss', '../../../../theme/payments.scss'],
})
export class RequestmoneyPage implements OnInit {

  pageReady;
  amount;
  comment;

  constructor(
    private router: Router,
    private navCtrl: NavController,
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

  presentModal(view) {
    this.sharedData.wallet.modalView = view;
    this.handlers.showWalletModal(WalletmodalComponent)
  }

  amountChange() {}

  commentChange() {}

  send() {
    this.sharedData.customAlertView = 'wallet';
    this.handlers.showCustomAlertModal(CustomalertComponent);
  }

}
