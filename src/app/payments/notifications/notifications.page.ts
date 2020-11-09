import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { SharedData } from 'src/app/shared/shared.components';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss', '../../../theme/payments.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
  ) { }

  ngOnInit() { }

  goBack() {
    this.navCtrl.back();
  }

  showNotification(item) {
    if (item === "second") {
      this.alertSrvc.showAlert("You made a transfer to Emmanuel Diala Today at 3.30pm and the transaction was not successful. We have tried to resend the money again and it was successful. Sorry for any inconvenience we may have caused", "Transaction not Successful")
    } else {
      this.alertSrvc.showAlert("You need to upgrade your trupay app to use the new feature released. The new feature has new and exciting offer.", "Upgrade your Trupay Application")
    }
  }

}
