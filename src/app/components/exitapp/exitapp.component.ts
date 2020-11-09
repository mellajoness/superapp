import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exitapp',
  templateUrl: './exitapp.component.html',
  styleUrls: ['./exitapp.component.scss', '../../../theme/payments.scss'],
})
export class ExitappComponent implements OnInit {

  successRoute;
  successMessage;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private router: Router ) { }

  ngOnInit() {
    this.successMessage = this.navParams.get('message');
    this.successRoute = this.navParams.get('route');
  }

  dismiss(bool) {
    this.modalCtrl.dismiss();
    if(bool) {
      if (this.successRoute === '/auth') {
        this.router.navigate([this.successRoute]);
      } else {
        navigator['app'].exitApp();
      }
    }
  }

}
