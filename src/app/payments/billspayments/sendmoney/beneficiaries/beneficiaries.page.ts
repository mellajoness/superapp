import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { EventsService } from 'src/app/services/events/events.service';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.page.html',
  styleUrls: ['./beneficiaries.page.scss', '../../../../../theme/payments.scss'],
})
export class BeneficiariesPage implements OnInit {

  pageReady;
  searchContact;
  currEvent;
  beneficiaries;
  savedBeneficiary;
  returnedBeneficiaries;
  deleteBene;

  constructor(
    private router: Router,
    private navCtrl: NavController,
    public sharedData: SharedData,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    public events: EventsService,
    private alertSrvc: AlertService,
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter() {

    this.beneficiaries = this.sharedData.transferBeneficiaries;
    this.savedBeneficiary = this.beneficiaries;

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

  go(beneficiary) {
    let name = beneficiary.beneficiaryName + " - " + beneficiary.benBankName;
    beneficiary['name'] = name;
    this.sharedData.beneficiary = beneficiary;
    this.goBack();
  }

  // re-initializing beneficiaries
  recallBeneficiaries(){
    this.returnedBeneficiaries = this.savedBeneficiary;
  }

  // Filter beneficiary for input fields
  onSearchContact(ev: any) {
    // Call to re-initialize beneficiaries
    this.recallBeneficiaries();

    let val = ev.target.value;

    this.beneficiaries = this.returnedBeneficiaries.filter((ben) => {
      return ben.beneficiaryName && ben.beneficiaryName.toLowerCase().indexOf(val.toLowerCase()) > -1
          || ben.beneficiaryAccountNo && ben.beneficiaryAccountNo.toLowerCase().indexOf(val.toLowerCase()) > -1
          || ben.benBankName && ben.benBankName.toLowerCase().indexOf(val.toLowerCase()) > -1;
    });
  }

  doDelete() {
    const data = { userId: this.sharedData.userProfile.phoneNumber, channel: "trupay", beneficiaryAcctNo: this.deleteBene.beneficiaryAccountNo }
    this.billsPaymentsService.DeleteTransferBeneficiaries(data)
    .subscribe(
      (res: any) => {
        if (res && res.code === '00' && res.data) {
          this.beneficiaries.splice(this.beneficiaries.indexOf(this.deleteBene), 1);
          this.sharedData.transferBeneficiaries = this.beneficiaries;
          this.alertSrvc.showSuccessToast(res.message || this.handlers.responseMsgs().deleteBene)
        } else if (res && res.code !== '00' && res.message) {
          this.alertSrvc.showErrorToast(res.message);
        } else {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
        
        console.log(res);
      },
      err => {
        console.log(err);
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
      }
    )
  }

  async deleteBeneficiary(beneficiary) {
    this.deleteBene = beneficiary;
    this.sharedData.customAlertView = 'beneficiary';
    this.handlers.showCustomAlertModal(CustomalertComponent);
  }

}
