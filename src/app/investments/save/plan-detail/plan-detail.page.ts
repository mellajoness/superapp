import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { PasswordPinService } from 'src/app/services/security/password-pin.service';
import { TransactionPinService } from 'src/app/services/security/transaction-pin.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { LiquidateGoalComponent } from 'src/app/components/liquidate-goal/liquidate-goal.component';
import { ModalController, AlertController } from '@ionic/angular';
import { Handlers } from 'src/app/shared/handlers';
import { ProfileService } from 'src/app/services/user/profile.service';
import { IUser } from 'src/app/models/superApp/IUser';
import { FundingService } from 'src/app/services/investment/funding.service';

@Component({
  selector: 'app-plan-detail',
  templateUrl: './plan-detail.page.html',
  styleUrls: ['./plan-detail.page.scss'],
})
export class PlanDetailPage implements OnInit {
  isCustomerValidated;

  plan;
  hasPin;

  goalBalance;
  goalTarget;
  progress;
  profileData: IUser;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionPinSrvc: TransactionPinService,
    private loaderService: LoaderService,
    private alertServcie: AlertService,
    private passwordPinSrvc: PasswordPinService,
    private savingsSrvc: SavingsService,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private fundSrvc: FundingService,
    public handlers: Handlers,
    private profileSrvc: ProfileService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.plan = this.router.getCurrentNavigation().extras.state.pageExtras;
      }
      console.log('params: ', this.plan);
    });
    this.transactionPinSrvc.getTransactionPinStatus();
    const userPhone = this.plan.phoneNumber;

    this.goalBalance = this.plan.principalContribution;
    this.goalTarget = this.plan.targetAmount;

    // IsFidelityStaffProfiled
    this.validateStaff();
  }

  ionViewWillEnter() {
    this.savingsSrvc.getTargetSavingsBoundaries().subscribe((res) => {
      console.log(res);
      this.savingsSrvc.updateCurrentTsBoundaries(res);
    });
  }

  validateStaff() {
    this.profileSrvc.userProfileData.subscribe((res) => {
      this.profileData = res;
      this.isCustomerValidated = res.isFidelityCustomerValidated;
    });
  }

  get percentageAmount() {
    this.progress = parseInt(this.goalBalance, 10) / parseInt(this.goalTarget, 10);
    const percentage = (this.progress * 100).toFixed(1);
    return percentage;
  }

  openTopUp() {
    this.loaderService.showLoader();
    this.transactionPinSrvc.checkTranPinStatus().subscribe(
      (res) => {
        this.loaderService.hideLoader();
        const resultCode = res.resultCode;
        const status = res.status;
        if (resultCode === '402' && status === false) {
          this.passwordPinSrvc.displaySetupPINModal(null);
          this.hasPin = false;
        } else if (resultCode === '200') {
          this.fundSrvc.displayPaymentModal(this.plan);
        } else {
          this.alertServcie.showErrorToast(res.message);
        }
      },
      (error) => {
        this.loaderService.hideLoader();
        this.alertServcie.showErrorToast('Oops!!, Something went wrong');
      }
    );
  }

  async liquidateGoal() {
    const modal = await this.modalCtrl.create({
      component: LiquidateGoalComponent,
      backdropDismiss: false,
      cssClass: 'topUpModal',
      componentProps: this.plan,
    });

    return await modal.present();
  }

  async confirmLiquidate() {
    const alert = await this.alertController.create({
      header: 'Confirm',
      message: `Withdrawal limit is no more than one "convenient" 
      withdrawal per month. Min holding amount of N10,000 not greater than 50%`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'I agree',
          handler: () => {
            this.liquidateGoal();
          },
        },
      ],
    });

    await alert.present();
  }

  openHistory(pageExtras) {
    const navigationExtras: NavigationExtras = {
      state: {
        pageExtras,
      },
    };
    this.router.navigate(
      ['/', 'investments', 'save', 'goal-history'],
      navigationExtras
    );
  }

  deleteGoal() {
    const goalID = this.plan.goalId;
    this.loaderService.showLoader();
    this.savingsSrvc.deleteUnfundedGoal(goalID).subscribe(
      (res) => {
        this.loaderService.hideLoader();
        if (res.resultCode === '200') {
          this.alertServcie.displaySuccessModal(
            'Successful',
            'investments/landing'
          );
        } else {
          this.alertServcie.showErrorToastDown(res.message);
        }
      },
      (err) => {
        this.loaderService.hideLoader();
      }
    );
  }

  async presentDeleteGoal() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: 'Delete this goal?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            this.deleteGoal();
          },
        },
      ],
    });

    await alert.present();
  }
}
