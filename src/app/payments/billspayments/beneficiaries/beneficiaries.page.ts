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
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.page.html',
  styleUrls: ['./beneficiaries.page.scss', '../../../../theme/payments.scss'],
})
export class BeneficiariesPage implements OnInit {

  beneficiaries;
  customerPhone;
  deleteBene;
  deleteBeneficiarySub;
  loading;
  currEvent;

  constructor(
    public modalController: ModalController,
    public sharedData: SharedData,
    private router: Router,
    private navCtrl: NavController,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    private alertSrvc: AlertService,
    public events: EventsService
  ) {}

  ngOnInit() {
    this.customerPhone = this.sharedData.userProfile.phoneNumber;
    this.getBeneficiaries(this.customerPhone);
  }

  ionViewWillEnter() {
    this.currEvent = this.events.observeModal.subscribe(res => {
      if (res === 'yes') {
        this.doDelete();
      } else {}
    });
  }

  ionViewWillLeave() {
    this.currEvent.unsubscribe();
  }

  goBack() {
    this.navCtrl.back();
  }

  getBeneficiaries(customerPhone) {
    const data = { userId: customerPhone, channelId: "trupay", billerId: "", userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID }
    this.billsPaymentsService.GetBeneficiaries_(data)
      .subscribe(
        (res: any) => {
          this.loading = true;
          if (res && res.code === '00' && res.data) {
            this.beneficiaries = res.data;
            this.alertSrvc.showInfoToast(this.handlers.responseMsgs().swipeToDelete)
          } else if (res && res.code !== '00' && res.message) {
            this.alertSrvc.showErrorToast(res.message);
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }
        },
        err => {
          this.loading = true;
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      )
  }

  async deleteBeneficiary(beneficiary) {
    this.deleteBene = beneficiary;
    this.sharedData.customAlertView = 'beneficiary';
    this.handlers.showCustomAlertModal(CustomalertComponent);
  }

  doDelete() {
    const data = { userId: this.customerPhone, channelId: "trupay", beneficiaryId: this.deleteBene.beneficiaryId, userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID }
    this.deleteBeneficiarySub = this.billsPaymentsService.DeleteBeneficiary(data)
      .subscribe(
        (res: any) => {
          if (res && res.code === '00' && res.data) {
            this.beneficiaries.splice(this.beneficiaries.indexOf(this.deleteBene), 1);
            this.alertSrvc.showSuccessToast(res.message || this.handlers.responseMsgs().deleteBene)
          } else if (res && res.code !== '00' && res.message) {
            this.alertSrvc.showErrorToast(res.message);
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }
        },
        err => {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      )
  }

}
