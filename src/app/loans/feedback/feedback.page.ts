import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { UserService } from 'src/app/services/user/user.service';
import { IUser } from 'src/app/models/superApp/IUser';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  profile: any = {};
  phoneNumber: any;
  message: any;
  type: any;
  firstName: any;
  lastName: any;
  emailAddress: any;
  errors = [];
  userInfo:any
  constructor(
    private profileSrvc: ProfileService,
    private loanService: LoanService,
    private router: Router,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private loanSrvc: LoanService,
    private userSrvc: UserService,
  ) { 

  }

  ngOnInit() {
    this.phoneNumber = this.profileSrvc.getUserPhone().replace(/^0+/, '234');;
    console.log('my  phone no',this.phoneNumber);
    this.getProfile()
    this.getError()
  }

  goBack(){
    this.router.navigate(['loans']);
  }

  getProfile(){
    this.userInfo = this.profileSrvc.getUserProfileData();
    this.firstName=this.userInfo.firstName,
    this.lastName=this.userInfo.lastName,
    this.emailAddress=this.userInfo.emailAddress
    console.log('f name',this.firstName)
    console.log('f lastname',this.lastName)
    console.log('f email',this.emailAddress)
  }

  getError(){
    this.loanSrvc.getErrorTypes().subscribe(resp => {
      this.errors = resp;
      console.log('my error resp',this.errors)
  }
)}

 postFeedback(){
  if (!this.type) {
    this.alertSrvc.showErrorToast('Select an error type');
    return;
  }

  if (!this.message) {
    this.alertSrvc.showErrorToast('Message field cannot be empty');
    return;
  }
  
  const today = new Date();
    const body = {
      phonenumber: this.phoneNumber,
      email: this.emailAddress,
      type: this.type,
      message: this.message,
      dateCreated: today
    };
    console.log('My body', body);
    this.loaderSrvc.showLoader();
    this.loanSrvc.feedBack(body).subscribe(resp => {
      this.loaderSrvc.hideLoader();
    
      if (resp.responseCode === '00') {
        this.alertSrvc.showErrorToast('Thank you for the feedback. You will be contacted shortly');
        this.router.navigate(['loans']);
      } 
      else {
        this.alertSrvc.showErrorToast(resp.message);
        this.router.navigate(['loans']);
      }
      console.log('feedback', resp);
 })
 err=>{
  this.loaderSrvc.hideLoader();
  this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
}

 }
}