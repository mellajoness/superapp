import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-success-modal',
  templateUrl: './profile-success-modal.component.html',
  styleUrls: ['./profile-success-modal.component.scss', '../../../../theme/payments.scss'],
})
export class ProfileSuccessModalComponent implements OnInit {

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

  dismiss() {
    this.modalCtrl.dismiss();
    if (this.successRoute) {
      this.router.navigate([this.successRoute]);
    }
  }

}
