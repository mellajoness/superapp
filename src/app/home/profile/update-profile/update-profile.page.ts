import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/user/profile.service';
import { LoaderService } from '../../../services/utilities/loader.service';
import { AlertService } from '../../../services/utilities/alert.service';
import { IUser } from 'src/app/models/superApp/IUser';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.page.html',
  styleUrls: ['./update-profile.page.scss', '../../../../theme/payments.scss'],
})
export class UpdateProfilePage implements OnInit {

  userData: IUser;
  Gender: any = ['Male', 'Female', 'Others'];
  Relationship: any = ['Father', 'Mother', 'Spouse', 'Brother', 'Sister', 'Relative', 'Friend'];

  postData = {
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
    phoneNumber: '',
    emailAddress: '',
    contactAddress: '',
};

  formone: FormGroup;

  userSub$: Subscription;
  // currentUser;

  constructor(
    private formBildr: FormBuilder,
    private userSrvc: UserService,
    private router: Router,
    public profileSrvc: ProfileService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
  ) { }

  ngOnInit() {
    // this.userSrvc.currentUserProfile.subscribe( res => console.log(res));
    this.buildFormOne();
  }

  ionViewWillEnter() {
    this.userSub$ =  this.profileSrvc.userProfileData.subscribe(res => this.userData = res);
    console.log(this.userData);
  }

  changeGender(e) {
    this.formone.controls.gender.setValue(e.target.value, {
      onlySelf: true
    });
  }

  buildFormOne() {
    this.formone = this.formBildr.group({
      firstName: new FormControl({value: '', disabled: true}, Validators.required),
      lastName:  new FormControl({value: '', disabled: true}, Validators.required),
      dob:  ['', Validators.required],
      gender:  ['', Validators.required],
      phoneNumber:  new FormControl({value: '', disabled: true}, Validators.required),
      emailAddress: new FormControl({value: '', disabled: true}, Validators.required),
      address: ['', [Validators.required]],
    });
  }

  combineFormsForSubmission() {
    this.postData.firstName = this.userData.firstName;
    this.postData.lastName = this.userData.lastName;
    this.postData.dob = this.formone.value.dob;
    this.postData.gender = this.formone.value.gender;
    this.postData.phoneNumber = this.userData.phoneNumber;
    this.postData.emailAddress = this.userData.emailAddress;
    this.postData.contactAddress = this.formone.value.address;
  }

  submitAction() {
    this.loaderSrvc.showLoader();
    this.combineFormsForSubmission();
    this.profileSrvc.updateProfile(this.postData).subscribe((res: any) => {
     if (res) {
       this.loaderSrvc.hideLoader();
       if (res.resultCode === '200') {
        console.log('Success ' , res);
        this.alertSrvc.displayProfileSuccessModal('Profile successfully updated', '/home/profile');
      } else {
        this.alertSrvc.showErrorToast(res.message);
      }
     }
    }, (err) => { 
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing request, please try again.');
    });
  }

  get allowNext() {
    if (
      this.formone.value.dob !== '' &&
      this.formone.value.gender !== '' &&
      this.formone.value.address !== ''
      ) {
      return true;
    } else {
      return false;
    }
  }

}
