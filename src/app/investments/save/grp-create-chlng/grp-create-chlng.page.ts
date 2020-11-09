import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SavingsService } from 'src/app/services/investment/savings.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { UserService } from 'src/app/services/user/user.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-grp-create-chlng',
  templateUrl: './grp-create-chlng.page.html',
  styleUrls: ['./grp-create-chlng.page.scss'],
})
export class GrpCreateChlngPage implements OnInit {
  @ViewChild('slide',  {static: false}) slides: IonSlides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    allowTouchMove: false
  };
  paramData = {
    groupCode: '',
    groupName: '',
  };

  // ["GROUPPROJECT", "GROUPCHALLENGE"]

  postData = {
    groupName: '',
    groupDescription: '',
    phoneNumber: '',
    groupSavingsType: 'GROUPCHALLENGE',
    email: '',
    targetAmount: 0,
    frequencyOfSaving: '',
    isAutoDebit: true,
    yieldInterest: true,
    startDate: '',
    tenorDays: 0,
    frequencyAmount: 0,
    maxCountOfGroupMembers: 0,
    staffRefCode: ''
  };

  frequencyAmountData = {
    targetAmount: 0,
    frequencyInterval: 0,
    tenorInDays: 0
  };

  freqAmount;
  interestRate;
  groupMembers = 10;

  currentUserEmail: string;
  currentUserPhone: string;
  currentServerTime: string;

  isAutoDebit = true;
  isYieldInterest;

  slideOneForm = new FormGroup({
    groupName: new FormControl('', Validators.required),
    groupDescription: new FormControl('',  Validators.required),
  });

  slideTwoForm = new FormGroup({
    groupTarget: new FormControl('',  [Validators.required, Validators.min(20000)]),
    noOfgroupMembers: new FormControl('',  [Validators.required, Validators.min(1), Validators.max(50)]),
  });

  slideThreeForm = new FormGroup({
    groupDuration: new FormControl('', Validators.required),
  });

  slideFourForm = new FormGroup({
    groupFrequency: new FormControl('monthly', Validators.required),
    staffReference: new FormControl(''),
    automateGoal: new FormControl(true),
    yieldInterest: new FormControl(true),
  });

  str = 'GroupSavings [Lamborghini funds]-[GROUPCHALLENGE] was successfully created. Group code is KX7R2M2A';


  constructor(
    private savingsSrvc: SavingsService,
    private profileSrvc: ProfileService,
    private userSrvc: UserService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private router: Router
  ) { }

  ngOnInit() {
    this.currentUserEmail = this.profileSrvc.getUserEmail();
    this.currentUserPhone = this.profileSrvc.getUserPhone();

    this.savingsSrvc.currentGoalsRateObs.subscribe(res => {
      this.interestRate = res;
    });

    this.extractGroupCode(this.str);
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

  getFreqAmount() {
    this.frequencyAmountData.tenorInDays = parseInt(this.slideThreeForm.get('groupDuration').value, 10);
    this.frequencyAmountData.frequencyInterval =  this.slideFourForm.get('groupFrequency').value;
    this.frequencyAmountData.targetAmount = this.slideTwoForm.get('groupTarget').value;
    this.slides.slideNext();
    this.savingsSrvc.getFrequencyAmount(this.frequencyAmountData).subscribe(res => {
      this.freqAmount = res;
    });
  }

  get tenorTypeString(): string {
    let tenorType: string;
    switch (this.slideFourForm.get('groupFrequency').value) {
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
    const frequency = this.slideFourForm.get('groupFrequency').value;
    return frequency.charAt(0).toUpperCase() + frequency.slice(1);
  }

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


  async submitAction() {
    await this.getStartTime();
    // await this.loaderSrvc.showLoader();
    this.postData.email = this.currentUserEmail;
    this.postData.phoneNumber = this.currentUserPhone;
    this.postData.startDate = this.currentServerTime;
    this.postData.groupName = this.slideOneForm.get('groupName').value;
    this.postData.groupDescription = this.slideOneForm.get('groupDescription').value;
    this.postData.targetAmount = this.slideTwoForm.get('groupTarget').value;
    this.postData.maxCountOfGroupMembers = this.slideTwoForm.get('noOfgroupMembers').value;
    this.postData.tenorDays = parseInt(this.slideThreeForm.get('groupDuration').value, 10);
    this.postData.frequencyOfSaving = this.slideFourForm.get('groupFrequency').value;
    this.postData.isAutoDebit = this.slideFourForm.get('automateGoal').value;
    this.postData.yieldInterest = this.slideFourForm.get('yieldInterest').value;
    this.postData.staffRefCode = this.slideFourForm.get('staffReference').value;
    this.postData.frequencyAmount = this.freqAmount;
    console.log(this.postData);
    this.openSharePage();
    this.savingsSrvc.createGroupSavings(this.postData).subscribe(res => {
      this.loaderSrvc.hideLoader();
      if (res) {
        if (res.resultCode === '200') {
          // this.alertSrvc.displaySuccessModal(
          //   'Group Challenge Successfully created',
          //   'investments/landing'
          // );
          this.extractGroupCode(res.message);
          this.paramData.groupName = this.postData.groupName;
          console.log(this.paramData);
          this.openSharePage();
        } else if (res.resultCode === '433') {
          this.alertSrvc.showErrorToast(
            'Error processing request, please try again later'
          );
        } else if (res.resultCode === '423') {
          this.alertSrvc.showErrorToast(
            'Profile is not yet enabled'
          );
        } else if (res.resultCode === '450') {
          this.alertSrvc.showErrorToast('No BVN RECORD, Kindly Update BVN to continue');
         } else {
          console.log('Network connection error');
        }
      }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast(
        'Error processing request, please try again later'
      );
    });
  }

  extractGroupCode(str: string) {
    const splitStr = str.split(' ');
    const groupCode = splitStr[splitStr.length - 1];
    // console.log(splitStr[splitStr.length - 1]);
    this.paramData.groupCode = groupCode;
  }

  openSharePage() {
    const navigationExtras: NavigationExtras = {
      state: {
        data: this.paramData
      },
    };
    this.router.navigate(
      ['/', 'investments', 'save', 'grp-create-chlng', 'success'],
      navigationExtras
    );
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
