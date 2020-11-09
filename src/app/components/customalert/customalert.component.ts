import { IdentifyFidelityCustomerPage } from './../../payments/identify-fidelity-customer/identify-fidelity-customer.page';
// import { Component, OnInit } from '@angular/core';
// import { SharedData } from 'src/app/shared/shared.components';
// import { Handlers } from 'src/app/shared/handlers';
// import { EventsService } from 'src/app/services/events/events.service';
// import { Router } from '@angular/router';
// import { PasswordPinService } from 'src/app/services/security/password-pin.service';
// import { NavController } from '@ionic/angular';

// @Component({
//   selector: 'app-customalert',
//   templateUrl: './customalert.component.html',
//   styleUrls: ['./customalert.component.scss'],
// })
// export class CustomalertComponent implements OnInit {

//   constructor(
//     public sharedData: SharedData,
//     public handlers: Handlers,
//     public events: EventsService,
//     private router: Router,
//     private passwordpinSrvc: PasswordPinService,
//     private navCtrl: NavController,
//   ) { }

//   ngOnInit() {}

//   action(action) {
//     if (this.sharedData.customAlertView === 'pinsetup') {
//       if(action === 'yes') {
//         this.passwordpinSrvc.displaySetupPINModal(null);
//       } else {
//         this.handlers.hide();
//         this.navCtrl.back();
//         this.sharedData.fromValidatePage = null;
//       }
//     } 
//     else if (this.sharedData.customAlertView === 'identifyCustomer') {
//       if(action === 'yes') {
//         console.log("You are a Fidelity customer");
//         this.handlers.navigate().forwardWithoutHistory('payments/identify-fidelity-customer');
//       } else {
//         this.handlers.hide();
//         this.sharedData.fromValidatePage = null;
//       }
//     }
//     else if (this.sharedData.customAlertView === 'walletcreation') {
//       this.sharedData.wallet.walletBalance = action;
//       this.events.getWalletBalance();
//     } else {
//       this.sharedData.action = action;
//       this.events.getModalValue();
//     }
//     this.handlers.hide();
//   }

//   closeWalletModal(route) {
//     this.handlers.hide();
//     this.router.navigate([route])
//   }

// }
















import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { EventsService } from 'src/app/services/events/events.service';
import { Router } from '@angular/router';
import { PasswordPinService } from 'src/app/services/security/password-pin.service';
import { ModalBaseComponent } from './../modal-base/modal-base.component';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-customalert',
  templateUrl: './customalert.component.html',
  styleUrls: ['./customalert.component.scss', '../../../theme/payments.scss'],
})
export class CustomalertComponent implements OnInit {

  constructor(
    public sharedData: SharedData,
    public handlers: Handlers,
    public events: EventsService,
    private router: Router,
    private passwordpinSrvc: PasswordPinService,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {}

  action(action) {
    if (this.sharedData.customAlertView === 'pinsetup') {
      if(action === 'yes') {
        this.passwordpinSrvc.displaySetupPINModal(null);
      } else {
        this.handlers.hide();
        this.navCtrl.back();
        this.sharedData.fromValidatePage = null;
      }
    } 
    else if (this.sharedData.customAlertView === 'identifyCustomer') {
      if(action === 'yes') {
        console.log("You are a Fidelity customer");
        this.handlers.hide();
        this.handlers.presentRoutingModal(IdentifyFidelityCustomerPage)
        // this.handlers.navigate().forwardWithoutHistory('payments/identify-fidelity-customer');
      } else {
        this.handlers.hide();
        this.sharedData.fromValidatePage = null;
      }
    }
    else if (this.sharedData.customAlertView === 'walletcreation') {
      this.sharedData.wallet.walletBalance = action;
      this.events.getWalletBalance();
    } else {
      this.sharedData.action = action;
      this.events.getModalValue();
    }
    this.handlers.hide();
  }

  closeWalletModal(route) {
    this.handlers.hide();
    this.navCtrl.navigateBack(route);
  }

}
