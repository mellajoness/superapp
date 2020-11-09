import { Injectable } from '@angular/core';
import { TopUpComponent } from 'src/app/components/top-up/top-up.component';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class FundingService {

  constructor(
    private modalCtrl: ModalController
  ) { }

  async displayPaymentModal(componentProps) {
    const modal = await this.modalCtrl.create({
      component: TopUpComponent,
      backdropDismiss: false,
      cssClass: 'paymentModal',
      componentProps
    });

    return await modal.present();
  }

}
