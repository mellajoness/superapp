import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonSlides, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/user/profile.service';
import { TransactionPinComponent } from '../transaction-pin/transaction-pin.component';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';

@Component({
  selector: 'app-liquidate-goal',
  templateUrl: './liquidate-goal.component.html',
  styleUrls: ['./liquidate-goal.component.scss'],
})
export class LiquidateGoalComponent implements OnInit {

  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  userPhone;
  goalId;
  maxWithdrawal;
  formOne: FormGroup;

  planData;

  postData = {
    phoneNumber : '',
    amount: '',
    goalsAccountId: '',
    transactionPIN: '',
    transPinWallet: '',
    channelToWithdrawTo: ''
  };

  constructor(
    private modalCtrl: ModalController,
    private profileService: ProfileService,
    private alertSrvc: AlertService,
    private savingsSrvc: SavingsService,
    private navParams: NavParams,
    private loaderSrvc: LoaderService
  ) {
    this.planData = navParams.data;
    this.goalId = this.planData.goalId;
    console.log(navParams.data);
   }

  ngOnInit() {
    this.userPhone = this.profileService.getUserPhone();

    if (this.goalId) {
      this.savingsSrvc.getMaxWithdrawalOnGoal(this.goalId).subscribe((res) => {
        console.log(res);
        this.maxWithdrawal = res;
      });
    }

    this.formOne = new FormGroup({
      amount: new FormControl('', [Validators.required,  Validators.min(500),  Validators.max(this.maxWithdrawal)])
    });
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  async proceedToPin() {
    this.dismiss();
    const modal = await this.modalCtrl.create({
      component: TransactionPinComponent,
      backdropDismiss: false,
      showBackdrop: true,
      cssClass: 'pin-test-modal',
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data.dismissed) {
          console.log('dismissed');
          return;
        } else if (data) {
          console.log(data);
          const pin = data.data; //
          this.postData.transactionPIN = pin;
          // console.log(this.postData);
          this.closeGoalAccount();
          // console.log(this.postData);
        }
    });
    return await modal.present();
  }

  closeGoalAccount() {
    this.postData.amount = this.formOne.get('amount').value;
    this.postData.goalsAccountId = this.planData.goalId;
    this.postData.phoneNumber = this.userPhone;
    // console.log(this.postData);
    this.loaderSrvc.showLoader();
    this.savingsSrvc.withdrawGoalAccount(this.postData).subscribe(res =>  {
      this.loaderSrvc.hideLoader();
      if (res.resultCode === '200') {
        this.alertSrvc.displaySuccessModal(`Withdrawal of ₦ ${this.postData.amount} was successful`, 'investments/landing');
      } else {
        this.alertSrvc.showErrorToast(res.message);
      }
      console.log(res);
    }, err => {
      this.loaderSrvc.hideLoader();
    });
  }

}
