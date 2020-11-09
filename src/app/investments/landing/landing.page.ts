import { Component, OnInit} from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/core';
import { NavigationEnd, Router, NavigationExtras } from '@angular/router';
import { SavingsService } from '../../services/investment/savings.service';
import { Subscription } from 'rxjs';
import { AlertService } from '../../services/utilities/alert.service';
import { UserService } from '../../services/user/user.service';
import { tap } from 'rxjs/operators';
import {Platform} from '@ionic/angular';
import { InvestmentService } from '../../services/investment/investment.service';
import { ProfileService } from '../../services/user/profile.service';
import { AccountService } from '../../services/superapp/account.service';
import { Handlers } from 'src/app/shared/handlers';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';
import { SharedData } from 'src/app/shared/shared.components';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  userPhone;
  switchview = 0;
  savingsData = [];
  investmentsData = [];
  savingsDataSubscription: Subscription;
  investmentsDataSubscription: Subscription;
  displayState = 'data';
  fdDisplay = 'data';
  backButtonSubscription;
  reloadSubscription: Subscription;

  accounts;
  finaclePhone: any;

  constructor(
    private router: Router,
    private savingsSrvc: SavingsService,
    private investmentSrvc: InvestmentService,
    private alertSrvc: AlertService,
    private userSrvc: UserService,
    private platform: Platform,
    private profileSrvc: ProfileService,
    private accountSrvc: AccountService,
    public handlers: Handlers,
    public sharedData: SharedData
  ) {}

  async ngOnInit() {
    this.userPhone = this.profileSrvc.getUserPhone();
    this.finaclePhone = this.profileSrvc.getFinaclePhone();
    this.reloadSubscription = this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        event.url === '/investments/landing'
      ) {
        this.onEnter();
      }
    });

    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.router.navigate(['home']);
    });

    this.accountSrvc.currentAccountsData.subscribe(res => {
      this.accounts = res;
      console.log(this.accounts);
    });

    // Check If user has due goals
    this.checkForGoalDue();
    console.log(this.finaclePhone);

    await this.onEnter();
    this.getInvestmentAmountLimit()
  }

  public async onEnter(): Promise<void>{
    // this.getUserProfile();
    this.savingsData = [];
    this.investmentsData = [];
    this.subscribeBackButton();
    console.log(this.userSrvc.currentUserValue);
    this.getSavingsData();
    this.getInvestmentData();
  }

  ionViewWillEnter() {
    this.savingsSrvc.getTargetSavingsBoundaries().subscribe((res) => {
      console.log(res);
      this.savingsSrvc.updateCurrentTsBoundaries(res);
    });
  }

  getSavingsData() {
    (this.savingsDataSubscription = this.savingsSrvc
      .getAllCombinedSavingsAccByPhone()
      .subscribe((res) => {
        if (res) {
          console.log(res);
          if (res.length <= 0 || res === null) {
            this.displayState = 'no-data';
          } else {
            setTimeout(() => {
              // console.log(res);
              this.savingsData = res;
              this.displayState = 'data';
            }, 1000);
          }
        }
      }, (err) => this.alertSrvc.showErrorToast('Error Processing request')));
  }

  getInvestmentData() {
    console.log(this.finaclePhone);
    this.investmentsDataSubscription = this.investmentSrvc
      .getAllActiveFD(this.finaclePhone)
      .subscribe((res) => {
        if (res) {
          console.log(res);
          if (res.length <= 0 || res === null) {
            this.fdDisplay = 'no-data';
          } else {
            setTimeout(() => {
              // console.log(res);
              this.investmentsData = res;
              this.fdDisplay = 'data';
            }, 1000);
          }
        }
      },  (err) => this.alertSrvc.showErrorToast('Error Processing request'));
  }

  doRefresh(event) {
    this.savingsData = [];
    this.investmentsData = [];
    this.getSavingsData();
    this.getInvestmentData();
    event.target.complete();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'savings') {
      this.switchview = 0;
    } else {
      this.switchview = 1;
    }
  }

  subscribeBackButton() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      // add logic here if you want to ask for a popup before exiting
      this.router.navigate(['home']);
    });
  }

  checkForGoalDue() {
    this.savingsSrvc.checkForDueDate().subscribe((res: any) => {
      if (res) {
        if (res.resultCode === '200') {
          this.savingsSrvc.displayGoalDueModal();
        } else if (res.resultCode === '404') {
          console.log('No goals due for this user');
        }
      }
    });
  }

  openPage(route: string) {
    this.router.navigate([`investments/${route}`]);
  }

  ionViewWillLeave() {
    this.savingsDataSubscription.unsubscribe();
    this.investmentsDataSubscription.unsubscribe();
    this.backButtonSubscription.unsubscribe();
    this.reloadSubscription.unsubscribe();
  }

  openPlanItem(pageExtras) {
    // Navigate to goal or group depending on savings type
    if (pageExtras.savingsType === 'GROUPCHALLENGE') {
      const navigationExtras: NavigationExtras = {
        state: {
          pageExtras,
        },
      };
      this.router.navigate(
        ['/', 'investments', 'save', 'group-detail'],
        navigationExtras
      );
    } else if (pageExtras.savingsType === 'GOALS') {
      const navigationExtras: NavigationExtras = {
        state: {
          pageExtras,
        },
      };
      this.router.navigate(
        ['/', 'investments', 'save', 'plan-detail'],
        navigationExtras
      );
    }
   
  }

  openFDItem(pageExtras) {
    const navigationExtras: NavigationExtras = {
      state: {
        pageExtras,
      },
    };
    this.router.navigate(
      ['/', 'investments', 'invest', 'fd-detail'],
      navigationExtras
    );
  }

  proceedToOpenAccount() {
    this.router.navigate(['/', 'payments']);
  }

  enroll() {
    this.handlers.validateFidelityCustomer(CustomalertComponent);
  }

  titleCase(name) {
    if(name) {
      let name_ = name[0].toUpperCase() + name.substring(1)
      return name_
    } else {
      return name
    }
  }

  getInvestmentAmountLimit() {
    this.investmentSrvc.getInvestmentAmountLimit().subscribe(res => {
      console.log(res);
      if (res) {
        this.sharedData.investLimit = res 
      }
    });
  }
}
