import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { NavController } from '@ionic/angular';
import { Handlers } from 'src/app/shared/handlers';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss', '../../../../../theme/login.scss'],
})
export class CreatePage implements OnInit {

  selectedAccount;
  accounts;
  busy;
  ready;
  amount;
  item;
  startDate;

  constructor(
    public modalController: ModalController,
    public sharedData: SharedData,
    private navCtrl: NavController,
    public handlers: Handlers,
    public alertSrvs: AlertService
  ) {
    this.ready = true;
  }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

  open() {
    this.alertSrvs.displayViewSiModal(null, null)
  }

  accountSelected() {

  }

  amountChange() {

  }

  action(action) {
    console.log(action);
    this.item = action
  }

  // Search Tab
  validateDates() {
  }

  proceed() {
    this.navCtrl.navigateForward('/payments/billspayments/standinginstruction/summary');
  }
}
