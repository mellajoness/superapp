import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss', '../../../../../theme/payments.scss'],
})
export class SuccessPage implements OnInit {

  subscription: Subscription;

  constructor(
    public sharedData: SharedData,
    public handlers: Handlers,
    private router: Router,
    private navCtrl: NavController,
    private platform: Platform,
    private ngZone: NgZone
  ) {

    console.log(this.sharedData.paymentDetails);

  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('payments/billspayments');
    this.sharedData.beneficiary = null;
  }

  ionViewWillLeave() {
    this.sharedData.beneficiary = null;
  }

}
