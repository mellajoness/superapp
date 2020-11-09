import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-addcard',
  templateUrl: './addcard.page.html',
  styleUrls: ['./addcard.page.scss', '../../../theme/payments.scss'],
})
export class AddcardPage implements OnInit {

  num;
  icon;

  constructor(
    public sharedData: SharedData,
    private router: Router,
    private navCtrl: NavController,
  ) {

    this.num = "1";
    this.icon = 'verve.png';

  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  proceed(mode) {
    this.sharedData.paymentObj['paymentMethod'] = mode;
    console.log(this.sharedData.paymentObj)
    this.navCtrl.navigateForward('payments/validate');
  }

  card(num) {
    this.num = num;

    if(this.num === '1') {
      this.icon = 'verve.png';
    } else if(this.num === '2') {
      this.icon = 'mastercard.png';
    } else if(this.num === '3') {
      this.icon = 'visa.png';
    }
  }

  makePayment() {
    
  }

}
