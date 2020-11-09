import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { BillsmodalComponent } from '../../../components/billsmodal/billsmodal.component';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-utilities',
  templateUrl: './utilities.page.html',
  styleUrls: ['./utilities.page.scss', '../../../../theme/payments.scss'],
})
export class UtilitiesPage implements OnInit {

  constructor(
    public sharedData: SharedData ,
    private router: Router,
    private navCtrl: NavController,
    public handlers: Handlers
  ) { }

  presentModal(modalCSS) {
    this.handlers.presentModal(modalCSS, BillsmodalComponent)
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillEnter() {
    this.sharedData.previousRoute = this.router.url
  }

  tollPayment(paymentType) {
    this.sharedData.paymentType = paymentType;
    this.navCtrl.navigateForward('/payments/billspayments/forms');
  }

  wasteManagement() {
    this.navCtrl.navigateForward('/payments/billspayments/wastemanagement');
  }

}
