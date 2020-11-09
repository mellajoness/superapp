import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Constants } from '../../config/constants';
import { HttpService } from '../http/http.service';
import { LoaderService } from '../utilities/loader.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<any[]>;
  private currentUserProfileSubject: BehaviorSubject<any[]>;
  public currentUserData: Observable<any>;
  public currentUserProfile: Observable<any>;

  constructor(
    private storageSrvc: StorageService,
    private httpSrvc: HttpService,
    private loadingSrvc: LoaderService
  ) {
    const userData = storageSrvc.get(Constants.USERDATA).then(res => {
      this.currentUserSubject = new BehaviorSubject<any>(res);
      this.currentUserData = this.currentUserSubject.asObservable();
      // console.log(this.currentUserData);
    });
    const userProfile = storageSrvc.get(Constants.USERPROFILE).then(res => {
      this.currentUserProfileSubject = new BehaviorSubject<any>(res);
      this.currentUserProfile = this.currentUserProfileSubject.asObservable();
      // console.log(this.currentUserProfile);
    });
  }

  public get currentUserValue() {
    return this.currentUserSubject.value;
  }

  clearUserData() {
    this.currentUserSubject.next([]);
  }

  getUserProfileData(phonenumber: string) {
    return this.httpSrvc.get(`GetUserProfileByPhone?PhoneNumber=${phonenumber}`);
    // return this.httpSrvc.get(`UserProfile/GetUserProfileByPhone?PhoneNumber=${phonenumber}`);
  }

  getCurrentServerTime() {
    return this.httpSrvc.investget(`Helpers/GetServerCurrentTime`);
  }

  setUserProfileData(data) {
    if (data) {
      this.currentUserProfileSubject.next(data);
      this.storageSrvc.store(Constants.USERPROFILE, data);
    }
  }

  storeToken(data) {
    if (data) {
      this.storageSrvc.store(Constants.TOKEN, data);
    }
  }

  verifyOTP(otp, phonenumber) {
    return this.httpSrvc.post(`EnableUserAccountCreation?OTP=${otp}&phoneNumber=${phonenumber}`, null);
    // return this.httpSrvc.post(`UserProfile/EnableUserAccountCreation?OTP=${otp}&phoneNumber=${phonenumber}`, null);
  }

  createTransactionPIN(data) {
    return this.httpSrvc.post(`CreateTransactionPIN`, data);
    // return this.httpSrvc.post(`UserProfile/CreateTransactionPIN`, data);
  }

  generateTokenForTranPinReset(phonenumber) {
    return this.httpSrvc.post(`GenerateTokenForTranPinReset?PhoneNumber=${phonenumber}`, null);
    // return this.httpSrvc.post(`UserProfile/GenerateTokenForTranPinReset?PhoneNumber=${phonenumber}`, null);
  }

  generateTokenForPasswordReset(email, phone) {
    return this.httpSrvc.get(`GetTokenForPasswordResetViaEmail?Email=${email}&phonenumber=${phone}`);
    // return this.httpSrvc.get(`UserProfile/GetTokenForPasswordResetViaEmail?Email=${email}&phonenumber=${phone}`);
  }

  resetTransPin(data) {
    return this.httpSrvc.post(`TranPinReset`, data);
    // return this.httpSrvc.post(`UserProfile/TranPinReset`, data);
  }

  resetPassword(data) {
    return this.httpSrvc.post(`PasswordReset`, data);
    // return this.httpSrvc.post(`UserProfile/PasswordReset`, data);
  }

  changePassword(data) {
    return this.httpSrvc.post(`LoggedInChangePassword`, data);
    // return this.httpSrvc.post(`UserProfile/LoggedInChangePassword`, data);
  }

  getAllAccounts(phoneNumber) {
    return this.httpSrvc.investpost(`UserAccounts/GetAllFinacleAccountsByPhone?phonenumber=${phoneNumber}`, null);
  }

  getAllPayment() {
    return this.httpSrvc.investget(`Helpers/GetAllPaymentInstrumentTypes`);
  }

  fundGoalAccount(data) {
    return this.httpSrvc.investpost(`InvestSavings/FundGoalAccountTransPIN`, data);
  }

  getSecretQuestionsList() {
    return this.httpSrvc.get(`GetSecretQuestionList`);
    // return this.httpSrvc.get(`UserProfile/GetSecretQuestionList`);
  }

  addUserSecretQuestionAndAnswer(data) {
    return this.httpSrvc.post(`AddUserSecretQuestionAndAnswer`, data);
    // return this.httpSrvc.post(`UserProfile/AddUserSecretQuestionAndAnswer`, data);
  }

  addUserSecretQuestionAndAnswerNoAuth(data) {
    return this.httpSrvc.post(`AddUserSecretQuestionAndAnswerNoAuth`, data);
    // return this.httpSrvc.post(`UserProfile/AddUserSecretQuestionAndAnswerNoAuth`, data);
  }

  updateUserSecretQuestionAndAnswer(data) {
    return this.httpSrvc.post(`UpdateUserSecretQuestionAndAnswer`, data);
    // return this.httpSrvc.post(`UserProfile/UpdateUserSecretQuestionAndAnswer`, data);
  }

  generateOTPToUpdateSecretQuestion(phonemail) {
    return this.httpSrvc.get(`GenerateOTPToUpdateSecretQuestion?phonemail=${phonemail}`);
    // return this.httpSrvc.get(`UserProfile/GenerateOTPToUpdateSecretQuestion?phonemail=${phonemail}`);
  }

  checkFirstTwoSecretAnswers(data) {
    return this.httpSrvc.post(`CheckFirstTwoSecretAnswers`, data);
    // return this.httpSrvc.post(`UserProfile/CheckFirstTwoSecretAnswers`, data);
  }

  checkLastSecretAnswer(data) {
    return this.httpSrvc.post(`CheckLastSecretAnswer`, data);
    // return this.httpSrvc.post(`UserProfile/CheckLastSecretAnswer`, data);
  }


}
