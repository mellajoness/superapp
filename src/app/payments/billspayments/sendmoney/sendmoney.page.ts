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
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.page.html',
  styleUrls: ['./sendmoney.page.scss', '../../../../theme/payments.scss'],
})
export class SendmoneyPage implements OnInit {

  beneficiaries;
  customerPhone;
  deleteBene;
  deleteBeneficiarySub;
  loading;

  constructor(
    public modalController: ModalController,
    public sharedData: SharedData,
    private router: Router,
    private navCtrl: NavController,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    private alertSrvc: AlertService
  ) { }

  ngOnInit() {}

  goBack() {
    this.navCtrl.back();
  }

  go(route) {
    this.navCtrl.navigateForward(route);
  }

}
