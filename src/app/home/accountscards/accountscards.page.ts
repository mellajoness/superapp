import { Handlers } from 'src/app/shared/handlers';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { AccountService } from 'src/app/services/superapp/account.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';

@Component({
  selector: 'app-accountscards',
  templateUrl: './accountscards.page.html',
  styleUrls: ['./accountscards.page.scss', '../../../theme/payments.scss'],
})
export class AccountscardsPage implements OnInit {

  accountSlideOptions = {
    slidesPerView: 1.2,
  }
  userValidated;
  finacleAccounts;
  accountBackground = {};

  constructor(
    private navCtrl: NavController,
    private userService: UserService,
    private accountService: AccountService,
    private handlers: Handlers
  ) {
    this.userService.currentUserProfile.subscribe(
      res => {
        this.userValidated = res.isFidelityCustomerValidated;
      }
    );

    this.accountService.currentAccountsData.subscribe(
      res => {
        this.finacleAccounts = res;
      }
    );
    this.accountBackgroundGenerator();

    if (this.finacleAccounts.length === 1) {
      this.accountSlideOptions.slidesPerView = 1;
    }
  }

  ngOnInit() {
  }

  goBack() {
    this.navCtrl.back();
  }

  accountBackgroundGenerator() {
    this.finacleAccounts.forEach((element, index) => {
      const num = this.handlers.getRandomIntInclusive(1, 2);
      const background = `url('../../../assets/imgs/slider/account-card${num}.svg')`
      this.accountBackground[`_${index}`] = background
    });
  }

  validateCustomer() {
    this.handlers.validateFidelityCustomer(CustomalertComponent);
  }


}
