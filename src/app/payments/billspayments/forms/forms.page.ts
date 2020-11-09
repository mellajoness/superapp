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

@Component({
  selector: 'app-forms',
  templateUrl: './forms.page.html',
  styleUrls: ['./forms.page.scss', '../../../../theme/payments.scss'],
})
export class FormsPage implements OnInit {

  billForm: FormGroup;
  customerName;
  customerEmail;
  customerPhone;

  doSaveBeneficiary;
  beneficiaryAlias;
  selectedBeneficiary;
  beneficiaries;
  newBeneficiaryChange;
  formHeader: String;

  airtimeData;
  utilitiesData;
  cableTvData;
  internetServicesData;
  amount;

  selectedBill;
  bills;
  billPlans;
  bundleBillPlans;
  userDetails;
  boroPoweruserDetails;
  selectedBillPlan;
  selectedBundleBillPlans
  uniqueID;
  accountType;
  billerID;
  billerObj;
  internetPlanObj;
  cableBouquetObj;
  billerNameAtFirstIndex;

  busy;
  getBillersByCategorySubscription;
  getInternetDataPlansSubscription;

  constructor(
    public sharedData: SharedData,
    private router: Router,
    private navCtrl: NavController,
    private billsPaymentHandlersService: BillspaymentshandlerService,
    private alertSrvc: AlertService,
    private billsPaymentsService: BillspaymentsService,
    public formValidations: FormValidations,
    public handlers: Handlers
  ) {

    this.billForm = this.formValidations.BillSubscription();

    this.billPlans = this.sharedData.billsPaymentsMode === this.handlers.variables().airtime || 
      this.sharedData.billsPaymentsMode === this.handlers.variables().electricity ||
      this.sharedData.billsPaymentsMode === this.handlers.variables().boropower ?
      [{ planName: 'Prepaid', value: "1" }, { planName: 'Postpaid', value: "2" }] : null;

    this.bundleBillPlans = this.sharedData.billsPaymentsMode === this.handlers.variables().internet ?
      [{ planName: 'Prepaid', value: "1" }, { planName: 'Postpaid', value: "2" }] : null;

  }

  ngOnInit() {
    this.customerName = this.sharedData.userProfile.firstName + " " + this.sharedData.userProfile.lastName;
    this.customerEmail = this.sharedData.userProfile.emailAddress;
    this.customerPhone = this.sharedData.userProfile.phoneNumber;
  }
  
  ionViewWillEnter() {
    this.getFormHeader();
    if (this.sharedData.previousRoute === '/payments' || this.sharedData.previousRoute === '/payments/billspayments'  || this.sharedData.previousRoute === '/payments/billspayments/utilities' ) {
      this.init();
    }
  }

  ionViewWillLeave() {
    this.sharedData.previousRoute = this.router.url;
    this.getBillersByCategorySubscription && this.getBillersByCategorySubscription.unsubscribe();
    this.getInternetDataPlansSubscription && this.getInternetDataPlansSubscription.unsubscribe();
  }

  goBack() {
    this.navCtrl.back();
  }

  getFormHeader() {
    this.formHeader = this.sharedData.paymentType === this.handlers.variables().airtime ? this.handlers.headers().airtime :
      this.sharedData.paymentType === this.handlers.variables().betting ? this.handlers.headers().betting :
      this.sharedData.paymentType === this.handlers.variables().internet ? this.handlers.headers().internet :
      this.sharedData.paymentType === this.handlers.variables().electricity ? this.handlers.headers().electricity :
      this.sharedData.paymentType === this.handlers.variables().water ? this.handlers.headers().water :
      this.sharedData.paymentType === this.handlers.variables().tollpayment ? this.handlers.headers().tollpayment :
      this.sharedData.paymentType === this.handlers.variables().waste ? this.handlers.headers().waste :
      this.sharedData.paymentType === this.handlers.variables().boropower ? this.handlers.headers().boropower :
      this.handlers.headers().cable;
  }

  // <--- REQUESTS BEGINS --->
  getBillersByCategory(category) {
    let data = {
      categoryId: category.categoryId,
      subCategoryId: "string",
      isBorrowService: false,
      userId: this.customerPhone,
      channelId: "truepay",
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID
    }

    if (this.sharedData.billsPaymentsMode === this.handlers.variables().electricity) {
      data['subCategoryId'] = this.sharedData.billsPaymentData[0].subCategory[0].subCategoryId
      console.log(data);
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().boropower) {
      data['subCategoryId'] = this.sharedData.billsPaymentData[0].subCategory[0].subCategoryId
      data['isBorrowService'] = true;
      console.log(data);
    }

    this.getBillersByCategorySubscription = this.billsPaymentsService.GetBillersByCategory(data)
      .subscribe(
        (res: any) => {
          
          if(res && res.code === '00' && res.data) {
            this.bills = res.data;
            this.selectedBill = this.billsPaymentHandlersService.insertSeletedBill(this.bills);
            this.billerObj = this.billsPaymentHandlersService.getBillerObj(this.bills, this.selectedBill);
            console.log("BILLER OBJECT");
            console.log(this.billerObj);
            if (this.sharedData.billsPaymentsMode === this.handlers.variables().boropower) {
              this.billerID = this.bills[0].billerId
              console.log("BILLER ID FOR BORROWPOWER");
              console.log(this.billerID);
            } else {
              this.billerID = this.billsPaymentHandlersService.getBillerID(this.bills, this.selectedBill);
              console.log("BILLER ID FOR OTHERS");
              console.log(this.billerID);
            }

            if (this.sharedData.billsPaymentsMode === this.handlers.variables().airtime || this.sharedData.billsPaymentsMode === this.handlers.variables().cable ||
              this.sharedData.billsPaymentsMode === this.handlers.variables().boropower || this.sharedData.billsPaymentsMode === this.handlers.variables().electricity
              ){
              this.getBeneficiaries();
            }

          } else if (res && res.code !== '00' && res.message) {
            this.navCtrl.back();
            this.alertSrvc.showErrorToast(res.message);
          } else {
            this.navCtrl.back();
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }

          if (this.selectedBill) {
            this.billerNameAtFirstIndex = this.billsPaymentHandlersService.getFirstIndex(this.selectedBill);
          }

          if (
            this.sharedData.billsPaymentsMode === this.handlers.variables().airtime ||
            this.sharedData.billsPaymentsMode === this.handlers.variables().electricity
            ) {
            this.selectedBillPlan = this.billPlans.length === 1 ? this.billPlans[0].planName : null;
          }
          
          if (this.sharedData.billsPaymentsMode === this.handlers.variables().internet) {
            this.getInternetDataPlans();
          }

          console.log(res)
        },
        err => {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.navCtrl.back();
          console.log(err);
        }
    )
  }

  getBeneficiaries() {
    const data = { userId: this.customerPhone, channelId: "trupay", billerId: this.billerID || this.sharedData.billsPaymentsService, userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID}
    console.log(data);
    this.billsPaymentsService.GetBeneficiaries_(data)
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

  getInternetDataPlans() {
    const data = { merchantFK: this.sharedData.billsPaymentsService || this.billerID, userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID }
    console.log(data);

    this.getInternetDataPlansSubscription = this.billsPaymentsService.GetInternetDataPlans(data)
      .subscribe(
        (res: any) => {
          console.log(res);

          if (res && res.code === '00' && res.data && res.data.bundleList) {
            this.billPlans = res.data.bundleList;
            this.getBeneficiaries();
          } else if (res && res.code !== '00' && res.message) {
            this.navCtrl.back()
            this.alertSrvc.showErrorToast(res.message);
          } else {
            this.navCtrl.back()
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }
          console.log(this.billPlans)
          this.sharedData.billsPaymentsService = null;
        },
        err => {
          this.navCtrl.back();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          console.log(err);
          this.sharedData.billsPaymentsService = null;
        }
      )
  }

  validateMeterNumber() {
    if ((this.selectedBeneficiary && this.selectedBeneficiary.length < 10) || (this.uniqueID && this.uniqueID.length < 10)) {
      this.alertSrvc.showErrorToast('Invalid Meter Number');
      return;
    }
    const data = {
      MeterNo: this.uniqueID || this.selectedBeneficiary,
      EnergyBillerId: this.billerID,
      accountType: this.accountType,
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID
    }

    this.busy = this.handlers.busy();
    this.billsPaymentsService.ValidateMeterNumber(data)
      .subscribe(
        (res: any) => {
          this.busy = !this.handlers.busy();
          console.log(res)
          if (res && res.code === '00' && res.data) {
            this.userDetails = res.data
          } else if (res && res.code !== '00' && res.data.respDescription) {
            this.alertSrvc.showErrorToast(res.data.respDescription);
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }
        },
        err => {
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          console.log(err);
        }
      )
  }

  validateBoroPowerUser() {

    if ((this.selectedBeneficiary && this.selectedBeneficiary.length < 10) || (this.uniqueID && this.uniqueID.length < 10)) {
      this.alertSrvc.showErrorToast('Invalid Meter Number');
      return;
    }

    const data = {
      MeterNo: this.uniqueID || this.selectedBeneficiary,
      accountType: this.accountType,
      EnergyBillerId: this.billerID,
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID
    }

    this.busy = this.handlers.busy();
    this.billsPaymentsService.CheckBoroPowerMeterEligibility(data)
      .subscribe(
        (res: any) => {
          if (res && res.code === '00' && res.data) {
            this.boroPoweruserDetails = res.data
            this.getBoroPowerMeterCustomerInfo(data);
          } else if (res && res.code !== '00' && res.message) {
            this.alertSrvc.showErrorToast(res.message);
            this.busy = !this.handlers.busy();
          } else {
            this.busy = !this.handlers.busy();
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }
          console.log(res)
        },
        err => {
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          console.log(err);
        }
      )
  }

  getBoroPowerMeterCustomerInfo(data) {
    this.billsPaymentsService.GetBoroPowerMeterCustomerInfo(data)
      .subscribe(
        (res: any) => {
          this.busy = !this.handlers.busy();

          if (res && res.code === '00' && res.data) {
            this.userDetails = res.data;
          } else if (res && res.code !== '00' && res.message) {
            this.alertSrvc.showErrorToast(res.message);
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }
          console.log(res)
        },
        err => {
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          console.log(err);
        }
      )
  }

  getSmartCardNumberPlans() {
    console.log(this.selectedBeneficiary)
    if ((this.selectedBeneficiary && this.selectedBeneficiary.length < 10) || (this.uniqueID && this.uniqueID.length < 10)) {
      this.alertSrvc.showErrorToast('Invalid Smart Card Number');
      return;
    }

    const data = { beneficiary: this.uniqueID || this.selectedBeneficiary, merchantFk: this.billerID, userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID }
    console.log(data);

    this.busy = this.handlers.busy();
    this.billsPaymentsService.GetSmartCardNumberPlans(data)
    .subscribe(
      (res: any) => {

        if (res && res.code === '00' && res.data && res.data.plans) {
          this.billPlans = res.data.plans;
          console.log(this.billPlans);

          this.billsPaymentsService.ValidateSmartCardNumber(data)
          .subscribe(
            (res: any) => {
              this.busy = !this.handlers.busy();
              
              if (res && res.code === '00' && res.data) {
                this.userDetails = res.data;
                console.log(this.userDetails)
              } else if (res && res.code !== '00' && res.data.respDescription) {
                this.userDetails = null;
                this.alertSrvc.showErrorToast(res.data.respDescription);
              } else {
                this.userDetails = null;
                this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
              }
              console.log(res)
            },
            err => {
              this.busy = !this.handlers.busy();
              this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
              console.log(err);
              this.userDetails = null;
            }
          )
        } else if (res && res.code !== '00' && res.message) {
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(res.message);
        } else {
          this.busy = !this.handlers.busy();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
        console.log(res)
      },
      err => {
        this.busy = !this.handlers.busy();
        this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        console.log(err);
      }
    )
  }
  // <--- REQUESTS ENDS --->

  
  // <--- ALL CHANGE EVENTS BEGINS --->
  billSelected() {
    // counter increments when you enter page
    // implemeted to fire change event without error
    console.log("FIRE CHANGE EVENT");
    console.log(this.selectedBill);
    this.billerID = this.billsPaymentHandlersService.getBillerID(this.bills, this.selectedBill);
    this.billerObj = this.billsPaymentHandlersService.getBillerObj(this.bills, this.selectedBill);
    console.log(this.billerObj);
    console.log(this.billerID);
    
    // reset forn when value changes;
    this.resetForm();
  }

  // This handles both account type and bills plans, in case of confusion.
  // This was not known until later time
  // Take not of billPlanSelected and bundleBillPlanSelected and corresponding variables
  // console.log/debugger will go a long way
  billPlanSelected() {
    if (this.sharedData.billsPaymentsMode === this.handlers.variables().airtime ||
      this.sharedData.billsPaymentsMode === this.handlers.variables().electricity ||
      this.sharedData.billsPaymentsMode === this.handlers.variables().boropower
    ) {
      this.accountType = this.billsPaymentHandlersService.billTypeChange(this.billPlans, this.selectedBillPlan);
      console.log(this.accountType)
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().cable) {
      this.amount = this.billsPaymentHandlersService.getCableTvAmount(this.billPlans, this.selectedBillPlan);
      this.cableBouquetObj = this.billsPaymentHandlersService.getCableBouquetObj(this.billPlans, this.selectedBillPlan);
      console.log(this.amount)
      console.log(this.cableBouquetObj)
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().internet) {
      this.amount = this.billsPaymentHandlersService.getInternetPlanAmount(this.billPlans, this.selectedBillPlan);
      this.internetPlanObj = this.billsPaymentHandlersService.getInternetPlanObj(this.billPlans, this.selectedBillPlan);
      console.log(this.internetPlanObj)
      console.log(this.amount)
    }
  }

  // This hanles change event on prepaid and post plan for internet bundle
  // Slight different from others
  // In the case of internet bundle, it's bill plans are account type
  bundleBillPlanSelected() {
    this.accountType = this.billsPaymentHandlersService.billTypeChange(this.bundleBillPlans, this.selectedBundleBillPlans);
    console.log(this.accountType)
  }

  uniqueIdChange() {
    this.resetFormForUniqueID();
  }
  amountChange() {console.log(this.amount);}
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
      paymentBody: this.billerObj.billerName,
      convenienceFee: this.billerObj.convenienceFee
    }
  }
  // <--- ALL CHANGE EVENTS ENDS --->

  // <--- PAYMENTS OBJ BEGINS --->
  airtimePayment() {
    this.sharedData.paymentObj = {
      channel: "trupay",
      userId: this.customerPhone,
      emailForNotification: this.customerEmail,
      billerId: this.billerID,
      phoneNumber: (!this.beneficiaries && this.uniqueID) || (this.newBeneficiaryChange && this.uniqueID) ? this.uniqueID : this.selectedBeneficiary,
      accountType: this.accountType,
      paymentSourceId: null,
      pin: null,
      paymentMethod: null,
      amount: this.amount,
      convenienceFee: this.billerObj.convenienceFee + "",
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID,
      hash: null
    };

    this.storeBeneficiary();

    // setting up data to be displayed on the pin/validation page.
    this.setDisplayInfo();

    if (!this.amount) {
      this.alertSrvc.showErrorToast('Amount is required');
    } else if (parseFloat(this.amount) < parseFloat(this.billerObj.minBorrowAmount)) {
      this.alertSrvc.showErrorToast('Amount cannot be less than ' + this.billerObj.minBorrowAmount);
      return;
    } else {
      this.navCtrl.navigateForward('/payments/payment');
    }
  }

  cablePayment() {
    this.sharedData.paymentObj = {
      channel: "trupay",
      userId: this.customerPhone,
      billerId: this.billerID,
      subscriberId: (!this.beneficiaries && this.uniqueID) || (this.newBeneficiaryChange && this.uniqueID) ? this.uniqueID : this.selectedBeneficiary,
      subscriberPhone: this.customerPhone,
      subscriberName: this.customerName,
      emailForNotification: this.customerEmail,
      bouquet: this.cableBouquetObj.name,
      paymentSourceId: null,
      pin: null,
      paymentMethod: null,
      amount: this.amount,
      convenienceFee: this.billerObj.convenienceFee + "",
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID,
      hash: null
    }

    this.storeBeneficiary();

    // setting up data to be displayed on the pin/validation page.
    this.setDisplayInfo();

    if (!this.amount) {
      this.alertSrvc.showErrorToast('Amount is required');
    } else if (parseFloat(this.amount) < parseFloat(this.billerObj.minBorrowAmount)) {
      this.alertSrvc.showErrorToast('Amount cannot be less than ' + this.billerObj.minBorrowAmount);
      return;
    } else {
      this.navCtrl.navigateForward('/payments/payment');
    }
  }

  electricityPayment() {
    this.sharedData.paymentObj = {
      channel: "trupay",
      userId: this.customerPhone,
      billerId: this.billerID,
      meterId: (!this.beneficiaries && this.uniqueID) || (this.newBeneficiaryChange && this.uniqueID) ? this.uniqueID : this.selectedBeneficiary,
      accountType: this.accountType,
      customerName: this.customerName,
      phonenumber: this.customerPhone,
      emailForNotification: this.customerEmail,
      paymentSourceId: null,
      pin: null,
      paymentMethod: null,
      amount: this.amount,
      convenienceFee: this.billerObj.convenienceFee + "",
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID,
      hash: null
    }

    this.storeBeneficiary();

    // setting up data to be displayed on the pin/validation page.
    this.setDisplayInfo();

    if(!this.amount) {
      this.alertSrvc.showErrorToast('Amount is required');
    } else if (parseFloat(this.amount) < parseFloat(this.userDetails.minimumAmount)) {
      this.alertSrvc.showErrorToast('Amount cannot be less than ' + this.userDetails.minimumAmount);
      return;
    } else {
      this.navCtrl.navigateForward('/payments/payment');
    }
  }

  internetServicesPayment() {
    this.sharedData.paymentObj = {
      channel: "trupay",
      userId: this.customerPhone,
      billerId: this.billerID,
      subscriberId: (!this.beneficiaries && this.uniqueID) || (this.newBeneficiaryChange && this.uniqueID) ? this.uniqueID : this.selectedBeneficiary,
      subscriberPhone: this.customerPhone,
      subscriberName: this.customerName,
      emailForNotification: this.customerEmail,
      bundleType: this.internetPlanObj.bundleType,
      accountType: this.accountType,
      paymentSourceId: null,
      pin: null,
      paymentMethod: null,
      amount: this.amount,
      convenienceFee: this.billerObj.convenienceFee + "",
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID,
      hash: null
    }

    this.storeBeneficiary();

    // setting up data to be displayed on the pin/validation page.
    this.setDisplayInfo();

    let phoneNo = this.uniqueID || this.selectedBeneficiary
    if (!phoneNo) {
      this.alertSrvc.showErrorToast('Phone Number or Network ID is required');
    } else {
      this.navCtrl.navigateForward('/payments/payment');
    }
 }

  borroPowerPayment() {
    this.sharedData.paymentObj = {
      channel: "trupay",
      userId: this.customerPhone,
      MeterNo: (!this.beneficiaries && this.uniqueID) || (this.newBeneficiaryChange && this.uniqueID) ? this.uniqueID : this.selectedBeneficiary,
      accountType: this.accountType,
      customerName: this.customerName,
      phoneNumber: this.customerPhone,
      emailForNotification: this.customerEmail,
      amount: this.amount,
      EnergyBillerId: this.billerID,
      paymentMethod: null,
      paymentSourceId: null,
      pin: null,
      userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID,
      convenienceFee: this.billerObj.convenienceFee + "",
      hash: null
    }

    this.storeBeneficiary();

    // setting up data to be displayed on the pin/validation page.
    this.setDisplayInfo();

    if (!this.amount) {
      this.alertSrvc.showErrorToast('Amount is required');
    } else if (parseFloat(this.amount) < parseFloat(this.userDetails.minimumAmount)) {
      this.alertSrvc.showErrorToast('Amount cannot be less than ' + this.userDetails.minimumAmount);
      return;
    } else {
      this.navCtrl.navigateForward('/payments/payment');
    }
  }
  // <--- PAYMENTS OBJ ENDS --->

  // <--- MAKE PAYMENT BEGINS --->
  makePayment() {
    if (this.sharedData.billsPaymentsMode === this.handlers.variables().airtime) {
      this.airtimePayment();
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().electricity) {
      this.electricityPayment();
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().cable) {
      this.cablePayment();
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().internet) {
      this.internetServicesPayment();
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().boropower) {
      this.borroPowerPayment();
    }
    console.log(this.sharedData.paymentObj)
  }
  // <--- MAKE PAYMENT ENDS --->

  // <--- INITIALIZE FORM PAGE BEGINS --->
  init() {
    if (this.sharedData.billsPaymentsMode === this.handlers.variables().airtime) {
      this.airtimeData = this.billsPaymentHandlersService.getAirtime(this.sharedData.billsPaymentData);
      console.log(this.airtimeData);
      this.getBillersByCategory(this.airtimeData);
    }

    if (this.sharedData.billsPaymentsMode === this.handlers.variables().cable) {
      this.cableTvData = this.billsPaymentHandlersService.getCableTV(this.sharedData.billsPaymentData);
      console.log(this.cableTvData);
      this.getBillersByCategory(this.cableTvData);
    }

    if (this.sharedData.billsPaymentsMode === this.handlers.variables().internet) {
      this.internetServicesData = this.billsPaymentHandlersService.getInternetService(this.sharedData.billsPaymentData);
      console.log(this.internetServicesData);
      this.getBillersByCategory(this.internetServicesData);
    }

    if (this.sharedData.billsPaymentsMode === this.handlers.variables().electricity) {
      this.utilitiesData = this.billsPaymentHandlersService.getElectricity(this.sharedData.billsPaymentData);
      console.log(this.utilitiesData);
      this.getBillersByCategory(this.utilitiesData);
    }

    if (this.sharedData.billsPaymentsMode === this.handlers.variables().boropower) {
      this.utilitiesData = this.billsPaymentHandlersService.getBoroPower(this.sharedData.billsPaymentData);
      console.log(this.utilitiesData);
      this.getBillersByCategory(this.utilitiesData);
    }
  }
  // <--- INITIALIZE FORM PAGE ENDS --->

  // <--- RESET FORM BEGINS --->
  resetForm() {
    if (this.sharedData.billsPaymentsMode === this.handlers.variables().electricity) {
      this.userDetails = null, this.selectedBillPlan = null, this.uniqueID = null, this.amount = null;
      this.beneficiaries = null, this.getBeneficiaries();
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().internet) {
      this.billPlans = null, this.selectedBillPlan = null, this.uniqueID = null, this.amount = null, this.accountType = null; this.internetPlanObj = null;
      this.selectedBundleBillPlans = null, this.beneficiaries = null; this.billerNameAtFirstIndex = this.billsPaymentHandlersService.getFirstIndex(this.selectedBill);
      this.getInternetDataPlans();
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().cable) {
      this.billPlans = null, this.userDetails = null, this.selectedBillPlan = null, this.uniqueID = null;
      this.amount = null, this.accountType = null, this.selectedBeneficiary = null;
      this.beneficiaries = null, this.getBeneficiaries();
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().airtime) {
      this.selectedBillPlan = null, this.uniqueID = null, this.accountType = null, this.amount = null; this.selectedBeneficiary = null;
      this.beneficiaries = null, this.getBeneficiaries();
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().boropower) {
      this.selectedBillPlan = null, this.userDetails = null, this.uniqueID = null, this.amount = null, this.accountType = null;
      this.beneficiaries = null, this.getBeneficiaries();
    }
    // <--- RESET FORM ENDS --->
  }


  // <--- RESET FORM BEGINS --->
  resetFormForUniqueID() {
    if (this.sharedData.billsPaymentsMode === this.handlers.variables().electricity) {
      this.userDetails = null, this.amount = null;
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().cable) {
      this.billPlans = null, this.userDetails = null, this.selectedBillPlan = null, this.amount = null, this.selectedBeneficiary = null;
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().boropower) {
      this.userDetails = null, this.amount = null, this.accountType = null;
    }
    // <--- RESET FORM ENDS --->
  }

  // <--- RESET UNIQUE ID BEGINS --->
  resetUniqueID() {
    if (this.sharedData.billsPaymentsMode === this.handlers.variables().electricity) {
      this.userDetails = null, this.uniqueID = null, this.amount = null, this.doSaveBeneficiary = false, this.beneficiaryAlias = null;
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().cable) {
      this.billPlans = null, this.userDetails = null, this.selectedBillPlan = null, this.uniqueID = null;
      this.amount = null, this.accountType = null, this.doSaveBeneficiary = false, this.beneficiaryAlias = null;
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().boropower) {
      this.selectedBillPlan = null, this.userDetails = null, this.uniqueID = null, this.amount = null,
      this.doSaveBeneficiary = false, this.beneficiaryAlias = null;
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().internet) {
      this.doSaveBeneficiary = false, this.beneficiaryAlias = null;
    } else if (this.sharedData.billsPaymentsMode === this.handlers.variables().airtime) {
      this.doSaveBeneficiary = false, this.beneficiaryAlias = null;
    }
    // <--- RESET UNIQUE ID ENDS --->
  }
}
