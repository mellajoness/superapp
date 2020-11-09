import { AuthService } from './../../services/auth/auth.service';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss', '../../../theme/payments.scss'],
})
export class HelpPage implements OnInit {

  MobileAppVersion;

  constructor(
    private navCtrl: NavController,
    private authSrvc: AuthService
  ) {
    this.getAppVersion()
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  go(path) {
    (window as any).open(path, '_system', 'location=yes');
  }

  async getAppVersion() {
    this.MobileAppVersion = await this.authSrvc.getAppVersion()
  }

}
