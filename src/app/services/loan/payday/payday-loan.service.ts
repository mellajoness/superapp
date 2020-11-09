import { Injectable } from '@angular/core';
import { HttpService } from '../../http/http.service';
import {ProfileService} from '../../../services/user/profile.service'
@Injectable({
  providedIn: 'root'
})
export class PaydayLoanService {
  phoneNumber: any;
  constructor(private httpSrvc: HttpService,
              private profileSrvc: ProfileService
              
    ) { 
      this.phoneNumber = this.profileSrvc.getUserPhone();

  }
  
  doPaydayLoanTopUpEligibilityCheck(data) {
    return this.httpSrvc.digitalLoanPostNewUrl('TopupCCByType', data);
  }

  getPaydayLoanEligibilityByLoanType(data) {
    return this.httpSrvc.digitalLoanPostNewUrl('GetEligibilityByLoanType', data);
  }

  calculatePaydayLoanRepayment(data) {
    return this.httpSrvc.digitalLoanPostNewUrl('RepaymentCalculator', data); 
  }

  disbursePaydayLoan(data) {
    return this.httpSrvc.digitalLoanPostNewUrl('Disburse', data); 
  }


  disburseLaptopLoan(data) {
    return this.httpSrvc.digitalLoanPostNewUrl('DisburseLaptopLoan', data); 
  }

  sendLoanRejectionFeedback(data) {
    return this.httpSrvc.digitalLoanPostNewUrl('Rejection', data); 
  }
  
  
}
