import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/user/profile.service';
import { UserService } from '../../../services/user/user.service';
import { LoaderService } from '../../../services/utilities/loader.service';
import { AlertService } from '../../../services/utilities/alert.service';
import { InvestmentService } from '../../../services/investment/investment.service';
import { TransactionPinComponent } from '../../../components/transaction-pin/transaction-pin.component';
import { TransactionPinService } from '../../../services/security/transaction-pin.service';
import { PasswordPinService } from 'src/app/services/security/password-pin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/models/superApp/IUser';

@Component({
  selector: 'app-fixed-deposit',
  templateUrl: './fixed-deposit.page.html',
  styleUrls: ['./fixed-deposit.page.scss'],
})
export class FixedDepositPage implements OnInit {

  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  slideTwoForm = new FormGroup({
    amount: new FormControl('', [Validators.required, Validators.min(100000)])
  });

  selectedAccount;
  selectedTenor;
  depositRate;
  tenors = [];

  postData = {
    customerAcct: '',
    rate: 0,
    transAmount: 0,
    tenorDays: 0,
    phoneNumber: '',
    transactionPin: ''
  };

  getRateData = {
    amount: 0,
    tenorDays: 0
  };

  userPhone;
  finacleNumber;

  accounts = [];
  fdCalculatorData: any;
  profileData: IUser;
  isStaffValidated: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userSrvc: UserService,
    public profileService: ProfileService,
    private investSrvc: InvestmentService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private modalCtrl: ModalController,
    private transactionPinSrvc: TransactionPinService,
    private passwordPinSrvc: PasswordPinService
  ) { }

  ngOnInit() {
    this.profileService.userProfileData.subscribe((res: IUser) => {
      this.profileData = res;
      this.isStaffValidated = res.isFidelityCustomerValidated;
      this.finacleNumber = res.finaclePhoneNumber;
      this.userPhone = res.phoneNumber;
    });

    this.formatFinacleNumber();

    this.route.queryParams.subscribe(params => {

      if ( this.router.getCurrentNavigation().extras.state) {
        this.fdCalculatorData =  this.router.getCurrentNavigation().extras.state.pageExtras;
        this.slideTwoForm.controls.amount.setValue(this.fdCalculatorData.amount);
      }
      console.log('params: ', this.fdCalculatorData);
    });
  }

  ionViewWillEnter() {
    this.userSrvc.getAllAccounts(this.finacleNumber).subscribe(res => {
      this.accounts = res;
    });
  }

  formatFinacleNumber() {
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

  onSelectSource(account) {
    this.selectedAccount = account;
    console.log(this.selectedAccount);
    this.slides.slideNext();
  }

  slideToTenor() {
    this.slides.slideNext();
    this.getAllTenors();
  }

  getAllTenors() {
    this.investSrvc.getAllTenors().subscribe(res => this.tenors = res);
  }

  setTenor(days) {
    this.selectedTenor = days;
    console.log(this.selectedTenor);
    this.slides.slideNext();
    this.getRateForTenor();
  }

  getRateForTenor() {
    this.getRateData.amount = this.slideTwoForm.get('amount').value;
    this.getRateData.tenorDays = this.selectedTenor;
    console.log(this.getRateData);
    this.investSrvc.getRateByTenor(this.getRateData).subscribe(res => {
      console.log(res);
      this.depositRate = res.deposit_rate;
    });
  }

  createFD() {
    this.postData.customerAcct = this.selectedAccount.foracid;
    this.postData.phoneNumber = this.finacleNumber;
    this.postData.rate = this.depositRate;
    this.postData.tenorDays = parseInt(this.selectedTenor, 10);
    this.postData.transAmount = this.slideTwoForm.get('amount').value;
    console.log(this.postData);
    this.loaderSrvc.showLoader();
    this.investSrvc.createFD(this.postData).subscribe(res => {
      this.loaderSrvc.hideLoader();
      if (res.errorCode === '00') {
        this.alertSrvc.displaySuccessModal('Creation Successful', 'investments/landing');
      } else if (res.response === '434') {
        this.alertSrvc.showErrorToastDown('Invalid Transaction Pin');
      } else if (res.response === '99') {
        this.alertSrvc.showErrorToastDown('Creation Unsuccessful, please try again later');
      } else {
        this.alertSrvc.showErrorToast(res.errorMsg);
      }
    });
  }

  checkPinStatus() {
    this.loaderSrvc.showLoader();
    this.transactionPinSrvc.checkTranPinStatus().subscribe(res => {
      this.loaderSrvc.hideLoader();
      const resultCode = res.resultCode;
      const status = res.status;
      if ( resultCode === '402' && status === false) {
        this.passwordPinSrvc.displaySetupPINModal(null);
      } else if ( resultCode === '200') {
        this.displayPinModal();
      } else {
        this.alertSrvc.showErrorToast(res.message);
      }
    });
  }

  async displayPinModal() {
    const modal = await this.modalCtrl.create({
      component: TransactionPinComponent,
      backdropDismiss: false,
      cssClass: 'tranPinModal',
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data.dismissed) {
          console.log('dismissed');
          return;
        } else if (data) {
          console.log(data);
          const pin = data.data; //
          this.postData.transactionPin = pin;
          // console.log(this.postData);
          this.createFD();
          // console.log(this.postData);
        }
    });

    return await modal.present();
  }

}
