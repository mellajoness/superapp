import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Handlers } from 'src/app/shared/handlers';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { EventsService } from 'src/app/services/events/events.service';
@Component({
  selector: 'app-exchangerate',
  templateUrl: './exchangerate.page.html',
  styleUrls: ['./exchangerate.page.scss', '../../../theme/payments.scss'],
})
export class ExchangeratePage implements OnInit {

  loading;
  rates;
  exchangeRateSubscription;

  constructor(
    public modalController: ModalController,
    public sharedData: SharedData,
    private navCtrl: NavController,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    private alertSrvc: AlertService,
  ) {
    this.getExchangeRate();
  }

  ngOnInit() {  }

  goBack() {
    this.navCtrl.back();
  }

  ionViewWillLeave() {
    this.exchangeRateSubscription && this.exchangeRateSubscription.unsubscribe();
  }

  getExchangeRate() {
    this.loading = true;
    this.exchangeRateSubscription = this.billsPaymentsService.ExchangeRate()
    .subscribe(
      (res: any) => {
        this.loading = false;
        if(res && res.code === '00' && res.data && res.data.length > 0) {
          this.rates = res.data
        } else if (res.code !== '00') {
          this.alertSrvc.showErrorToast(res.message);
          this.navCtrl.back();
        } else {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.navCtrl.back();
        }
        console.log(res)
      },
      err => {
        this.loading = false;
        console.log(err)
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        this.navCtrl.back();
      }
    )
  }

}
