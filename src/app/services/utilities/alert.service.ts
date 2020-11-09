import { Injectable } from '@angular/core';
import { ToastController, ModalController, AlertController } from '@ionic/angular';
import { SuccessModalComponent } from 'src/app/components/success-modal/success-modal.component';
import { ProfileSuccessModalComponent } from 'src/app/components/profile-success-modal/profile-success-modal/profile-success-modal.component';
import { AuthSuccessModalComponent } from 'src/app/components/profile-success-modal/auth-success-modal/auth-success-modal.component';
// import { BiometricSetupComponent } from 'src/app/components/biometric-setup/biometric-setup.component';
import { OnboardingComponent } from 'src/app/components/onboarding/onboarding.component';
import { ExitappComponent } from 'src/app/components/exitapp/exitapp.component';
import { DeletenotificationComponent } from 'src/app/components/deletenotification/deletenotification.component';
import { ShownotificationComponent } from 'src/app/components/shownotification/shownotification.component';
import { BettingcompaniesComponent } from 'src/app/components/bettingcompanies/bettingcompanies.component';
import { ViewSiComponent } from 'src/app/components/view-si/view-si.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  toast: any;
  alert;

  constructor(
    private toastCtrl: ToastController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
  ) { }

  showErrorToast(message: string) {
    this.toast = this.toastCtrl.create({
      message,
      animated: true,
      duration: 5000,
      position: 'top',
      cssClass: 'errortoaster-class'
    }).then((toastData) => {
      toastData.present();
    });
  }

  showErrorToastDown(message: string) {
    this.toast = this.toastCtrl.create({
      message,
      animated: true,
      duration: 5000,
      position: 'bottom',
      cssClass: 'errortoaster-class'
    }).then((toastData) => {
      toastData.present();
    });
  }

  showSuccessToast(message: string) {
    this.toast = this.toastCtrl.create({
      message,
      animated: true,
      duration: 5000,
      position: 'top',
      cssClass: 'successtoast-class'
    }).then((toastData) => {
      toastData.present();
    });
  }

  showInfoToast(message: string) {
    this.toast = this.toastCtrl.create({
      message,
      animated: true,
      duration: 5000,
      position: 'bottom',
      cssClass: 'successtoast-class'
    }).then((toastData) => {
      toastData.present();
    });
  }

  hideToast() {
    this.toast = this.toastCtrl.dismiss();
  }

  async displaySuccessModal(message, route) {
    const modal = await this.modalCtrl.create({
      component: SuccessModalComponent,
      backdropDismiss: false,
      cssClass: 'successModal',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayProfileSuccessModal(message, route) {
    const modal = await this.modalCtrl.create({
      component: ProfileSuccessModalComponent,
      backdropDismiss: false,
      cssClass: 'profileSuccessModal',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayViewSiModal(message, route) {
    const modal = await this.modalCtrl.create({
      component: ViewSiComponent,
      backdropDismiss: false,
      cssClass: 'viewSiModal',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayAuthSuccessModal(message, route) {
    const modal = await this.modalCtrl.create({
      component: AuthSuccessModalComponent,
      backdropDismiss: false,
      cssClass: 'authSuccessModal',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayExitAppModal(message, route) {
    const modal = await this.modalCtrl.create({
      component: ExitappComponent,
      backdropDismiss: false,
      cssClass: 'exitAppModal',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayDeleteNotificationModal(message, route) {
    const modal = await this.modalCtrl.create({
      component: DeletenotificationComponent,
      backdropDismiss: false,
      cssClass: 'deleteNotification',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayShowNotificationModal(message, route) {
    const modal = await this.modalCtrl.create({
      component: ShownotificationComponent,
      backdropDismiss: true,
      cssClass: 'showNotification',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayBiometricSetupModal(component ,message, route) {
    const modal = await this.modalCtrl.create({
      component,
      backdropDismiss: false,
      cssClass: 'biometricSetupModal',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayOnboarding(message, route) {
    const modal = await this.modalCtrl.create({
      component: OnboardingComponent,
      backdropDismiss: false,
      cssClass: 'onboarding',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  async displayBettingModal(message, route) {
    const modal = await this.modalCtrl.create({
      component: BettingcompaniesComponent,
      backdropDismiss: false,
      cssClass: 'bettingCompanies',
      componentProps: {
        message,
        route
      }
    });

    return await modal.present();
  }

  /** showing alert on the page */
  async showAlert(msg, header) {
    this.alert = await this.alertCtrl.create({
      header: header !== null || undefined ? header : 'Notice',
      message: msg,
      cssClass: "notificationAlert",
      backdropDismiss: true,
      mode: "ios"
    });
    await this.alert.present();
  }

}
