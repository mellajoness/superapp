import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { ProfileService } from '../user/profile.service';
import { ModalController } from '@ionic/angular';
import { GoalDueComponent } from '../../components/goal-due/goal-due.component';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  userPhone: string;

  constructor(
    private userSrvc: UserService,
    private httpSrvc: HttpService,
    private profileSrvc: ProfileService,
    private modalCtrl: ModalController
  ) { }

  getAllTenors() {
    // return this.httpSrvc.diginvestpost(`/GetAllTenors`, null);
    return this.httpSrvc.diginvestpost(`TDAccount/GetAllTenors`, null);
  }

  calculateFDYield(data) {
    // return this.httpSrvc.diginvestpost(`/CalculateFDYield`, data);
    return this.httpSrvc.diginvestpost(`TDAccount/CalculateFDYield`, data);
  }

  getRateByTenor(data) {
    // return this.httpSrvc.diginvestpost(`/GetInterestRates`, data);
    return this.httpSrvc.diginvestpost(`TDAccount/GetInterestRates`, data);
  }

  createFD(data) {
    // return this.httpSrvc.investpost(`/TDAccount/CreateTDAccount`, data);
    return this.httpSrvc.investpost(`TDAccount/CreateTDAccount`, data);
  }

  getSumValueOfInvestments(data) {
    // return this.httpSrvc.investget(`UserAccounts/GetSumValueOfInvestments?PhoneNumber=${data}`);
    return this.httpSrvc.investget(`UserAccounts/GetSumValueOfInvestments?PhoneOrCif=${data}&IsCustomer=false`);
  }

  getAllActiveFD(finaclePhone) {
    // return this.httpSrvc.investpost(`/TDAccount/GetAllActiveFDByPhone?PhoneNumber=${finaclePhone}`, null);
    return this.httpSrvc.investpost(`TDAccount/GetAllActiveFDByPhone?PhoneNumber=${finaclePhone}`, null);
  }

  liquidateFD(data) {
    // return this.httpSrvc.investpost(`/TDAccount/TDAccountLiquidation`, data);
    return this.httpSrvc.investpost(`TDAccount/TDAccountLiquidation`, data);
  }

  getInvestmentAmountLimit() {
    // return this.httpSrvc.diginvestget(`/InvestmentAmountLimits`);
    return this.httpSrvc.diginvestget(`TDAccount/InvestmentAmountLimits`);
  }
}
