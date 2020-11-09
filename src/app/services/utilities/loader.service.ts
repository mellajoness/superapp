import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading;

  constructor(public loadingCtrl: LoadingController, public sharedData: SharedData) {
  }


  async showLoader() {
    this.isLoading = true;
    this.sharedData.isLoading = this.isLoading
    return await this.loadingCtrl.create({
      // translucent: true,
      showBackdrop: true,
      spinner: null,
      mode: 'ios',
      keyboardClose: true,
      message: '<ion-img src="assets/icon/dual-balls-loader2.gif" alt="loading..."></ion-img>',
      cssClass: 'loader'
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          this.isLoading = false;
          this.sharedData.isLoading = this.isLoading
          a.dismiss().then(() => console.log('abort loading'));
        }
      });
    }).catch(e => {
      this.isLoading = false;
      this.sharedData.isLoading = this.isLoading
    });
  }

  async hideLoader() {
    this.isLoading = false;
    this.sharedData.isLoading = this.isLoading
    return await this.loadingCtrl.dismiss().then(() => console.log('loading dismissed'));
  }

  async dismissAllLoaders() {
    let topLoader = await this.loadingCtrl.getTop();
    while (topLoader) {
      if (!(await topLoader.dismiss())) {
        throw new Error('Could not dismiss the topmost loader. Aborting...');
      }
      topLoader = await this.loadingCtrl.getTop();
    }
    topLoader.dismiss();
  }


  loadCtrl(msg: any) {
    return this.loadingCtrl.create({
      spinner: 'bubbles',
      // duration: 3000,
      translucent: true,
      message: msg,
      cssClass: 'custom-class-custom-loading',
      backdropDismiss: true,
      mode:'md'
    });
  }

}
