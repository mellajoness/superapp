import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {LoantopupmodalComponent} from '../../loans/modals/loantopupmodal/loantopupmodal.component'
@Component({
  selector: 'app-loantopup',
  templateUrl: './loantopup.page.html',
  styleUrls: ['./loantopup.page.scss'],
})
export class LoantopupPage implements OnInit {
  dashboardData: any = [];
  topupLists = [];
  hasList = false;
  noList = false;
  fromTopUpPage = true;


  constructor(
    public modalController: ModalController) { 

    }


  
  async presentModal() {
    const modal = await this.modalController.create({
      component: LoantopupmodalComponent,
      cssClass:'my-customloantopup-modal-css'
    });
    return await modal.present();
  }
  ngOnInit() {
  }

}
