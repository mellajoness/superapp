import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { NavController } from '@ionic/angular';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-standinginstruction',
  templateUrl: './standinginstruction.page.html',
  styleUrls: ['./standinginstruction.page.scss', '../../../../theme/payments.scss'],
})
export class StandinginstructionPage implements OnInit {

  constructor(
    public modalController: ModalController,
    public sharedData: SharedData,
    private navCtrl: NavController,
    public handlers: Handlers,
  ) { }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

}
