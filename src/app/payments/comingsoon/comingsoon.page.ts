import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comingsoon',
  templateUrl: './comingsoon.page.html',
  styleUrls: ['./comingsoon.page.scss', '../../../theme/payments.scss'],
})
export class ComingsoonPage implements OnInit {

  password;
  paymentDetails;

  constructor(
    private navCtrl: NavController,
    public sharedData: SharedData,
    private router: Router,
  ) {}

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

}
