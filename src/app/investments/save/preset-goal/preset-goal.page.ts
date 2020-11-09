import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonSlides } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/user/profile.service';
import { UserService } from '../../../services/user/user.service';
import { LoaderService } from '../../../services/utilities/loader.service';
import { SavingsService } from '../../../services/investment/savings.service';
import { AlertService } from '../../../services/utilities/alert.service';

@Component({
  selector: 'app-preset-goal',
  templateUrl: './preset-goal.page.html',
  styleUrls: ['./preset-goal.page.scss'],
})
export class PresetGoalPage implements OnInit {

  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  postData =  {
    goalName : '',
    goalDescription: '',
    phoneNumber: '',
    email: '',
    targetamount: 0,
    frequencyOfSaving: '',
    isAutoDebit: true,
    yieldInterest: true,
    startDate: '',
    tenorInDays: 0,
    frequencyAmount: 0,
    staffRefCode: ''
  };

  frequencyAmountData = {
    targetAmount: 0,
    frequencyInterval: 0,
    tenorInDays: 0
  };

  freqAmount;
  interestRate = 11.5;

  currentUserEmail: string;
  currentUserPhone: string;
  currentServerTime: string;

  isAutoDebit;
  isYieldInterest;


  slideTwoForm = new FormGroup({ });

  slideThreeForm = new FormGroup({
    goalDuration: new FormControl('', Validators.required),
  });

  slideFourForm = new FormGroup({
    goalFrequency: new FormControl('monthly', Validators.required),
    staffReference: new FormControl(''),
    automateGoal: new FormControl(true),
    yieldInterest: new FormControl(true),
  });
  data: any;
  goalSavingBoundaries: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private profileSrvc: ProfileService,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private savingsSrvc: SavingsService,
    private alertSrvc: AlertService,
  ) {
    this.route.queryParams.subscribe(params => {
      if ( this.router.getCurrentNavigation().extras.state) {
        this.data =  this.router.getCurrentNavigation().extras.state.pageExtras;
      }
    });
  }

  ngOnInit() {
    this.currentUserEmail = this.profileSrvc.getUserEmail();
    this.currentUserPhone = this.profileSrvc.getUserPhone();
    this.getBoundaries();
    this.initiliazeFormWithBoundaries();

    this.savingsSrvc.currentGoalsRateObs.subscribe(res => {
      this.interestRate = res;
    });
  }

  ionViewWillEnter() {
    this.currentUserEmail = this.profileSrvc.getUserEmail();
    this.currentUserPhone = this.profileSrvc.getUserPhone();
  }

  getBoundaries() {
    this.savingsSrvc.currentTSBoundariesObs.subscribe(res => {
      console.log(res.goalSavingBoundaries);
      this.goalSavingBoundaries = res.goalSavingBoundaries;
    });
  }

  initiliazeFormWithBoundaries() {
    this.slideTwoForm = new FormGroup({
      goalTarget: new FormControl('',  [Validators.required,
        Validators.min(this.goalSavingBoundaries.minimumGoalSavingsAmount),
        Validators.max(this.goalSavingBoundaries.maximumGoalSavingsAmount)])
    });
  }


  slideToNext() {
    this.slides.slideNext();
  }

  toggleYieldInterest(e) {
    this.isYieldInterest = !this.isYieldInterest;
  }

  toggleAutoDebit(e) {
    this.isAutoDebit = !this.isAutoDebit;
  }

  getStartTime() {
    this.loaderSrvc.showLoader();
    return new Promise(resolve => {
      this.userSrvc.getCurrentServerTime().subscribe(res => {
        this.currentServerTime = res;
        resolve(this.currentServerTime);
        this.loaderSrvc.dismissAllLoaders();
      }, error => { this.alertSrvc.showErrorToast('Error processing request, please try again later'); });
    });
  }

  get tenorTypeString(): string {
    let tenorType: string;
    switch (this.slideFourForm.get('goalFrequency').value) {
      case 'monthly':
        tenorType = 'Monthly';
        break;
      case 'weekly':
        tenorType = 'Weekly';
        break;
      case 'daily':
        tenorType = 'Daily';
        break;
      default:
      console.log('Sorry, could not get frequency');
    }
    return tenorType;
  }

  get displayFrequency() {
    const frequency = this.slideFourForm.get('goalFrequency').value;
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
  }

  async submitAction() {
    await this.getStartTime();
    await this.loaderSrvc.showLoader();
    this.postData.email = this.currentUserEmail;
    this.postData.phoneNumber = this.currentUserPhone;
    this.postData.startDate = this.currentServerTime;
    this.postData.goalName = this.data.name;
    this.postData.goalDescription = this.data.description;
    this.postData.targetamount = this.slideTwoForm.get('goalTarget').value;
    this.postData.tenorInDays = parseInt(this.slideThreeForm.get('goalDuration').value, 10);
    this.postData.frequencyOfSaving = this.slideFourForm.get('goalFrequency').value;
    this.postData.isAutoDebit = this.slideFourForm.get('automateGoal').value;
    this.postData.yieldInterest = this.slideFourForm.get('yieldInterest').value;
    this.postData.staffRefCode = this.slideFourForm.get('staffReference').value;
    this.postData.frequencyAmount = this.freqAmount;
    console.log(this.postData);
    this.savingsSrvc.createGoalSavings(this.postData).subscribe(res => {
      if (res) {
        this.loaderSrvc.dismissAllLoaders();
        if (res.resultCode === '200') {
          this.alertSrvc.displaySuccessModal('Goal Successfully created', 'investments/landing');
        } else if (res.resultCode === '450') {
          this.alertSrvc.showErrorToast('No BVN RECORD, Kindly Update BVN to continue');
        } else {
          this.alertSrvc.showErrorToast(res.message);
        }
      } else {
        console.log('Network connection error');
      }
    },  err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast(
        'Error processing request, please try again later'
      );
    });
  }

  previousSlide(){
    this.slides.slidePrev();
  }

  logData() {
    console.log(this.slideTwoForm.value.goalTarget);
    console.log(parseInt(this.slideThreeForm.value.goalDuration, 10));
  }

  getFreqAmount() {
    this.frequencyAmountData.tenorInDays = parseInt(this.slideThreeForm.get('goalDuration').value, 10);
    this.frequencyAmountData.frequencyInterval =  this.slideFourForm.get('goalFrequency').value;
    this.frequencyAmountData.targetAmount = this.slideTwoForm.get('goalTarget').value;
    this.slides.slideNext();
    this.savingsSrvc.getFrequencyAmount(this.frequencyAmountData).subscribe(res => {
      this.freqAmount = res;
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
