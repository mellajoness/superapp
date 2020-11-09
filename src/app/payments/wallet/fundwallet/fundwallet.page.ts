import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-fundwallet',
  templateUrl: './fundwallet.page.html',
  styleUrls: ['./fundwallet.page.scss', '../../../../theme/payments.scss'],
})
export class FundwalletPage implements OnInit {

  pageReady;
  bvn;
  busy;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
  ) {}

  ngOnInit() {

  }

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

  bvnChange() {}

  submit(route) {
    if (this.bvn.length < 11) {
      this.alertSrvc.showErrorToast("Invalid BVN")
      return
    } else {

      const data = {
        phoneNo: this.sharedData.userPhone,
        bvn: this.bvn,
        route: route
      }

      this.busy = this.handlers.busy();

      this.billsPaymentsService.UpdateBvn(data)
        .subscribe(
          (res: any) => {
            console.log(res);
            this.sharedData.userProfile.bvn = this.bvn;
            this.getUserAccounts(data);
          },
          err => {
            console.log(err);
            this.getUserAccounts(data);
          }
        )
    }
  }

  getUserAccounts(data) {
    this.billsPaymentsService.GetAllUserAccountsByBVN(data.bvn).subscribe(
      res => {
        console.log(res);
        this.busy = !this.handlers.busy();
        this.sharedData.userAccounts = res;
        if(this.sharedData.userAccounts && this.sharedData.userAccounts.length > 0) {
          this.go(data.route);
        } else {
          this.alertSrvc.showErrorToast('Accounts could not be fetched at this time, please try again later');
        }
      },
      err => {
        this.busy = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
      }
    );
  }

}
