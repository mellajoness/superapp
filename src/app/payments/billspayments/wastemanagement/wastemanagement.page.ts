import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { BillsmodalComponent } from '../../../components/billsmodal/billsmodal.component';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-wastemanagement',
  templateUrl: './wastemanagement.page.html',
  styleUrls: ['./wastemanagement.page.scss', '../../../../theme/payments.scss'],
})
export class WastemanagementPage implements OnInit {

  constructor(
    public sharedData: SharedData,
    private router: Router,
    private navCtrl: NavController,
    public handlers: Handlers
  ) { }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  pay(paymentType, item) {
    this.sharedData.paymentType = paymentType;
    this.navCtrl.navigateForward('/payments/billspayments/forms');
  }

}
