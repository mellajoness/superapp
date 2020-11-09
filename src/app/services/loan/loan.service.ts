import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from '../http/http.service';
import { IDashboardInfo } from 'src/app/models/loan/IDashBoardInfo';

@Injectable({
  providedIn: 'root'
})
export class LoanService {  

 public dashboardData:Observable<IDashboardInfo>;
 private dashboardSubject: BehaviorSubject<IDashboardInfo>;

 constructor(private httpSrvc: HttpService) { 
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
  // return this.httpSrvc.digitalLoangetNewUrl(`Mobile/GetDashboard?phoneNumber=${phoneNumber}`);
  return this.httpSrvc.digitalLoangetNewUrl(`GetDashboard?phoneNumber=${phoneNumber}`);
 }

 getLoanBalanceData(customerId, phoneNumber) {  
  return this.httpSrvc.digitalLoangetNewUrl(`LoanBalance?custId=${customerId}&Phonenumber=${phoneNumber}`);
 }

 getLoanExtension(data) {  
  return this.httpSrvc.digitalLoanPostNewUrl(`Extension`,data);
 }



 migoLoanExtension() {  
  return this.httpSrvc.digitalLoangetNewUrl(`MinesMobile/api/v1/get-loan-extensions`);
 }

//  paydayLoanExtension(data) {  
//   return this.httpSrvc.digitalLoanPostNewUrl(`api/Eligibility/ExtensionByType`,data);
//  }

 acceptPaydayLoanExtension(data) {  
  return this.httpSrvc.digitalLoanPostNewUrl(`Extend`,data);
 }

 rejectPaydayLoanExtension(data) {  
  return this.httpSrvc.digitalLoanPostNewUrl(`Rejection`,data);
 }

 getMigo(phoneNumber){
  return this.httpSrvc.digitalLoangetMigo(`api/v1/get-offers2/${phoneNumber}`);
 }

 selectMigoLoan(data) {  
  return this.httpSrvc.digitalLoanPostMigo(`api/v1/select-loan-offer`,data);
 }

 submitMigoNewAccount(data) {  
  return this.httpSrvc.digitalLoanPostMigo(`api/v1/add-bank-account`,data);
 }

 getMigoPaymentCard(){
  return this.httpSrvc.digitalLoangetMigo(`api/v1/get-bank-accounts`);
 }

 getMigoBank(){
  return this.httpSrvc.digitalLoangetMigo(`api/v1/get-banks`);
 }

 getFidelityMigoBank(){
  return this.httpSrvc.digitalLoangetMigo(`api/v1/get-fidelity-accounts`);
 }

 getCardsMigoBank(){
  return this.httpSrvc.digitalLoangetMigo(`api/v1/get-payment-cards`);
 }

 addCardsMigo(){
  return this.httpSrvc.digitalLoangetMigo(`api/v1/get-cards-registration-link`);
 }

 getGraph(customerId,phoneNumber){
  return this.httpSrvc.digitalLoangetNewUrl(`OpenLoanGraph?custId=${customerId}&Phonenumber=${phoneNumber}`);
 }

 getHistory(customerId,phoneNumber){
  return this.httpSrvc.digitalLoangetNewUrl(`GetAllLoanHistory?custId=${customerId}&Phonenumber=${phoneNumber}`);
 }

 getErrorTypes(){
  return this.httpSrvc.digitalLoangetNewUrl(`getTypes`);
 }

 feedBack(data){
  return this.httpSrvc.digitalLoanPostNewUrl(`setFeedback`,data);
 }
//  migoLoanExtension() { 
//   return this.httpSrvc.digitalLoanPostExtension(`MinesMobile/api/v1/get-loan-extensions`)
//  }
 
 setDashboardDataObservable(data){
  this.dashboardSubject.next(data);
 }


  payLoan(data){
  return this.httpSrvc.digitalLoanPostNewUrl(`Crash`,data);
  }

}
