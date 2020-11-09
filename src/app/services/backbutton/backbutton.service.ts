import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { EventsService } from '../events/events.service';
import { AlertService } from '../utilities/alert.service';

@Injectable({
  providedIn: 'root'
})
export class BackbuttonService {

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
    private ngZone: NgZone,
    public events: EventsService,
    private alertSrvc: AlertService,
  ) { }

  backPress() {
    console.log('ROUNTER BELOW')
    console.log(this.router.url);
    console.log(this.sharedData.billsPaymentsMode);
    if(!this.sharedData.isLoading) {
      if (this.router.isActive('/payments/success', true) && this.router.url === '/payments/success' && this.sharedData.billsPaymentsMode !== this.handlers.variables().wallet) {
        this.ngZone.run(() => {
          console.log('GOING TO BILLSPAYMENT');
          this.navCtrl.navigateBack('payments/billspayments');
        })
      } else if (this.router.isActive('/payments/success', true) && this.router.url === '/payments/success' && this.sharedData.billsPaymentsMode === this.handlers.variables().wallet) {
        this.ngZone.run(() => {
          this.navCtrl.navigateBack('payments/wallet');
          console.log('GOING TO WALLET PAGE')
        })
      } else if (this.router.isActive('/payments/billspayments/sendmoney/success', true) && this.router.url === '/payments/billspayments/sendmoney/success') {
        this.ngZone.run(() => {
          console.log('GOING TO BILLSPAYMENT');
          this.navCtrl.navigateBack('payments/billspayments')
        })
      } else if (this.router.isActive('/payments/billspayments', true) && this.router.url === '/payments/billspayments') {
        this.ngZone.run(() => {
          console.log('GOING TO PAYMENT');
          this.navCtrl.navigateBack('payments')
        })
      } else if (this.router.isActive('/payments/wallet', true) && this.router.url === '/payments/wallet' && this.sharedData.wallet.url !== '/home') {
        this.ngZone.run(() => {
          console.log('GOING TO PAYMENT');
          this.navCtrl.navigateBack('payments')
        })
      } else if (this.router.isActive('/payments/wallet', true) && this.router.url === '/payments/wallet' && this.sharedData.wallet.url === '/home') {
        this.ngZone.run(() => {
          console.log('GOING HOME');
          this.navCtrl.navigateBack('home')
        })
      } else if (this.router.isActive('/payments', true) && this.router.url === '/payments') {
        this.ngZone.run(() => {
          console.log('GOING HOME');
          this.navCtrl.navigateBack('home')
        })
      } else if ((this.router.isActive('/home/dashboard/home', true) || this.router.url === '/home/dashboard/home') || (this.router.isActive('/home/dashboard/history', true) || this.router.url === '/home/dashboard/history') || (this.router.isActive('/home/dashboard/help', true) || this.router.url === '/home/dashboard/help')) {
        this.presentExitApp();
      } else if ((this.router.isActive('/auth', true) || this.router.url === '/auth') || (this.router.isActive('/auth/login', true) || this.router.url === '/auth/login')) {
        navigator['app'].exitApp();
      } else if (this.sharedData.isModalActive) {
        this.handlers.hide();
      } else {
        console.log('GOING OTHER PAGE');
        this.navCtrl.back();
      }
    }
  }

  async presentExitApp() {
    this.alertSrvc.displayExitAppModal('Exit App?', 'app')
  }

}
