import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BillspaymentshandlerService } from 'src/app/services/billspaymentshandler/billspaymentshandler.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';

@Component({
  selector: 'app-billsmodal',
  templateUrl: './billsmodal.component.html',
  styleUrls: ['./billsmodal.component.scss', '../../../theme/payments.scss'],
})
export class BillsmodalComponent implements OnInit {

  airtimeData;

  constructor(
    public sharedData: SharedData,
    public handlers: Handlers,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  pay(mode, service) {
    this.sharedData.billsPaymentsMode = mode;
    this.sharedData.billsPaymentsService = service;
    if(mode === 'betting') {
      this.navCtrl.navigateForward('/payments/billspayments/betting');
    } else {
      this.navCtrl.navigateForward('/payments/billspayments/forms');
    }
    this.handlers.hide();
  }

}
