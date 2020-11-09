import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/user/profile.service';
import { IUser } from '../models/superApp/IUser';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from '../services/http/http.service';
import { IDashboardInfo } from 'src/app/models/loan/IDashBoardInfo';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.page.html',
  styleUrls: ['./loans.page.scss'],
  
})
export class LoansPage implements OnInit {
  public dashboardData:Observable<IDashboardInfo>;
  private dashboardSubject: BehaviorSubject<IDashboardInfo>;
  loanMenu: object[];
  others: object[];
  userInfo: IUser;

  constructor(private router: Router,
              private profileSrvc: ProfileService,
              private httpSrvc: HttpService ,
              public menuCtrl: MenuController
              ) 
     
   {    
  
    this.initLoanMenu();
    this.dashboardSubject = new BehaviorSubject<IDashboardInfo>(null);
     this.dashboardData = this.dashboardSubject.asObservable();
  }


  formatPhoneAs234(phoneNumber: string): string{
    let phone: string = phoneNumber;
   if(phoneNumber.startsWith('0')){
     phone = `234${phoneNumber.slice(1)}`;
   }
   else if(phoneNumber.startsWith('+')){
     phone = phoneNumber.slice(1);
   }
   return phone;
  }
 
  getDashBoardData(phoneNumber) {  
   return this.httpSrvc.digitalLoangetNewUrl(`Mobile/GetDashboard?phoneNumber=${phoneNumber}`);
  }

  setDashboardDataObservable(data){
    this.dashboardSubject.next(data);
   }
  

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
    this.userInfo = this.profileSrvc.getUserProfileData();
  }

  initLoanMenu(){
    this.loanMenu = [
      {id: '1', title: 'Dashboard', url: '/loans', icon: '../assets/imgs/loan/home (2).png'},
      {id: '2', title: 'My Loan Offers', url: 'loans/all-loan-offers', icon: '../assets/imgs/loan/Group 19.png'},
      {id: '3', title: 'Loan Topup', url: 'loans/loan-topup', icon: '../assets/imgs/loan/whitebag.png'},
      {id: '4', title: 'Extend Loan', url: 'loans/extendloan', icon: '../assets/imgs/loan/Union.png'},
      {id: '5', title: 'Pay Loan', url: 'loans/payloan', icon: '../assets/imgs/loan/Union (1).png'},
      {id: '6', title: 'Check Balance', url: 'loans/checkbalance', icon: '../assets/imgs/loan/Rectangle 3.png'},
      {id: '7', title: 'History', url: 'loans/loanhistory', icon: '../assets/imgs/loan/history-clock-button.png'},
      // {id: '8', title: 'Profile', url: '/profile', icon: '../assets/imgs/loan/user.png'}
    ];
  
    this.others = [
      {id: '1', title: 'Disclaimer', url: '/disclaimer', icon: '../assets/img/home (2).png'},
      {id: '2', title: 'Terms and Conditions', url: 'loan-terms-conditions', icon: '../assets/img/user.png'},
      {id: '3', title: 'Feedback', url: '/feedback', icon: '../assets/img/user.png'},
    ];
  }

  // openMenuItem(url: string){
  //   this.router.navigate([url]);
  // }
  
  

  openTermsAndConditions(){
    this.router.navigate(['loans/loan-terms-conditions']);
  }

  openDisclaimer(){
    this.router.navigate(['loans/disclaimer']);
  }

  openfeedback(){
    this.router.navigate(['loans/feedback']);
  }


}
