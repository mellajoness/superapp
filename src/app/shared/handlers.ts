import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ModalBaseComponent } from './../components/modal-base/modal-base.component';
import { Injectable } from '@angular/core';
import { ModalController, NavController, PopoverController, ActionSheetController } from '@ionic/angular';
import { SharedData } from './shared.components';
import { Config } from './Urls';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoaderService } from '../services/utilities/loader.service';
import { AlertService } from '../services/utilities/alert.service';
import { apiKeys } from 'src/environments/environment';
import { ChangeWalletPinComponent } from '../components/change-wallet-pin/change-wallet-pin.component';

@Injectable()

export class Handlers {
  modal;
  popover;

  constructor(
    public modalCtrl: ModalController,
    public sharedData: SharedData,
    private config: Config,
    private router: Router,
    private navCtrl: NavController,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    public popoverController: PopoverController,
    public actionSheetCtrl: ActionSheetController,
    private statusBar: StatusBar
  ) { }

  async presentModal(modalCSS, component) {
    this.sharedData.modalOption = modalCSS;
    this.sharedData.paymentType = modalCSS;
    this.modal = await this.modalCtrl.create({
      component: component,
      swipeToClose: true,
      mode: 'md',
      cssClass: modalCSS === 'airtime' ? 'airtime-modal-css' :
        modalCSS === 'cable' ? 'cable-modal-css' :
          modalCSS === 'electricity' ? 'electricity-modal-css' :
            modalCSS === 'water' ? 'water-modal-css' :
              modalCSS === 'water' ? 'water-modal-css' :
                modalCSS === 'internet' ? 'internet-modal-css' :
                  modalCSS === 'searchAndSelect' ? 'seach-and-select-modal-css' :
                    modalCSS === 'flight-ticket-details' ? 'flight-ticket-details-css' : 'betting-modal-css'
    });
    return await this.modal.present();
  }

  async locationModal(component) {
    this.modal = await this.modalCtrl.create({
      component: component,
      swipeToClose: true,
      mode: 'md',
      cssClass: 'location-modal-css'
    });
    return await this.modal.present();
  }

  async locationModalInfo(component) {
    this.modal = await this.modalCtrl.create({
      component: component,
      swipeToClose: true,
      mode: 'md',
      cssClass: 'locationInfo-modal-css'
    });
    return await this.modal.present();
  }

  async showCustomAlertModal(modalPage) {
    this.sharedData.isModalActive = true;
    this.modal = await this.modalCtrl.create({
      component: modalPage,
      backdropDismiss: false,
      cssClass: this.sharedData.customAlertView === 'identifyCustomer' ? 'identify-customer-css' : 'customAlert',
    });
    return await this.modal.present();
  }

  async presentSwipeableModal(modalCSS, component) {
    this.sharedData.modalOption = modalCSS;
    this.sharedData.paymentType = modalCSS;
    this.modal = await this.modalCtrl.create({
      component: component,
      swipeToClose: true,
      mode: 'ios',
      cssClass: modalCSS === 'airtime' ? 'airtime-modal-css' :
        modalCSS === 'cable' ? 'cable-modal-css' :
          modalCSS === 'electricity' ? 'electricity-modal-css' :
            modalCSS === 'water' ? 'water-modal-css' :
              modalCSS === 'water' ? 'water-modal-css' :
                modalCSS === 'internet' ? 'internet-modal-css' :
                  modalCSS === 'searchAndSelect' ? 'seach-and-select-modal-css' :
                    modalCSS === 'flight-ticket-details' ? 'flight-ticket-details-css' : 'betting-modal-css'
    });
    return await this.modal.present();
  }

  async presentRoutingModal(component) {
    this.modal = await this.modalCtrl.create({
      component: ModalBaseComponent,
      componentProps: {
        rootPage: component
      }
    });
    return await this.modal.present();
  };

  async showWalletModal(modalPage) {
    this.modal = await this.modalCtrl.create({
      component: modalPage,
      cssClass: 'walletModal',
      backdropDismiss: true,
      swipeToClose: true,
      mode: 'md',
    });
    return await this.modal.present();
  }

  async showWalletCreationModal(modalPage) {
    this.modal = await this.modalCtrl.create({
      component: modalPage,
      cssClass: 'walletCreationModal',
    });
    return await this.modal.present();
  }

  async displayResetWalletPINModal(componentProps) {
    const modal = await this.modalCtrl.create({
      component: ChangeWalletPinComponent,
      backdropDismiss: false,
      cssClass: 'forgotPINModal',
      componentProps
    });

    return await modal.present();
  }

  async hide() {
    this.sharedData.isModalActive = false;
    await this.modal.dismiss();
  }

  async presentPopover(component) {
    this.popover = await this.popoverController.create({
      component: component,
      mode: 'md',
      cssClass: 'sort-filter',
      // event: ev,
      translucent: true
    });
    return await this.popover.present();
  }

  async popoverDismiss() {
    await this.popover.dismiss();
  }

  billsBaseUrl() {
    return this.config.BillsPaymentUrl()
  }

  walletBaseUrl() {
    return this.config.WalletUrl()
  }

  truPofileBaseUrl() {
    return this.config.TruProfileUrl()
  }

  truPayBaseUrl() {
    return this.config.TruPayUrl()
  }

  urlpaths() {
    const paths = {
      // BillsPayment endpoints
      getAllBillers: '/GreystoneBills/billercategories/all',
      getBillersByCategory: '/GreystoneBills/getbillersincategory',
      validateMeterNumber: '/BuyPower/greystone/customerinfo/validate',
      validateSmartCardNumber: '/CableTV/greystone/subscriber/validate',
      getSmartCardNumberPlans: '/CableTV/greystone/pricelist/get',
      getInternetDataPlans: '/InternetData/greystone/pricelist/get',
      checkBoroPowerMeterEligibility: '/BorrowPower/greystone/meter/checkeligibilty',
      getBoroPowerMeterCustomerInfo: '/BuyPower/greystone/customerinfo/validate',
      borrowPower: '/BorrowPower/greystone/borrowpower',
      payElectricity: '/BuyPower/greystone/energyunits/buy',
      buyInternetData: '/InternetData/greystone/databundle/buy',
      subscribeTv: '/CableTV/greystone/tvpackage/buy',
      airtimeRecharge: '/Airtime/greystone/buy',
      getCityByCodeName: '/api/GreystoneBills/billercategories/all',
      getBeneficiaries: '/Beneficiary/retrieve',
      deleteBeneficiaries: '/Beneficiary/delete',
      transactionHistory: '/History/transactions/retrieve',


      // Wallet endpoints
      // getalltransactions: '/Wallet/v1/getalltransactions',
      // checkbalance: '/Wallet/v1/checkbalance',
      // cashoutwallettofidelityaccount: '/CashOut/v1/cashoutwallettofidelityaccount',
      // cashoutwallettononfidelityaccount: '/CashOut/v1/cashoutwallettononfidelityaccount',
      // getAllBanksAndBankCodes: '/Accounts/v1/getAllBanksAndBankCodes',
      // fundwallettowallet: '/Wallet/v1/fundwallettowallet',
      // fundwalletfromfidelityaccount: '/FundWallet/v1/fundwalletfromfidelityaccount',
      // verifytransactionstatus: '/FundWallet/v1/verifytransactionstatus',
      // getAccountDetails: '/Accounts/v1/getFidelityAccountDetails?accountNumber=',
      // nameEnquiryForInterbankTransfer: '/Accounts/v1/nameEnquiryForInterbankTransfer',
      // verifyphonenumber: '/Onboarding/v1/verifyphonenumber?phoneNumber=',
      // resetpin: '/Onboarding/v1/resetpin',
      // confirmresetpin: '/Onboarding/v1/confirmresetpin',
      // register: '/Onboarding/v1/register',
      // getWalletBeneficiaries: '/Wallet/v1/getbeneficiary',
      // saveWalletBeneficiaries: '/Wallet/v1/savebeneficiary',
      // deleteWalletBeneficiaries: '/Wallet/v1/deletebeneficiary',
      
      // Wallet API Gateway endpoints
      getalltransactions: '/GetAllTransactions',
      checkbalance: '/CheckBalance',
      cashoutwallettofidelityaccount: '/WalletToFidelityTransfer',
      cashoutwallettononfidelityaccount: '/WalletToNonFidelityTransfer',
      getAllBanksAndBankCodes: '/GetAllBanksAndBankCodes',
      fundwallettowallet: '/FundwallettoWallet',
      fundwalletfromfidelityaccount: '/FundWalletFromFidelity',
      verifytransactionstatus: '/CheckTransactionStatus',
      getAccountDetails: '/GetFidelityAccountDetails?accountNumber=',
      nameEnquiryForInterbankTransfer: '/NameEnquiryForInterbankTransfer',
      verifyphonenumber: '/VerifyPhoneNumber?phoneNumber=',
      resetpin: '/ResetPin',
      confirmresetpin: '/ConfrimResetPin',
      register: '/Register',
      getWalletBeneficiaries: '/GetBeneficiary',
      saveWalletBeneficiaries: '/SaveBeneficiary',
      deleteWalletBeneficiaries: '/DeleteBeneficiary',

      // Truprofile endpoints
      // walletAccountUpdateByPhone: '/UserProfile/WalletAccountUpdateByPhone?Phonenumber=',
      
      // Truprofile API Gateway endpoints
      walletAccountUpdateByPhone: '/WalletAccountUpdateByPhone?Phonenumber=',

      // Trupay endpoints
      institutions: '/Transfer/institutions',
      nameinquiry: '/Transfer/nameinquiry',
      transfer: '/Transfer/nip',
      intrabank: '/Transfer/intrabank',
      transferbeneficiaries: '/Beneficiary/transfers/retrieve',
      deletetransferbeneficiaries: '/Beneficiary/transfers/delete',
      location: '/Location/branch/search?locationName=',
      fx: '/FX/rates',

      //QUICKTELLER
      getQuicktellersBiller: '/QuicktellerBills/billercategories/all',
      getQuicktellersBillerInCategory: '/QuicktellerBills/getbillersincategory',
      getQuicktellersBettingOffers: '/QuicktellerBills/biller/offers',
      validateQuicktellersBettingSubscriber: '/QuicktellerBills/biller/subscriber/validate',
      payBetting: '/QuicktellerBills/pay',

    }
    return paths;
  }

  httpHeader(feature?, variables?) {
    if (feature === 'travel') {
      const travelHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'vWdyuR?wd6u730:l892e9dc892e=231!',
        'x-Token': '[bkcy8d7823p;]-waka4up',
        'Appid': 'LimitlessG@teway',
        'Appsecret': 'f0da6339-ea04-4315-8da9-d45e6eb72394',
      });
      return travelHeader;
    }

    if (feature === 'wallet') {
      const walletHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + 'VHJ1V2FsbGV0U3lzdGVtQVBJOjFAMTIzd2VxIzE1NmVyWQ==',
        'Appid': 'LimitlessG@teway',
        'Appsecret': 'f0da6339-ea04-4315-8da9-d45e6eb72394',
        // 'username': 'TruWalletSystemAPI',
        // 'password': '1@123weq#156erY'
      });
      return walletHeader;
    }

    if (feature === 'validateFidelityCustomer') {
      const verifyTokenHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'XApiKey': apiKeys.truprofile,
        'Appid': 'LimitlessG@teway',
        'Appsecret': 'f0da6339-ea04-4315-8da9-d45e6eb72394',
        // 'TruProfilePhoneNumber': variables.TruProfilePhoneNumber
      });
      return verifyTokenHeader;
    }

    if (feature === 'transfers') {
      const transfersHeader = new HttpHeaders({
        'Content-Type': 'application/json',
        'XAPIKey': '$Ms89jkE0cxP5%UIj1oVbFlQr7',
        'XPaymentKey': 'Md730nls76362-lcln7I',
        'Appid': 'LimitlessG@teway',
        'Appsecret': 'f0da6339-ea04-4315-8da9-d45e6eb72394',
        // 'TruProfilePhoneNumber': variables.TruProfilePhoneNumber
      });
      return transfersHeader;
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'hd7%HJSfgk|ksddTQKMAzDA',
      'Appid': 'LimitlessG@teway',
      'Appsecret': 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });
    return headers;
  }

  variables() {
    const items = {
      airtime: 'airtime',
      betting: 'betting',
      internet: 'internet',
      electricity: 'electricity',
      water: 'water',
      tollpayment: 'tollpayment',
      waste: 'waste',
      boropower: 'boropower',
      cable: 'cable',
      flight: 'flight',
      wallet: 'wallet',
      requestmoney: 'requestmoney',
    }
    return items;
  }

  headers() {
    const items = {
      airtime: 'Airtime Recharge',
      betting: 'Betting',
      internet: 'Internet Services',
      electricity: 'Electricity',
      water: 'Water',
      tollpayment: 'Toll Payment',
      waste: 'Waste Management',
      boropower: 'BoroPower',
      cable: 'Cable TV'
    }
    return items;
  }

  navigate() {
    return {
      forward: (destination) => {
        this.router.navigate([destination]);
      },
      forwardWithoutHistory: (destination) => {
        this.router.navigate([destination], { replaceUrl: true });
      },
      back: () => {
        this.navCtrl.back();
      }
    }
  }

  responseMsgs() {
    const respmsg = {
      specialCharacters: /[!@#€£$%^&*()_+\-=\[\]{};'`:"\\|,.<>\/?]+/,
      invalidSelectedDates: "You entered invalid dates. Please try again",
      invalidPassenger: "Please select at least one passenger",
      refineSearch: " .Please refine your search and retry.",
      errorOccurredTryLater: "An error occurred. Please try again later.",
      travelNarration: "Payment for flight ticket - ",
      trupay: "trupay",
      selectArrivalCity: "Please select arrival city",
      selectDepartureCity: "Please select departure city",
      enterDepartureDate: "Please enter departure date",
      enterArrivalDate: "Please enter arrival date",
      swipeToDelete: "Swipe left to delete beneficiary",
      deleteBene: "Beneficiary deleted successfully",
    }
    return respmsg;
  }

  generateArrayOfNumbers(min, max) {
    var list = [];
    for (var i = min; i <= max; i++) {
      list.push(i);
    }
    return list
  }

  travelServiceNames() {
    const base = 'Travels/'
    const travels = {
      getCityCodeByName: base + 'GetCityCodeByName?cityName=',
      getAirportsInCity: base + 'GetAirportsInCity',
      getAirlineCodeByName: base + 'GetAirlineCodeByName',
      buyTicket: base + 'BuyTicket',
      updateGeotravelWithPaymentInfo: base + 'UpdateGeotravelWithPaymentInfo',
      // invalidateCookie: base + 'InvalidateCookie',
      termsConditions: base + 'flight/termsconditions',
      reCreateTicket: base + 'ReCreateTicket',
      getPnr: base + 'GetPnr',
      rebookFlight: base + 'RebookFlight',
      bookFlight: base + 'BookFlight',
      getAvailableFlights: base + 'GetAvailableFlights',
      // travelsLogin: base + 'TravelsLogin',
      getCountries: base + 'countries/all',
      fareRules: base + 'flight/fare-rules?pnr='
    }
    return travels
  }

  titleCase(string) {
    if (string) {
      string = string.toString();
      string[0] = string[0].toUpperCase();
      return string;
    }
  }

  cardinalToOrdinal(n) {
    let res = '';
    if (n === 0) return res = String(n)

    switch (n % 10) {
      case 1:
        if (n === 11) return res = `${n}th`;
        res = `${n}st`;
        break;
      case 2:
        if (n === 12) return res = `${n}th`;
        res = `${n}nd`;
        break;
      case 3:
        if (n === 13) return res = `${n}th`;
        res = `${n}rd`;
        break;
      default:
        res = `${n}th`;
        break;
    }
    return res
  }


  getYear(date?) {
    if (date) {
      return new Date(date).getFullYear();
    }
    return new Date().getFullYear();
  }

  getMonth(date?) {
    if (date) {
      return new Date(date).getMonth() + 1;
    }
    return new Date().getMonth() + 1;
  }

  getDay(date?) {
    if (date) {
      return new Date(date).getDay();
    }
    return new Date().getDay();
  }

  setMonth(date, zeroBasedMonth) {
    date.setMonth(zeroBasedMonth);
    return date;
  }


  getYYYYMMdd = function (d) {
    let yyyy = d.getFullYear().toString();
    let mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
    let dd = d.getDate().toString();
    return yyyy + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + (dd[1] ? dd : "0" + dd[0]); // 
  }

  convertDDMMYYtoMMDDYY(dateString) {
    let datearray = dateString.split("-");
    let newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
    return newdate
  }

  getddMMYYYY = function (d) {
    let yyyy = d.getFullYear().toString();
    let mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
    let dd = d.getDate().toString();
    return (dd[1] ? dd : "0" + dd[0]) + '-' + (mm[1] ? mm : "0" + mm[0]) + '-' + yyyy; // padding
  };

  getMonthName(monthNumber, short?) {
    const monthNames = {
      0: 'January',
      1: 'Febuary',
      2: 'March',
      3: 'April',
      4: 'May',
      5: 'June',
      6: 'July',
      7: 'August',
      8: 'September',
      9: 'October',
      10: 'November',
      11: 'December'
    };

    const monthName = (monthNames[monthNumber]);

    if (short) {
      return monthName.slice(0, 3);
    }
    return monthName;
  }

  getDayName(dayIndex, short?) {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];

    if (short) {
      return (days[dayIndex]).slice(0, 3);
    }

    return days[dayIndex];
  }

  getDayName_dd_Mon_YYYY(dateString, ordinal?) {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@')
    // console.log('Incoming date String ====> ' + dateString);
    // let date = new Date(dateString);
    // console.log('Converted to date type ====> ' + date);

    // const year = date.getFullYear();
    // console.log('Year ====> ' + year);

    // const month = this.getMonthName(date.getMonth(), true);
    // console.log('Month Name ====> ' + month);

    // const day = ordinal ? this.cardinalToOrdinal(date.getDate()) : date.getDate();
    // console.log('Date ====> ' + day);


    // const dayName = this.getDayName(date.getDay(), true);
    // console.log('DayName ====> ' + dayName);


    const dateComponents = this.extractDateComponents(dateString);
    const result = `${dateComponents.dayName}, ${ordinal ? dateComponents.ordinalDay : dateComponents.day} ${dateComponents.month}. ${dateComponents.year}`;
    return result;
  }

  extractDateComponents(dateString) {
    console.log('Incoming date String ====> ' + dateString);
    let date = new Date(dateString);
    console.log('Converted to date type ====> ' + date);

    const year = date.getFullYear();
    console.log('Year ====> ' + year);

    const month = this.getMonthName(date.getMonth(), true);
    console.log('Month Name ====> ' + month);

    const day = date.getDate();
    console.log('Date ====> ' + day);

    const ordinalDay = this.cardinalToOrdinal(date.getDate());
    console.log('OrdinalDate ====> ' + ordinalDay);

    const dayName = this.getDayName(date.getDay(), true);
    console.log('DayName ====> ' + dayName);

    return {
      year, month, day, ordinalDay, dayName
    }
  }

  msToTime(duration) {
    // var seconds = (millisec / 1000).toFixed(1);

    // var minutes = (millisec / (1000 * 60)).toFixed(1);

    // var hours = (millisec / (1000 * 60 * 60)).toFixed(1);

    // var days = (millisec / (1000 * 60 * 60 * 24)).toFixed(1);

    // if (parseInt(seconds) < 60) {
    //   return seconds + " Sec";
    // } else if (parseInt(minutes) < 60) {
    //   return minutes + " Min";
    // } else if (parseInt(hours) < 24) {
    //   return hours + " Hrs";
    // } else {
    //   return days + " Days"
    // }


    var seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const _hours = (hours < 10) ? "0" + hours : hours;
    const _minutes = (minutes < 10) ? "0" + minutes : minutes;
    const seconds_ = (seconds < 10) ? "0" + seconds : seconds;

    return _hours + ":" + _minutes;
  }

  busy() {
    return true;
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  millisecondsToYears(mSeconds) {
    const checkYear = Math.floor(mSeconds / 31536000000);
    return checkYear;
  }

  navPop() {
    const nav = document.querySelector('ion-nav');
    nav.pop();
  }

  validateFidelityCustomer(component) {
    this.sharedData.customAlertView = 'identifyCustomer';
    this.showCustomAlertModal(component);
    this.sharedData.firstPayment = false;
  }

  formatFinacleNumber(phoneNo) {
    let phone: string = phoneNo;
    if (phone) {
      if (phone.startsWith('+234')) {
        phone = `0${phone.slice(4)}`;
      } else if (phone.startsWith('234')) {
        phone = `0${phone.slice(3)}`;
      }
      return phone;
    }
  }
  extractOTP(otpMessage) {
    let otp;
    otpMessage.split(' ').map(
      element => {
        let firstChar = element.toString()[0];
        // console.log(firstChar);
        if (!isNaN(firstChar)) {
          console.log(element);
          otp = element;
        }
      }
    )
    return otp
  }

  async showActionSheet(header, buttons) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: header,
      buttons: buttons,
      mode: 'ios',
      cssClass: 'transfer-sheet'
    });
    await actionSheet.present();
    let result = await actionSheet.onDidDismiss();
    return result
  }

  setStatusBarTextColors(colorName) {
    // this.statusBar.backgroundColorByName(colorName.toString());
    this.statusBar.backgroundColorByName('white');
    this.statusBar.styleDefault();
  }

  hash() {
    let h;
    if (this.sharedData.billsPaymentsMode !== this.variables().boropower) {
      h = this.sharedData.paymentObj['userId'] + "trupay" + this.sharedData.paymentObj['paymentSourceId'] + "ThArt70Ok$aW3zIngWUnd@R" + this.sharedData.paymentObj['convenienceFee'] + this.sharedData.paymentObj['amount'] + this.sharedData.paymentObj['paymentMethod'];
    } else {
      h = this.sharedData.paymentObj['userId'] + "trupay" + this.sharedData.paymentObj['paymentSourceId'] + "ThArt70Ok$aW3zIngWUnd@R" + this.sharedData.paymentObj['convenienceFee'] + this.sharedData.paymentObj['amount'] + this.sharedData.paymentObj['paymentMethod'];
    }
    console.log(h);
    return h;
  }
  
  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
  }

  base64FileSize(base64) {
    return(base64.length * (3/4)) - 1
  }

}


