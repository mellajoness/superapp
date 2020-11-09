import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordComponent } from 'src/app/components/forgot-password/forgot-password.component';
import { SetupPinComponent } from '../../components/setup-pin/setup-pin.component';
import { ForgotPinComponent } from '../../components/forgot-pin/forgot-pin.component';
import { TopUpComponent } from '../../components/top-up/top-up.component';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ForgotPasswordPrimaryComponent } from 'src/app/components/forgot-password-primary/forgot-password-primary.component';

@Injectable({
  providedIn: 'root'
})
export class PasswordPinService {

  constructor(
    public modalCtrl: ModalController,
  ) { }

  async displayForgotPasswordModal() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordComponent,
      backdropDismiss: false,
      cssClass: 'passwordResetModal',
    });
    return await modal.present();
  }

  async displayForgotPasswordModalPrimary() {
    const modal = await this.modalCtrl.create({
      component: ForgotPasswordPrimaryComponent,
      backdropDismiss: false,
      cssClass: 'passwordResetModal',
    });
    return await modal.present();
  }

  async displaySetupPINModal(componentProps) {
    const modal = await this.modalCtrl.create({
      component: SetupPinComponent,
      backdropDismiss: false,
      cssClass: 'setupPINModal',
      componentProps
    });
    // const { data } = await modal.onWillDismiss();
    // console.log(data);
    return await modal.present();
  }

  async displayForgotPINModal(componentProps) {
    const modal = await this.modalCtrl.create({
      component: ForgotPinComponent,
      backdropDismiss: false,
      cssClass: 'forgotPINModal',
      componentProps
    });

    return await modal.present();
  }


  // async displayPaymentModal(componentProps) {
  //   const modal = await this.modalCtrl.create({
  //     component: TopUpComponent,
  //     backdropDismiss: false,
  //     cssClass: 'paymentModal',
  //     componentProps
  //   });

  //   return await modal.present();
  // }

  async displayChangePWModal(componentProps) {
    const modal = await this.modalCtrl.create({
      component: ChangePasswordComponent,
      backdropDismiss: false,
      cssClass: 'passwordModal',
      componentProps
    });

    return await modal.present();
  }

}
