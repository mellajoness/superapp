import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/superApp/IUser';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { TransactionPinService } from 'src/app/services/security/transaction-pin.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { PasswordPinService } from 'src/app/services/security/password-pin.service';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { ModalController, AlertController, PopoverController, Platform } from '@ionic/angular';
import { FundingService } from 'src/app/services/investment/funding.service';
import { Handlers } from 'src/app/shared/handlers';
import { ProfileService } from 'src/app/services/user/profile.service';
import { SocialShareComponent } from 'src/app/components/social-share/social-share.component';
import { GroupDetailPopoverComponent } from 'src/app/components/group-detail-popover/group-detail-popover.component';
import { LiquidateGroupComponent } from 'src/app/components/liquidate-group/liquidate-group.component';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.page.html',
  styleUrls: ['./group-detail.page.scss'],
})
export class GroupDetailPage implements OnInit {

  isCustomerValidated;

  plan;
  extensivePlanData;
  hasPin;

  goalBalance;
  goalTarget;
  progress;
  profileData: IUser;
  isGroupAdmin: boolean;
  backButtonSubscription: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionPinSrvc: TransactionPinService,
    private loaderService: LoaderService,
    private alertServcie: AlertService,
    private passwordPinSrvc: PasswordPinService,
    private savingsSrvc: SavingsService,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private popoverController: PopoverController,
    private platform: Platform,
    private fundSrvc: FundingService,
    public handlers: Handlers,
    private profileSrvc: ProfileService
  ) {}

  ngOnInit() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.back();
    });
    
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.plan = this.router.getCurrentNavigation().extras.state.pageExtras;
      }
      console.log('params: ', this.plan);
    });
    this.transactionPinSrvc.getTransactionPinStatus();
    const userPhone = this.plan.phoneNumber;

    this.goalBalance = parseInt(this.plan.principalContribution, 10);
    this.goalTarget = this.plan.targetAmount;

    // IsFidelityStaffProfiled
    this.validateStaff();
  }

  ionViewWillEnter() {
    this.backButtonSubscription = this.platform.backButton.subscribe(() => {
      this.back();
    });
    
    this.savingsSrvc.getTargetSavingsBoundaries().subscribe((res) => {
      console.log(res);
      this.savingsSrvc.updateCurrentTsBoundaries(res);
    });

    this.checkIfUserIsAdmin();
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: GroupDetailPopoverComponent,
      event: ev,
      componentProps: {
        plan: this.plan
      },
      translucent: true,
      backdropDismiss: true
    });

    popover.onDidDismiss().then(dataReturned => {
     console.log('dismissed: ' + dataReturned);
    });
    return await popover.present();
  }

  validateStaff() {
    this.profileSrvc.userProfileData.subscribe((res) => {
      this.profileData = res;
      this.isCustomerValidated = res.isFidelityCustomerValidated;
    });
  }

  checkIfUserIsAdmin() {
    this.savingsSrvc.checkIfUserIsGroupAdmin(this.plan.goalId).subscribe(res => {
      console.log(res);
      if (res.status === true) {
        this.isGroupAdmin = true;
      }
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

   shareModal() {

    this.savingsSrvc.getGroupDetailsById(this.plan.goalId).subscribe(res => {
      if (res) {
        this.extensivePlanData = res;
        this.openModalWithProps(this.extensivePlanData);
      }
    });
  }

  async openModalWithProps(componentProps){
    const modal = await this.modalCtrl.create({
      component: SocialShareComponent,
      backdropDismiss: true,
      cssClass: 'share-modal',
      componentProps,
    });

    return await modal.present();
  }

  async liquidateGoal() {
    const modal = await this.modalCtrl.create({
      component: LiquidateGroupComponent,
      backdropDismiss: false,
      cssClass: 'topUpModal',
      componentProps: this.plan,
    });

    return await modal.present();
  }

  async confirmLiquidate() {
    const alert = await this.alertCtrl.create({
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
      ['/', 'investments', 'save', 'group-detail', 'group-history'],
      navigationExtras
    );
  }

  back() {
    // this.navCtrl.back();
    this.router.navigate(['investments', 'landing'], {replaceUrl: false });
  }

  deleteGoal() {
    const goalID = this.plan.goalId;
    this.loaderService.showLoader();
    this.savingsSrvc.deleteUnfundedGroup(goalID).subscribe(
      (res) => {
        this.loaderService.hideLoader();
        if (res.resultCode === '200') {
          this.alertServcie.displaySuccessModal(
            'You have successfully exited the group',
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
    const alert = await this.alertCtrl.create({
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

  async presentOptOut() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Leave this Group Challenge?',
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
          text: 'Okay',
          handler: () => {
            this.optOutOfGroup();
          },
        },
      ],
    });

    await alert.present();

  }

  optOutOfGroup() {
    const goalID = this.plan.goalId;
    this.loaderService.showLoader();
    this.savingsSrvc.memberOptOutGroup(goalID).subscribe(
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

  ionViewWillLeave() {
    this.backButtonSubscription.unsubscribe();
  }

}
