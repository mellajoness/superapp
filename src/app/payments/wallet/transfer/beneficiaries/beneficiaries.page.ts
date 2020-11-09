import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { EventsService } from 'src/app/services/events/events.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';

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
    public events: EventsService,
    private alertSrvc: AlertService,
    private walletService: WalletService
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter() {

    this.beneficiaries = this.sharedData.walletBeneficiaries;
    this.savedBeneficiary = this.beneficiaries;
    console.log(this.savedBeneficiary)

    this.currEvent = this.events.observeModal.subscribe(res => {
      if (res === 'yes') {
        this.doDelete(this.deleteBene);
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
    let name = beneficiary.beneficiary_name;
    beneficiary['name'] = name;
    this.sharedData.walletBeneficiary = beneficiary;
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
      return ben.beneficiary_account_number && ben.beneficiary_account_number.toLowerCase().indexOf(val.toLowerCase()) > -1
          || ben.beneficiary_name && ben.beneficiary_name.toLowerCase().indexOf(val.toLowerCase()) > -1
    });
  }

  doDelete(payLoad) {
    const data = {
      wallet_id: this.sharedData.userProfile.walletAcctNumber,
      beneficiary_name: payLoad.beneficiary_name,
      beneficiary_account_number: payLoad.beneficiary_account_number,
      bank_code: payLoad.bank_code,
      bank_name: payLoad.bank_name
    }
    console.log(data);
    this.walletService.DeleteBeneficiaries(data)
    .subscribe(
      (res: any) => {
        if (res && res.responseCode === '00' && res.data) {
          this.beneficiaries.splice(this.beneficiaries.indexOf(this.deleteBene), 1);
          this.sharedData.walletBeneficiaries = this.beneficiaries;
          this.alertSrvc.showSuccessToast(res.message || this.handlers.responseMsgs().deleteBene)
        } else if (res && res.responseCode !== '00' && res.responseMessage) {
          this.alertSrvc.showErrorToast(res.responseMessage);
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
