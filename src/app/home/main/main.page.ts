import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../services/user/profile.service';
import { AlertService } from '../../services/utilities/alert.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { MenuController, NavController, Platform } from '@ionic/angular';
import { UserService } from '../../services/user/user.service';
import { map, tap } from 'rxjs/operators';
import { LoaderService } from '../../services/utilities/loader.service';
import { IUser } from 'src/app/models/superApp/IUser';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { EventsService } from 'src/app/services/events/events.service';
import { AccountService } from 'src/app/services/superapp/account.service';
import { WalletService } from 'src/app/services/payments/wallet/wallet.service';
import { Router } from '@angular/router';
import { InvestmentService } from '../../services/investment/investment.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { BackbuttonService } from 'src/app/services/backbutton/backbutton.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss', '../../../theme/payments.scss'],
})
export class MainPage implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    slidesPerView: 1,
  };

  // Payment Data
  paymentData: [];
  historyItem;
  historyItem2;

  // Loan Data
  globalLimit = 0;
  loanData;
  loanBalances;
  totalLoanBalance;  // totalLoanBal
  personalLoan; // loanbalances "loanType" :"Personal"  "principal":15000.0000,
  carLoan; // loanbalances "loanType":"Car", "principal":200000.0000,

  // Investment and Savings Data
  investmentData;
  savingsData;
  totalAmount;

  photo: SafeResourceUrl;
  userPhone;
  userProfile: IUser;
  currEvent;
  walletEvent;
  walletData;
  hasWallet = undefined;
  ready;
  walletAcctNumber;
  topUpOffer: any;
  loanOffer: any;
  investmentInfo: any[];
  finaclePhone: any;

  subscription: Subscription;

  consolidatedTransactions = [];
  transactionsSubscription;

  constructor(
    private profileSrvc: ProfileService,
    private alertSrvc: AlertService,
    private menuCtrl: MenuController,
    private userSrvc: UserService,
    private loadingSrvc: LoaderService,
    public sharedData: SharedData,
    private handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    public events: EventsService,
    private accountSrvc: AccountService,
    private walletService: WalletService,
    private router: Router,
    private investmentSrvc: InvestmentService,
    private loanSrvc: LoanService,
    private platform: Platform,
    // private backBtnService: BackbuttonService,
    private navCtrl: NavController,
  ) {

    // this.backBtnPressed();
    this.hasWallet = undefined;

    this.profileSrvc.getUserProfilePicture().subscribe(
      res => {
        // console.log('PROFILE PICTURE >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', res);
      }
    )
  }

  ngOnInit() {
    this.profileSrvc.getUserProfilePicture().subscribe(res => {
      this.photo = res;
    });
    this.userPhone = this.profileSrvc.getUserPhone();

    this.sharedData.userPhone = this.userPhone;

    this.userSrvc.getUserProfileData(this.userPhone).subscribe(res => {
      console.log(res);
      if (res) {
        console.log(res);
        this.finaclePhone = res.finaclePhoneNumber;
        this.profileSrvc.setFinaclePhone(res.finaclePhoneNumber);
        // console.log("TESTING. REMOVE THE LINE BELOW LATER");
        // res['walletAcctNumber'] = "";
        this.walletAcctNumber = res['walletAcctNumber'];
        this.hasWallet = this.walletAcctNumber ? 'Yes' : 'No';
        this.sharedData.userProfile = res;
        this.userProfile = res;

        // PLEASE DON'T COMMENT OUT
        // PLEASE DON'T COMMENT OUT
        console.log(this.userProfile);
        console.log(this.sharedData.userProfile);
        console.log(this.walletData);
        if (this.userProfile && !this.walletData) {
          this.walletBalance();
          const data = {
            phoneNo: this.sharedData.userProfile.finaclePhoneNumber
          }
          this.getUserAccounts(data);
        }

        // SUBSCRIBED TO ACCOUNT REFRESH AFETR TRANSACTION HAS BEEN COMPLETED
        if(!this.sharedData.dashboardEventsSubscription) {
          console.log("SUBSCRIBING TO ALL SUBSCRIPTIONS")
          this.subscribeToAccountReload();
          this.subscribeToWalletBalanceReload();
          this.subscribeToWalletBalance();
        } else {
          console.log("THEY'VE ALL BEEN SUBSCRIBED TO");
        }
        // PLEASE DON'T COMMENT OUT
        // PLEASE DON'T COMMENT OUT

        this.profileSrvc.setUserProfileData(res);
        console.log("GET TRANSACTION HISTORY")
      }
    });

    // Get all Finacle accounts by Phone Number
    if (this.finaclePhone) {
      this.userSrvc.getAllAccounts(this.finaclePhone).subscribe(res => {
        if (res) {
          this.accountSrvc.updateAccounts(res);
        }
      });
    }

    // Get Transactions
    this.getTransactions();
  }

  ionViewWillEnter() {
    // console.log('Hello fron ivwe');
    this.userProfile = this.profileSrvc.getUserProfileData();
    this.sharedData.userProfile = this.userProfile;
    // console.log(this.userProfile);

    // Get Investment Data
    this.getInvestmentData();

    // Get Loan Data
    this.getLoanData();

    // Get Payment Data
    this.getBillspaymentData();

    // Get Transactions
    this.transactionsSubscription = setInterval(() => {
      if(this.router.url.split('/')[1] === 'home' && this.router.url.split('/')[2] === 'dashboard'){
        this.getTransactions();
      }
    }, 60000);
  }

  toggleMenu() {
    this.menuCtrl.open('home-menu');
  }

  ionViewWillLeave() {
    console.log("Leaving dashboard");
    clearInterval(this.transactionsSubscription);
  }

  subscribeToAccountReload() {
    if (this.userProfile) {
      console.log("INSIDE")
      this.sharedData.dashboardEventsSubscription = this.events.observeEvent.subscribe(res => {
        console.log("ACCOUNT SUBSCRIPTION INITIATED");
        if (res === 'yes') {
          console.log("ACCOUNT SUBSCRIBED");
          const data = {
            phoneNo: this.sharedData.userProfile.finaclePhoneNumber
          }
          this.getUserAccounts(data)
        } else { }
      });
    }
  }

  getUserAccounts(data) {
    console.log(this.sharedData.userProfile.isFidelityCustomerValidated)
    console.log(this.sharedData.userProfile.finaclePhoneNumber)
    if (this.sharedData.userProfile.isFidelityCustomerValidated && this.sharedData.userProfile.finaclePhoneNumber) {
      if (data && data.phoneNo) {
        this.billsPaymentsService.GetAllUserAccounts(data.phoneNo).subscribe(
          res => {
            console.log('getUserAccounts in main(Line78)  ===>  ' + res);
            this.accountSrvc.updateAccounts(res);
            this.sharedData.userAccounts = res;
            console.log(res);
          },
          err => { }
        );
      }
    }
  }

  subscribeToWalletBalanceReload() {
    this.currEvent = this.events.observeDashboardWallet.subscribe(res => {
      if (res === 'yes') { this.refreshWallet(); }
    });
  }

  subscribeToWalletBalance() {
    this.walletEvent = this.events.observeWalletBalance.subscribe(res => {
      if (res === 'yes') {
        console.log("SUBSCRIBED TO FECTH WALLET ACCOUNT AFTER VALIDATION IS TRUE");
        this.walletBalance();
        this.walletEvent.unsubscribe();
      }
    });
  }

  refreshWallet() {
    this.walletAcctNumber = this.sharedData.userProfile['walletAcctNumber'];
    if (this.walletAcctNumber) {
      const data = { wallet_id: this.walletAcctNumber }
      this.walletService.Checkbalance(data)
        .subscribe(
          (res: any) => {
            if (res && res.responseCode === "00") {
              this.sharedData.wallet.walletData = res.data;
              this.walletData = this.sharedData.wallet.walletData;
            }
          }
        )
    }
  }

  walletBalance() {
    this.walletAcctNumber = this.sharedData.userProfile['walletAcctNumber'];
    if (this.walletAcctNumber) {
      const data = { wallet_id: this.walletAcctNumber }
      this.walletService.Checkbalance(data)
        .subscribe(
          (res: any) => {
            if (res && res.responseCode === "00") {
              this.sharedData.wallet.walletData = res.data;
              this.walletData = this.sharedData.wallet.walletData;
              this.ready = 'Yes';
              this.hasWallet = 'Yes';
            } else { this.ready = 'No' }
          },
          err => { this.ready = 'No' }
        )
    }
  }

  go(route) {
    if (!this.walletAcctNumber) {
      this.navCtrl.navigateRoot(route);
    } else {
      if (this.ready === 'Yes') {
        this.navCtrl.navigateRoot(route)
        this.sharedData.wallet.url = "/home";
      } else if (this.ready === 'No') {
        this.walletBalance();
        this.ready = undefined;
      }
    }

  }

  getInvestmentData() {
    this.investmentSrvc.getSumValueOfInvestments(this.userPhone).subscribe((res: any[]) => {
      if (res) {
        this.investmentInfo = res;
        console.log(this.investmentInfo);
        res.forEach((arrayItem) => {
          if (arrayItem.fundType === 'FD') {
            this.investmentData = arrayItem;
          } else if (arrayItem.fundType === 'GOALS') {
            this.savingsData = arrayItem;
          }
        });
        // this.investmentData = res[1];
        console.log(this.investmentData);
        // this.savingsData = res[0];
        console.log(this.savingsData);
        if (this.investmentData && this.savingsData) {
          this.totalAmount = this.investmentData.totalAmount + this.savingsData.totalAmount;
        } else if (this.investmentData && !this.savingsData) {
          this.totalAmount = this.investmentData.totalAmount;
        } else if (!this.investmentData && this.savingsData) {
          this.totalAmount = this.savingsData.totalAmount;
        }
      }
    }, err => {
      console.log('Error');
    });
  }

  getLoanData() {
    const formattedPhone = this.loanSrvc.formatPhoneAs234(this.userPhone);
    this.loanSrvc.getDashBoardData(formattedPhone).subscribe((resp: any) => {
      this.loanSrvc.setDashboardDataObservable(resp);
      console.log('my dasboard data', resp);
      this.loanData = resp;
      this.setGlobalLimit(resp.globalLimit);
      console.log(resp.globalLimit);
      // this.globalLimit = parseInt(resp["globalLimit"], 10);
    },
      err => {
        console.log(err);
      });
  }

  setGlobalLimit(data) {
    this.globalLimit = parseInt(data, 10);
  }

  getBillspaymentData() {
    const data = { userId: this.userPhone, channel: "trupay", selectOnlyLast: true }
    this.billsPaymentsService.TransactionHistory(data).subscribe((res: any) => {
      console.log(res);
      if (res.data.length > 0) {
        this.paymentData = res.data;
        console.log(this.paymentData);

        this.historyItem = this.paymentData.pop();
        this.historyItem2 = this.paymentData.pop();
        console.log(this.historyItem, this.historyItem2)
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  // backBtnPressed() {
  //   this.subscription = this.platform.backButton.subscribeWithPriority(1, async () => {
  //     this.backBtnService.backPress();
  //   });
  // }

  getTransactions() {

    this.profileSrvc.getConsolidatedTransactions()
      .subscribe(
        (res: any) => {
          this.consolidatedTransactions = res
        },
        err => {
          // this.consolidatedTransactions = [];
        }
      )


    this.profileSrvc.getTransactions()
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res.status) {
            this.profileSrvc.updateConsolidatedTransactions(res.body);
          }
          else {
            console.log("getTransactions: Status is not true");
            this.consolidatedTransactions = [];
          }

        },
        err => {
          this.consolidatedTransactions = [];
          console.log(err);
        }
      )
  }

  test() {
    console.log(this.consolidatedTransactions);
  }

  filt(x) {
    let y = [];
    x.map(x => { if(x.read === false) { y.push(x) } })
    return y.length;
  }

  showMenu() {
    this.handlers.navigate().forwardWithoutHistory('home/menu');
  }

}
