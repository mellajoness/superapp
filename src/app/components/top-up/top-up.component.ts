import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController, NavParams } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TransactionPinService } from '../../services/security/transaction-pin.service';
import { TransactionPinComponent } from '../transaction-pin/transaction-pin.component';
import { ProfileService } from '../../services/user/profile.service';
import { LoaderService } from '../../services/utilities/loader.service';
import { AlertService } from '../../services/utilities/alert.service';
import { UserService } from '../../services/user/user.service';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { CurrencyPipe } from '@angular/common';
import { IUser } from 'src/app/models/superApp/IUser';
import { Handlers } from 'src/app/shared/handlers';
import { CustomalertComponent } from '../customalert/customalert.component';

@Component({
  selector: 'app-top-up',
  templateUrl: './top-up.component.html',
  styleUrls: ['./top-up.component.scss'],
})
export class TopUpComponent implements OnInit {

  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  userPhone;
  finacleNumber;
  profileData: IUser;

  selectedAccount;
  selectedAccountName;
  selectedCard;

  noAccountMessage;
  isCustomerValidated;

  wallet;

  postData = {
    paymentChannel: '',
    accountInfo: {
      accountFullName: '',
      accountNumber: '',
      accountForClosure: '',
      bankName: '',
      bankCode: ''
    },
    phoneNumber: '',
    amount: 0,
    goalsGroupsAccountId: 0,
    transactionPIN: '',
    savingsType: ''
  };

  goalSavingBoundaries;

  slideOneForm: FormGroup;

  // Slide Two Variables
  paymentMode;
  selectedPaymentMode;

  // Slide 2.5 variables
  accounts = [];

  planData;
  noWalletIdMsg: string;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    public handlers: Handlers,
    public modalCtrlr: ModalController,
    public profileService: ProfileService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private userSrvc: UserService,
    private savingsSrvc: SavingsService
  ) {
    this.planData = navParams.data;
    // console.log(this.planData);
   }

  ngOnInit() {
    this.userPhone = this.profileService.getUserPhone();
    this.profileService.userProfileData.subscribe((res: IUser) => {
      this.profileData = res;
      this.finacleNumber = res.finaclePhoneNumber;
      this.userPhone = res.phoneNumber;
      this.isCustomerValidated = res.isFidelityCustomerValidated;
    });
    this.getBoundaries();
    this.setFrequencyAmount();
    this.formatFinacleNumber();
  }


  formatFinacleNumber( ) {
    let phone: string = this.finacleNumber;
    if (phone) {
      if (phone.startsWith('+234')) {
        phone = `0${phone.slice(4)}`;
      } else if (phone.startsWith('234')) {
        phone = `0${phone.slice(3)}`;
      }
      return this.finacleNumber = phone;
    }
  }

  getBoundaries() {
    this.savingsSrvc.currentTSBoundariesObs.subscribe(res => {
      console.log(res.goalSavingBoundaries);
      this.goalSavingBoundaries = res.goalSavingBoundaries;
    });
  }

  setFrequencyAmount() {
    if (this.planData.isGoalAccountFunded && this.goalSavingBoundaries) {
      this.slideOneForm = new FormGroup({
        amount: new FormControl('', [Validators.required, Validators.min(this.goalSavingBoundaries.minimumFrequencyAmount)])
      });
    } else {
      this.slideOneForm = new FormGroup({
        amount: new FormControl('', [Validators.required, Validators.min(this.goalSavingBoundaries.minimumFrequencyAmount)])
      });
    }
  }

  checkStatusFunded(){
    const checkParameter = this.slideOneForm.get('amount').value;
    const minFrequency = this.goalSavingBoundaries.minimumFrequencyAmount;
    console.log(checkParameter)
    if (
      checkParameter &&
      checkParameter < minFrequency ||
      checkParameter === '') {
        this.alertSrvc.showErrorToastDown(
          `Value entered must NOT be less than ₦ ${this.goalSavingBoundaries.minimumFrequencyAmount}`
          );
      }
  }

  checkStatusNotFunded(){
    const checkParameter = this.slideOneForm.get('amount').value;
    const minFrequency = this.goalSavingBoundaries.minimumFrequencyAmount;
    console.log(checkParameter);
    if (
      checkParameter &&
      checkParameter < minFrequency ||
      checkParameter === '') {
        this.alertSrvc.showErrorToastDown(
          `Value entered must NOT be less than ₦ ${this.planData.frequencyAmount}`
          );
      }
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      dismissed: true
    });
  }

  slideToNext(slides) {
    // console.log('Hello');
    slides.slideNext();
  }

  slideToNextGetAccount(slides) {
    // console.log('Hello');
    this.userSrvc.getAllPayment().subscribe(res => {
      console.log(res);
      this.paymentMode = res;
    });
    slides.slideNext();
  }

  setPaymentMode(mode, slides) {
    this.selectedPaymentMode = mode;
    slides.slideNext();
    this.setPaymentType();
  }

  setPaymentType() {
    switch (this.selectedPaymentMode) {
      case 'ACCOUNT':
        if (this.isCustomerValidated){
          this.getAllAccounts();
         } else {
          this.handlers.validateFidelityCustomer(CustomalertComponent);
         }
        break;
      case 'CARD':
        this.selectedPaymentMode = 0;
        break;
      case 'WALLET':
        this.wallet = this.profileService.getUserProfileData().walletAcctNumber;
        if (this.wallet === ''){
          this.noWalletIdMsg = 'You do not have a Wallet, please create one';
        }
        break;
      default:
        this.selectedPaymentMode = 0;
    }
  }

  presentPin() {
    // this.transactionPinSrvc.displayPinModal(this.planData);
    this.displayPinModal(this.planData);
  }

  getAllAccounts(){
    this.userSrvc.getAllAccounts(this.finacleNumber).subscribe(res => {
      if (res !== [] || null) {
        this.accounts = res;
      } else if (res === []) {
        this.noAccountMessage = 'No accounts found for this user';
      }
  });
  }


  async displayPinModal(componentProps) {
    const modal = await this.modalCtrlr.create({
      component: TransactionPinComponent,
      backdropDismiss: false,
      cssClass: 'tranPinModal',
      componentProps
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
          this.fund();
          // console.log(this.postData);
        }
    });

    return await modal.present();
  }

  onSelectSource(account) {
    console.log(account.foracid);
    this.selectedAccount = account.foracid;
    this.selectedAccountName = account.accT_NAME;
    this.slideToNext(this.slides);
  }

  onSelectWallet() {
    this.selectedPaymentMode = 'WALLET';
    this.selectedAccount = 'null';
    this.selectedAccountName = 'null';
    this.slideToNext(this.slides);
  }

  fund() {
    if (this.planData.savingsType === 'GROUPCHALLENGE') {
     this.fundGroupAccount();
    } else if (this.planData.savingsType === 'GOALS') {
      this.fundGoalAccount();
    }
  }

  fundGoalAccount() {
    this.loaderSrvc.showLoader();
    this.postData.paymentChannel = this.selectedPaymentMode;
    this.postData.accountInfo.accountNumber = this.selectedAccount;
    this.postData.accountInfo.accountFullName = this.selectedAccountName;
    this.postData.accountInfo.accountForClosure = 'null';
    this.postData.accountInfo.bankCode = 'null';
    this.postData.accountInfo.bankName = 'null';
    this.postData.phoneNumber = this.userPhone;
    this.postData.amount = this.slideOneForm.get('amount').value;
    this.postData.goalsGroupsAccountId = this.planData.goalId;
    this.postData.savingsType = this.planData.savingsType;
    this.savingsSrvc.fundGoalAccount(this.postData).subscribe(res => {
      if (res) {
        this.loaderSrvc.hideLoader();
        console.log(res);
        if (res.resultCode === '-200') {
          this.alertSrvc.showErrorToast('Incorrect Transaction Pin');
       } else if (res.resultCode === '200') {
          this.modalCtrl.dismiss();
          this.alertSrvc.displaySuccessModal('Success!!', 'investments/landing');
       } else if (res.resultCode === '450') {
          this.alertSrvc.showErrorToast('Please update your BVN for this transaction');
       } else if (res.resultCode === '444') {
          this.alertSrvc.showErrorToast('Insufficient funds to carry out this transaction');
       } else if (res.resultCode === '304' && res.message === 'Insufficient funds in account to fund target goal.') {
          this.alertSrvc.showErrorToast('Insufficient funds, please select another source');
       } else {
          this.alertSrvc.showErrorToast(res.message);
       }
      }
    }, error => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Oops! Something went wrong, try again later');
    });
  }

  fundGroupAccount() {
    this.loaderSrvc.showLoader();
    this.postData.paymentChannel = this.selectedPaymentMode;
    this.postData.accountInfo.accountNumber = this.selectedAccount;
    this.postData.accountInfo.accountFullName = this.selectedAccountName;
    this.postData.accountInfo.accountForClosure = 'null';
    this.postData.accountInfo.bankCode = 'null';
    this.postData.accountInfo.bankName = 'null';
    this.postData.phoneNumber = this.userPhone;
    this.postData.amount = this.slideOneForm.get('amount').value;
    this.postData.goalsGroupsAccountId = this.planData.goalId;
    this.postData.savingsType = this.planData.savingsType;
    this.savingsSrvc.fundGroupAccount(this.postData).subscribe(res => {
      if (res) {
        this.loaderSrvc.hideLoader();
        console.log(res);
        if (res.resultCode === '-200') {
          this.alertSrvc.showErrorToast('Incorrect Transaction Pin');
       } else if (res.resultCode === '200') {
          this.modalCtrl.dismiss();
          this.alertSrvc.displaySuccessModal('Success!!', 'investments/landing');
       } else if (res.resultCode === '450') {
          this.alertSrvc.showErrorToast('Please update your BVN for this transaction');
       } else if (res.resultCode === '444') {
          this.alertSrvc.showErrorToast('Insufficient funds to carry out this transaction');
       } else if (res.resultCode === '304' && res.message === 'Insufficient funds in account to fund target goal.') {
          this.alertSrvc.showErrorToast('Insufficient funds, please select another source');
       } else {
          this.alertSrvc.showErrorToast(res.message);
       }
      }
    }, error => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Oops! Something went wrong, try again later');
    });
  }

  titleCase(name) {
    if(name) {
      let name_ = name[0].toUpperCase() + name.substring(1)
      return name_
    } else {
      return name
    }
  }

}
