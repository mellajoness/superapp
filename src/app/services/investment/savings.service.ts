import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { UserService } from '../user/user.service';
import { ProfileService } from '../user/profile.service';
import { ModalController } from '@ionic/angular';
import { GoalDueComponent } from '../../components/goal-due/goal-due.component';
import { BehaviorSubject, Observable } from 'rxjs';
import { LiquidateGoalComponent } from 'src/app/components/liquidate-goal/liquidate-goal.component';
import { TopUpComponent } from 'src/app/components/top-up/top-up.component';

@Injectable({
  providedIn: 'root'
})
export class SavingsService {
  private currentGoalsRate: BehaviorSubject<any[]> = new BehaviorSubject<any>('');
  private currentGroupRate: BehaviorSubject<any[]> = new BehaviorSubject<any>('');
  public currentGoalsRateObs: Observable<any>;
  public currentGroupRateObs: Observable<any>;

  private currentTSBoundaries: BehaviorSubject<any[]> = new BehaviorSubject<any>('');
  public currentTSBoundariesObs: Observable<any>;

  userPhone: string;

  constructor(
    private userSrvc: UserService,
    private httpSrvc: HttpService,
    private profileSrvc: ProfileService,
    private modalCtrl: ModalController
  ) {
    this.profileSrvc.userPhoneData.subscribe(res => {
      this.userPhone = res;
    });

    this.currentGoalsRateObs = this.currentGoalsRate.asObservable();
    this.currentGroupRateObs = this.currentGroupRate.asObservable();
    this.currentTSBoundariesObs = this.currentTSBoundaries.asObservable();
  }

  updateGoalRateValue(value) {
    this.currentGoalsRate.next(value);
  }

  updateCurrentTsBoundaries(value) {
    this.currentTSBoundaries.next(value);
  }

  updateGroupRateValue(value) {
    this.currentGroupRate.next(value);
  }

  createGoalSavings(data) {
    return this.httpSrvc.investpost(`InvestSavings/CreateGoalAccount`, data);
  }

  createGroupSavings(data) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/CreateGroupSavingsAccount`, data);
  }

  joinGroupByCode(data) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/UserJoinByGroupCode`, data);
  }

  getAllGoalAccountsByPhone() {
    return this.httpSrvc.investpost(`UserAccounts/GetAllGoalsAccountsByPhone?phonenumber=${this.userPhone}`, null);
  }

  getAllCombinedSavingsAccByPhone() {
    const data = { PhoneOrCif: this.userPhone,IsCustomer: true };
    return this.httpSrvc.investpost(`UserAccounts/GetAllCombinedSavingsAccountsByPhone?phonenumber=${this.userPhone}`, data);
    // return this.httpSrvc.investpost(`UserAccounts/GetAllCombinedSavingsAccountsByPhone?phonenumber=${this.userPhone}`, null);
  }

  getGroupDetailsByCode(groupCode) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/GetGroupDetailByGroupCode?GroupCode=${groupCode}`, null);
  }

  getGroupDetailsById(groupId) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/GetGroupDetailById?GroupId=${groupId}`, null);
  }

  getAllGroupMembersById(groupId) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/GetAllGroupMembersByGroupId?GroupId=${groupId}`, null);
  }

  checkIfUserIsGroupAdmin(groupId){
    return this.httpSrvc.
    investpost(`InvestSavingsGroup/IsUserGroupAdmin?PhoneNumber=${this.userPhone}&GroupId=${groupId}`, null);
  }

  getMaxWithdrawalOnGoal(goalId) {
    return this.httpSrvc.investpost(`UserAccounts/GetMaxWithdrawalAmountOnGoal?PhoneNumber=${this.userPhone}&GoalId=${goalId}`, null);
  }

  getMaxWithdrawalOnGroup(goalId) {
    return this.httpSrvc.
    investpost(`InvestSavingsGroup/GetMaxWithdrawalAmountOnGroupAccount?PhoneNumber=${this.userPhone}&GroupId=${goalId}`, null);
  }

  getGoalsTransactionHistory(id) {
    return this.httpSrvc.investpost(`InvestSavings/GetGoalsTransactionHistory?phonenumber=${this.userPhone}&GoalId=${id}`, null);
  }

  getGroupChallengeTransactionHistory(id) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/GetGroupTransactionHistory?GroupId=${id}`, null);
  }

  getIndividualGroupChallengeTransactionHistory(id) {
    return this.httpSrvc.investpost(
      `InvestSavingsGroup/GetGroupMatrixMemberTransactionHistory?phonenumber=${this.userPhone}&GroupId=${id}`, null);
  }

  deleteUnfundedGoal(id) {
    return this.httpSrvc.investpost(`InvestSavings/DeleteUnfundedGoal?phonenumber=${this.userPhone}&GoalId=${id}`, null);
  }

  deleteUnfundedGroup(id) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/DeleteGroupAccount?phonenumber=${this.userPhone}&GroupId=${id}`, null);
  }

  memberOptOutGroup(id) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/MemberOptOutGroupAccount?phonenumber=${this.userPhone}&GroupId=${id}`, null);
  }

  getTargetSavingsBoundaries() {
    return this.httpSrvc.investget(`Helpers/GetTargetSavingsBoudaries`);
  }

  getAllGroupSavingsType() {
    return this.httpSrvc.investget(`Helpers/GetAllGroupSavingTypes`);
  }

  checkForDueDate() {
    if (this.userPhone) {
      // return this.httpSrvc.investpost(`UserAccounts/GetAllGoalsNearDueDate?phonenumber=${this.userPhone}`, null);
      return this.httpSrvc.investpost(`UserAccounts/GetAllGoalsNearDueDate?PhoneOrCif=${this.userPhone}&IsCustomer=false`, null);
    }
  }

  getFrequencyAmount(data) {
    return this.httpSrvc.investpost(`Helpers/CalculateFrequencyAmount`, data);
  }

  getTargetSavingsRate() {
    return this.httpSrvc.investget(`Helpers/GetTargetSavingsRates`);
  }

  withdrawGoalAccount(data) {
    return this.httpSrvc.investpost(`InvestSavings/WithdrawFromGoalAccount`, data);
  }

  withdrawGroupAccount(data) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/WithdrawFromGroupAccount`, data);
  }

  async displayGoalDueModal() {
    const modal = await this.modalCtrl.create({
      component: GoalDueComponent,
      backdropDismiss: false,
      cssClass: 'goalDueModal',
    });

    return await modal.present();
  }

  fundGoalAccount(data) {
    return this.httpSrvc.investpost(`InvestSavings/FundGoalAccountTransPIN`, data);
  }

  fundGroupAccount(data) {
    return this.httpSrvc.investpost(`InvestSavingsGroup/FundGroupAccountTransPIN`, data);
  }

}
