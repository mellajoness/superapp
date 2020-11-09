import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/user/profile.service';
import { UserService } from '../../../services/user/user.service';
import { LoaderService } from '../../../services/utilities/loader.service';
import { SavingsService } from '../../../services/investment/savings.service';
import { AlertService } from '../../../services/utilities/alert.service';

@Component({
  selector: 'app-custom-goal',
  templateUrl: './custom-goal.page.html',
  styleUrls: ['./custom-goal.page.scss'],
})
export class CustomGoalPage implements OnInit {

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
  goalSavingBoundaries;

  currentUserEmail: string;
  currentUserPhone: string;
  currentServerTime: string;

  isAutoDebit;
  isYieldInterest;


  slideOneForm = new FormGroup({
    goalName: new FormControl('', Validators.required),
    goalDescription: new FormControl('',  Validators.required),
  });

  slideTwoForm = new FormGroup({});

  slideThreeForm = new FormGroup({
    goalDuration: new FormControl('', Validators.required),
  });

  slideFourForm = new FormGroup({
    goalFrequency: new FormControl('monthly', Validators.required),
    staffReference: new FormControl(''),
    automateGoal: new FormControl(true),
    yieldInterest: new FormControl(true),
  });

  constructor(
    private profileSrvc: ProfileService,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private savingsSrvc: SavingsService,
    private alertSrvc: AlertService,
  ) { }

  ngOnInit() {
    this.currentUserEmail = this.profileSrvc.getUserEmail();
    this.currentUserPhone = this.profileSrvc.getUserPhone();
    this.getBoundaries();
    this.initiliazeFormWithBoundaries();

    this.savingsSrvc.currentGoalsRateObs.subscribe(res => {
      this.interestRate = res;
    });
  }

  getBoundaries() {
    this.savingsSrvc.currentTSBoundariesObs.subscribe(res => {
      console.log(res.goalSavingBoundaries);
      this.goalSavingBoundaries = res.goalSavingBoundaries;
    });
  }

  initiliazeFormWithBoundaries(){
    this.slideTwoForm = new FormGroup({
      goalTarget: new FormControl('',  [Validators.required,
        Validators.min(this.goalSavingBoundaries.minimumGoalSavingsAmount),
        Validators.max(this.goalSavingBoundaries.maximumGoalSavingsAmount)])
    });
  }


  // getStartTime() {
  //   this.loadingSrvc.showLoader();
  //   this.userSrvc.getCurrentServerTime().subscribe(res => {
  //     this.loadingSrvc.hideLoader();
  //     this.currentServerTime = res;
  //   });
  // }

  getStartTime() {
    this.loaderSrvc.showLoader();
    return new Promise(resolve => {
      this.userSrvc.getCurrentServerTime().subscribe(res => {
        this.loaderSrvc.hideLoader();
        this.currentServerTime = res;
        resolve(this.currentServerTime);
        // this.loaderSrvc.dismissAllLoaders();
      }, error => { 
        this.loaderSrvc.hideLoader();
        this.alertSrvc.showErrorToast('Error processing request, please try again later'); });
    });
  }

  slideToNext() {
    this.slides.slideNext();
  }

  previousSlide(){
    this.slides.slidePrev();
  }

  toggleYieldInterest(e) {
    this.isYieldInterest = !this.isYieldInterest;
  }

  toggleAutoDebit(e) {
    this.isAutoDebit = !this.isAutoDebit;
  }

  get calculateAmount() {
    let amount;
    let durationInDays;
    let NoOfPayments;

    const goalTargetAmount = this.slideTwoForm.value.goalTarget;
    const goalTargetTenor = this.slideThreeForm.value.goalDuration;
    const goalTargetFrequency = this.slideFourForm.value.goalFrequency;

    switch (this.slideFourForm.get('goalFrequency').value) {
      case 'daily':
        durationInDays = 1;
        break;
      case 'weekly':
        durationInDays = 7;
        break;
      case 'monthly':
        durationInDays = 30;
        break;
      default:
        amount = 0;
    }
    NoOfPayments = (goalTargetTenor * 1.0) / durationInDays;
    amount = (goalTargetAmount * 1.0) / Math.floor(NoOfPayments);

    if ( amount % 1 === 0) {
      amount = Math.round(amount);
    }

    return amount;
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
    // const result = await this.getStartTime();
    // console.log(result);
    await this.loaderSrvc.showLoader();
    this.postData.email = this.currentUserEmail;
    this.postData.phoneNumber = this.currentUserPhone;
    this.postData.startDate = this.currentServerTime;
    this.postData.goalName = this.slideOneForm.get('goalName').value;
    this.postData.goalDescription = this.slideOneForm.get('goalDescription').value;
    this.postData.targetamount = this.slideTwoForm.get('goalTarget').value;
    this.postData.tenorInDays = parseInt(this.slideThreeForm.get('goalDuration').value, 10);
    this.postData.frequencyOfSaving = this.slideFourForm.get('goalFrequency').value;
    this.postData.isAutoDebit = this.slideFourForm.get('automateGoal').value;
    this.postData.yieldInterest = this.slideFourForm.get('yieldInterest').value;
    this.postData.staffRefCode = this.slideFourForm.get('staffReference').value;
    this.postData.frequencyAmount = this.freqAmount;
    console.log(this.postData);
    this.savingsSrvc.createGoalSavings(this.postData).subscribe(res => {
      this.loaderSrvc.hideLoader();
      if (res) {
        if (res.resultCode === '200') {
          this.alertSrvc.displaySuccessModal(
            'Goal Successfully created',
            'investments/landing'
          );
        } else if (res.resultCode === '433') {
          this.alertSrvc.showErrorToast(res.message);
        } else if (res.resultCode === '423') {
          this.alertSrvc.showErrorToast(
            'Profile is not yet enabled'
          );
        } else if (res.resultCode === '450') {
          this.alertSrvc.showErrorToast('No BVN RECORD, Kindly Update BVN to continue');
        } else {
          this.alertSrvc.showErrorToast(res.message);
        }
      }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast(
        'Error processing request, please try again later'
      );
    });
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
