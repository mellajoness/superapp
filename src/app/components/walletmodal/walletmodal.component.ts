import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Handlers } from 'src/app/shared/handlers';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';

@Component({
  selector: 'app-walletmodal',
  templateUrl: './walletmodal.component.html',
  styleUrls: ['./walletmodal.component.scss', '../../../theme/payments.scss'],
})
export class WalletmodalComponent implements OnInit {
  
  view;
  accounts;

  constructor(
    public sharedData: SharedData,
    private navCtrl: NavController,
    private router: Router,
    public handlers: Handlers,
    private alertSrvc: AlertService,
  ) {
    this.view = this.sharedData.wallet.modalView;
    this.accounts = this.sharedData.userAccounts;
  }

  ngOnInit() {}

  go(route, view) {
    this.sharedData.wallet.pageView = view;
    this.handlers.hide();
    if (route === 'payments/wallet/fundwallet/accounts' && (!this.sharedData.userProfile.isFidelityCustomerValidated && !this.sharedData.userProfile.finaclePhoneNumber)) {
      this.identifyCustomer()
    } else {
      this.navCtrl.navigateForward(route);
    }
  }

  identifyCustomer() {
    this.handlers.validateFidelityCustomer(CustomalertComponent);
  }

}
