import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { BillspaymentshandlerService } from 'src/app/services/billspaymentshandler/billspaymentshandler.service';
import { FormGroup } from '@angular/forms';
import { FormValidations } from 'src/app/shared/formsDirectives';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Handlers } from 'src/app/shared/handlers';
import { EventsService } from 'src/app/services/events/events.service';

@Component({
  selector: 'app-betting',
  templateUrl: './betting.page.html',
  styleUrls: ['./betting.page.scss'],
})
export class BettingPage implements OnInit {

  customerName;
  customerEmail;
  customerPhone;

  quickTellerBillers;
  bettingAsBill;
  bettingOffers;
  bettingBiller;
  bettingOfferObj;
  currEvent;

  doSaveBeneficiary;
  beneficiaryAlias;
  selectedBeneficiary;
  beneficiaries;
  newBeneficiaryChange;

  amount;

  selectedBill;
  billPlans;
  userDetails;
  selectedBillOffer;
  uniqueID;
  billerID;
  billerObj;
  convenienceFee;

  busy;
  busy_;
  getQuicktellersBillerSubscription;
  getQuicktellersBillerInCategorySubscription;

  constructor(
    public sharedData: SharedData,
    private router: Router,
    private navCtrl: NavController,
    private billsPaymentHandlersService: BillspaymentshandlerService,
    private alertSrvc: AlertService,
    private billsPaymentsService: BillspaymentsService,
    public handlers: Handlers,
    public events: EventsService,
  ) {

    this.billPlans = this.sharedData.billsPaymentsMode === this.handlers.variables().airtime || 
      this.sharedData.billsPaymentsMode === this.handlers.variables().electricity ||
      this.sharedData.billsPaymentsMode === this.handlers.variables().boropower ?
      [{ planName: 'Prepaid', value: "1" }, { planName: 'Postpaid', value: "2" }] : null;

  }

  ngOnInit() {
    this.customerName = this.sharedData.userProfile.firstName + " " + this.sharedData.userProfile.lastName;
    this.customerEmail = this.sharedData.userProfile.emailAddress;
    this.customerPhone = this.sharedData.userProfile.phoneNumber;
  }
  
  ionViewWillEnter() {
    if (this.sharedData.previousRoute === '/payments' || this.sharedData.previousRoute === '/payments/billspayments'  || this.sharedData.previousRoute === '/payments/billspayments/utilities' ) {
      this.init();
    }
    this.getEvent();
  }
 
  ionViewWillLeave() {
    this.sharedData.previousRoute = this.router.url;
    this.currEvent.unsubscribe();
    this.getQuicktellersBillerSubscription && this.getQuicktellersBillerSubscription.unsubscribe();
    this.getQuicktellersBillerInCategorySubscription && this.getQuicktellersBillerInCategorySubscription.unsubscribe();
  }

  goBack() {
    this.navCtrl.back();
  }

  getEvent() {
    this.currEvent = this.events.observeModal_.subscribe(res => {
      if (res === 'yes') {
        this.resetForm();
      } else {}
    });
  }

  getBeneficiaries(id) {
    const data = { userId: this.customerPhone, channelId: "trupay", billerId: id, userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID}
    console.log(data);
    this.billsPaymentsService.GetBeneficiaries(data)
      .subscribe(
        (res: any) => {
          if (res && res.code === '00' && res.data) {
            this.beneficiaries = res.data
          } 
          console.log(res);
        },
        err => {
          console.log(err);
        }
      )
  }

  //I DONT'T NEED THIS FOR NOW
  getQuicktellersBiller() {
    const data = { isBorrowService: true, userId: this.customerPhone, channelId: "trupay" }
    this.getQuicktellersBillerSubscription = this.billsPaymentsService.GetQuicktellersBiller(data)
    .subscribe(
      (res: any) => {
        console.log(res)
        if(res && res.code === '00' && res.data) {
          this.quickTellerBillers = res.data;
          this.getQuicktellersBillerInCategory();
        } else if (res && res.code !== '00' && res.message) {
          this.navCtrl.back();
          this.alertSrvc.showErrorToast(res.message);
        } else {
          this.navCtrl.back();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      },
      err => {
        this.navCtrl.back();
        console.log(err);
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
      }
    )
  }

  getQuicktellersBillerInCategory() {
    const data = { categoryId: "C", subCategoryId: "", isBorrowService: true, userId: this.customerPhone, channelId: "trupay" }
    this.getQuicktellersBillerInCategorySubscription = this.billsPaymentsService.GetQuicktellersBillerInCategory(data)
    .subscribe(
      (res: any) => {
        console.log(res)
        if(res && res.code === '00' && res.data) {
          this.bettingAsBill = res.data;
          this.bettingBiller = this.billsPaymentHandlersService.getBettingData(this.bettingAsBill, this.sharedData.billsPaymentsService);

          this.getBeneficiaries(this.bettingBiller.billerId);
          this.getBettingsOffer(this.bettingBiller.billerId);

        } else if (res && res.code !== '00' && res.message) {
          this.navCtrl.back();
          this.alertSrvc.showErrorToast(res.message);
        } else {
          this.navCtrl.back();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      },
      err => {
        console.log(err)
        this.navCtrl.back();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
      }
    )
  }

  getBettingsOffer(id) {
    this.busy = this.handlers.busy();
    const data = { billerId: id, userId: this.customerPhone, channelId: "trupay" }
    this.billsPaymentsService.GetQuicktellersBettingOffers(data)
    .subscribe(
      (res: any) => {
        console.log(res)
        this.busy = !this.handlers.busy();
        if(res && res.code === '00' && res.data) {
          this.bettingOffers = res.data;
          console.log(this.selectedBeneficiary);
          console.log(this.newBeneficiaryChange);
        } else if (res && res.code !== '00' && res.message) {
          this.alertSrvc.showErrorToast(res.message);
          this.bettingOffers = [];
        } else {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.bettingOffers = [];
        }
      },
      err => {
        console.log(err)
        this.busy = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        this.bettingOffers = [];
      }
    )
  }

  validatePayment() {
    this.busy_ = this.handlers.busy();
    const data = { subscriberId: (!this.beneficiaries && this.uniqueID) || (this.newBeneficiaryChange && this.uniqueID) ? this.uniqueID : this.selectedBeneficiary, paymentCode: this.bettingOfferObj.paymentCode, userId: this.customerPhone, channelId: "trupay" }
    this.billsPaymentsService.ValidateQuicktellersBettingSubscriber(data)
    .subscribe(
      (res: any) => {
        console.log(res)
        this.busy_ = !this.handlers.busy();
        if(res && res.code === '00' && res.data) {
          this.userDetails = res.data;
          console.log(Array.isArray(this.userDetails.customers))
          this.userDetails = Array.isArray(this.userDetails.customers) ? this.userDetails.customers[0] : this.userDetails.customers;
        } else if (res && res.code !== '00' && res.message) {
          this.alertSrvc.showErrorToast(res.message);
        } else {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      },
      err => {
        console.log(err)
        this.busy_ = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
      }
    )
  }

  billSelected(bettingAsBill) {
    console.log(bettingAsBill)
    this.alertSrvc.displayBettingModal(bettingAsBill, null)
  }

  billOfferSelected() {
    this.bettingOfferObj = this.billsPaymentHandlersService.getBettingOfferObj(this.bettingOffers.paymentitems, this.selectedBillOffer);
    this.userDetails = null;
    this.convenienceFee = this.bettingOfferObj.itemFee;
    if(this.bettingOfferObj.amount === '0') {
      this.amount = '';
    } else {
      this.amount = this.bettingOfferObj.amount;
    }
  }

  uniqueIdChange() {
    this.userDetails = null;
  }
  amountChange() {
    this.userDetails = null;
    console.log(this.amount);
  }
  saveBeneficiary() {console.log(this.doSaveBeneficiary);}
  beneficiaryAliasChange() {}
  beneficiarySelected() {console.log(this.selectedBeneficiary);}

  newBeneficiary() {
    if (this.newBeneficiaryChange) {
      this.selectedBeneficiary = null;
    } else if (!this.newBeneficiaryChange) {
      this.uniqueID = null;
    }

    this.resetUniqueID();
  }

  // handle beneficiaries
  storeBeneficiary() {
    if (this.doSaveBeneficiary && this.beneficiaryAlias) {
      this.sharedData.paymentObj['saveBeneficiary'] = this.doSaveBeneficiary;
      this.sharedData.paymentObj['beneficiaryAlias'] = this.beneficiaryAlias;
    }
  }

  // setting up data to be displayed on the pin/validation page.
  setDisplayInfo() {
    this.sharedData.paymentInfo = {
      amount: this.amount,
      paymentId: this.uniqueID,
      paymentBody: this.userDetails.fullName,
      convenienceFee: this.convenienceFee
    }
  }
  // <--- ALL CHANGE EVENTS ENDS --->

  // <--- PAYMENTS OBJ BEGINS --->
  bettingPayment() {
    this.sharedData.paymentObj = {
      customerId: (!this.beneficiaries && this.uniqueID) || (this.newBeneficiaryChange && this.uniqueID) ? this.uniqueID : this.selectedBeneficiary,
      customerName: this.userDetails.fullName,
      customerMobile: this.customerPhone,
      billerId: this.bettingBiller.billerId,
      paymentCode: this.userDetails.paymentCode,
      userId: this.customerPhone,
      channel: "trupay",
      paymentSourceId: null,
      pin: null,
      paymentMethod: null,
      amount: this.amount,
      convenienceFee: this.convenienceFee,
      hash: null,
      emailForNotification: this.customerEmail,
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID
    };
    this.storeBeneficiary();

    // setting up data to be displayed on the pin/validation page.
    this.setDisplayInfo();

    if (!this.amount) {
      this.alertSrvc.showErrorToast('Amount is required');
      return;
    } else {
      this.navCtrl.navigateForward('/payments/payment');
    }
  }
  // <--- PAYMENTS OBJ ENDS --->

  // <--- MAKE PAYMENT BEGINS --->
  makePayment() {
    this.bettingPayment();
    console.log(this.sharedData.paymentObj)
  }
  // <--- MAKE PAYMENT ENDS --->

  // <--- INITIALIZE FORM PAGE BEGINS --->
  init() {
    // this.getQuicktellersBiller();
    this.getQuicktellersBillerInCategory();
  }
  // <--- INITIALIZE FORM PAGE ENDS --->

  // <--- RESET FORM BEGINS --->
  resetForm() {
    this.bettingBiller = this.sharedData.bettingBiller;
    this.userDetails = null;
    this.selectedBillOffer = null;
    this.uniqueID = null;
    this.amount = null;
    this.beneficiaries = null;
    this.doSaveBeneficiary = false,
    this.beneficiaryAlias = null;
    this.getBeneficiaries(this.bettingBiller.billerId);
    this.getBettingsOffer(this.bettingBiller.billerId);
  }
  // <--- RESET FORM ENDS --->

  // <--- RESET UNIQUE ID BEGINS --->
  resetUniqueID() {
    this.userDetails = null,
    this.uniqueID = null,
    this.amount = null,
    this.doSaveBeneficiary = false,
    this.beneficiaryAlias = null;
    // <--- RESET UNIQUE ID ENDS --->
  }

}
