import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileService } from '../../../services/user/profile.service';
import { LoaderService } from '../../../services/utilities/loader.service';
import { AlertService } from '../../../services/utilities/alert.service';
import { IUser } from 'src/app/models/superApp/IUser';


@Component({
  selector: 'app-nextofkin',
  templateUrl: './nextofkin.page.html',
  styleUrls: ['./nextofkin.page.scss', '../../../../theme/payments.scss'],
})
export class NextofkinPage implements OnInit {
  Relationship: any = ['Father', 'Mother', 'Spouse', 'Brother', 'Sister', 'Relative', 'Friend'];

  postData = {
    nokFullName: '',
    nokRelationship: '',
    nokEmailAddress: '',
    nokPhone: ''
  };

  formone: FormGroup;

  userSub$: Subscription;
  userData: any;

  constructor(
    private userSrvc: UserService,
    private router: Router,
    public profileSrvc: ProfileService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private formBildr: FormBuilder,
  ) { }

  ngOnInit() {
    this.buildFormTwo();
  }

  ionViewWillEnter() {
    this.userSub$ =  this.profileSrvc.userProfileData.subscribe(res => this.userData = res);
    console.log(this.userData);
  }

  buildFormTwo() {
    this.formone = this.formBildr.group({
      nokName: [''],
      nokRelationship:  [''],
      nokPhone:  [''],
      nokEmail: [''],
    });
  }

  changeRelationship(e) {
    this.formone.controls.nokRelationship.setValue(e.target.value, {
      onlySelf: true
    });
  }

  submitAction() {
    this.loaderSrvc.showLoader();
    this.postData.nokFullName = this.formone.value.nokName;
    this.postData.nokRelationship = this.formone.value.nokRelationship;
    this.postData.nokPhone = this.formone.value.nokPhone;
    this.postData.nokEmailAddress = this.formone.value.nokEmail;
    this.profileSrvc.updateNOK(this.postData).subscribe((res: any) => {
      if (res) {
        this.loaderSrvc.hideLoader();
        if (res.resultCode === '200') {
         console.log('Success ' , res);
         this.alertSrvc.displayProfileSuccessModal('Next of Kin Details successfully updated', '/home/profile');
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
      this.formone.value.nokName !== '' &&
      this.formone.value.nokRelationship !== '' &&
      this.formone.value.nokPhone) {
      return true;
    } else {
      return false;
    }
  }

}
