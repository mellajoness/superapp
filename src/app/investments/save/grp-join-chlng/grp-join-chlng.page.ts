import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-grp-join-chlng',
  templateUrl: './grp-join-chlng.page.html',
  styleUrls: ['./grp-join-chlng.page.scss'],
})
export class GrpJoinChlngPage implements OnInit {
  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };

  frequencyAmountData = {
    targetAmount: 0,
    frequencyInterval: 0,
    tenorInDays: 0
  };

  postData = {
    GroupSavingsCode: '',
    IsAutoDebit: true,
    YieldInterest: true,
    FrequencyOfSaving: '',
    FrequencyAmount: 0,
    PhoneNumber: '',
    Email: ''
  };


  groupCode;
  groupPlan;

  slideOneForm = new FormGroup({
    groupCode: new FormControl('', [Validators.required, Validators.maxLength(8)]),
  });

  slideThreeForm = new FormGroup({
    groupFrequency: new FormControl('monthly', Validators.required),
    staffReference: new FormControl(''),
    automateGoal: new FormControl(true),
    yieldInterest: new FormControl(true),
  });

  isAutoDebit = true;
  isYieldInterest;
  freqAmount: any;
  currentUserEmail: string;
  currentUserPhone: string;


  constructor(
    private savingsSrvc: SavingsService,
    private loaderSrvc: LoaderService,
    private profileSrvc: ProfileService,
    private alertSrvc: AlertService,

  ) { }

  ngOnInit() {
    this.currentUserEmail = this.profileSrvc.getUserEmail();
    this.currentUserPhone = this.profileSrvc.getUserPhone();
  }

  slideToNext() {
    this.slides.slideNext();
  }

  previousSlide() {
    this.slides.slidePrev();
  }

  toggleYieldInterest(e) {
    this.isYieldInterest = !this.isYieldInterest;
  }

  toggleAutoDebit(e) {
    this.isAutoDebit = !this.isAutoDebit;
  }

  get tenorTypeString(): string {
    let tenorType: string;
    switch (this.slideThreeForm.get('groupFrequency').value) {
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

  getFreqAmount() {
    this.frequencyAmountData.tenorInDays = parseInt(this.groupPlan.tenorInDays, 10);
    this.frequencyAmountData.frequencyInterval =  this.slideThreeForm.get('groupFrequency').value;
    this.frequencyAmountData.targetAmount = this.groupPlan.targetAmount;
    this.slides.slideNext();
    this.savingsSrvc.getFrequencyAmount(this.frequencyAmountData).subscribe(res => {
      this.freqAmount = res;
    });
  }

  get displayFrequency() {
    const frequency = this.slideThreeForm.get('groupFrequency').value;
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
  }

  getGroupDetailsByCode() {
    this.groupCode = this.slideOneForm.value.groupCode;
    this.loaderSrvc.showLoader();
    this.savingsSrvc.getGroupDetailsByCode(this.groupCode).subscribe(res => {
      this.loaderSrvc.hideLoader();
      this.groupPlan = res;
      this.slideToNext();
      console.log(res);
    }, err => {
      this.loaderSrvc.hideLoader();
    });
  }

  joinChallenge() {
    this.loaderSrvc.showLoader();
    this.postData.Email = this.currentUserEmail;
    this.postData.PhoneNumber = this.currentUserPhone;
    this.postData.FrequencyAmount = this.freqAmount;
    this.postData.FrequencyOfSaving = this.slideThreeForm.value.groupFrequency;
    this.postData.GroupSavingsCode = this.groupPlan.groupSavingCode;
    this.postData.IsAutoDebit = this.slideThreeForm.get('automateGoal').value;
    this.postData.YieldInterest =  this.slideThreeForm.get('yieldInterest').value;
    this.savingsSrvc.joinGroupByCode(this.postData).subscribe(res => {
      this.loaderSrvc.hideLoader();
      console.log(res);
      if (res.resultCode === '200') {
        this.alertSrvc.displaySuccessModal(
          `Successfully Joined ${this.groupPlan.groupName}`,
          'investments/landing'
        );
      } else {
        this.alertSrvc.showErrorToast(res.message);
      }
    }, err => this.loaderSrvc.hideLoader());
  }

  titleCase(name) {
    if(name) {
      let name_ = name[0].toUpperCase() + name.substring(1)
      return name_
    } else {
      return name
    }
  }

  // groupId: 7

}
