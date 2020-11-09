import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { NavController } from '@ionic/angular';
import { Handlers } from 'src/app/shared/handlers';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.page.html',
  styleUrls: ['./view.page.scss', '../../../../../theme/login.scss'],
})
export class ViewPage implements OnInit {

  constructor(
    public modalController: ModalController,
    public sharedData: SharedData,
    private navCtrl: NavController,
    public handlers: Handlers,
    public alertSrvs: AlertService
  ) { }

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

}
