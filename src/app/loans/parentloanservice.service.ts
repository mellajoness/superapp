import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/user/profile.service';
import { IUser } from '../models/superApp/IUser';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from '../services/http/http.service';
import { IDashboardInfo } from 'src/app/models/loan/IDashBoardInfo';

@Injectable({
  providedIn: 'root'
})
export class ParentloanserviceService {
  public dashboardData:Observable<IDashboardInfo>;
  private dashboardSubject: BehaviorSubject<IDashboardInfo>;
  loanMenu: object[];
  others: object[];
  userInfo: IUser;
  xx: Observable<any>;

  constructor(
               private router: Router,
              private profileSrvc: ProfileService,
              private httpSrvc: HttpService
  ) 
  { 
    this.dashboardSubject = new BehaviorSubject<IDashboardInfo>(null);
    this.dashboardData = this.dashboardSubject.asObservable();
  }

  updateData(dashboardData:IDashboardInfo){
    this.dashboardSubject.next(dashboardData)
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
   return  this.httpSrvc.digitalLoangetNewUrl(`GetMiniDashboard?phoneNumber=${phoneNumber}`);
  }

  getActivity(phoneNumber) {  
    return  this.httpSrvc.digitalLoangetNewUrl(`GetRecentActivities?Phonenumber=${phoneNumber}`);
   }
 


  getRequestLoan(data) {  
    return  this.httpSrvc.digitalLoanPostNewUrl(`GetEligibilityByAccount`,data);
   }
 
  
   getTopUpOffers(accountNumber) {  
    return  this.httpSrvc.digitalLoangetNewUrl(`TopupOfferByAccount?accountNumber=${accountNumber}`);
   }

  setDashboardDataObservable(xx){
    this.dashboardSubject.next(xx);
   }

}


