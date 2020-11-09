import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Handlers } from 'src/app/shared/handlers';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class BillspaymentsService {

  feature;

  constructor(
    public handlers: Handlers,
    public http: HttpClient,
    private httpService: HttpService,
  ) { 
    this.feature = 'transfers';
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
      // this.handlers.showErrors(error.error, "Error")
      // this.displayServices.removeLoader();
    }
    // return an observable with a user-facing error message
    return throwError(error);
  }

  GetAllUserAccounts(postData: any): Observable<any> {
    const phone = this.handlers.formatFinacleNumber(postData);
    return this.httpService.investpost('UserAccounts/GetAllFinacleAccountsByPhone?phonenumber=' + phone, null);
  }

  GetAllUserAccountsByBVN(postData: any): Observable<any> {
    return this.httpService.investpost('UserAccounts/GetAllFinacleAccountsByBVN?BVN='+postData, null);
  }

  UpdateBvn(postData) {
    // return this.httpService.get(`UserProfile/BvnUpdateByPhone?Phonenumber=${postData.phoneNo}&BvNumber=${postData.bvn}`);
    return this.httpService.get(`BvnUpdateByPhone?Phonenumber=${postData.phoneNo}&BvNumber=${postData.bvn}`);
  }

  GetAllBillers(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getAllBillers; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  GetBillersByCategory(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getBillersByCategory; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  ValidateMeterNumber(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().validateMeterNumber; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  ValidateSmartCardNumber(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().validateSmartCardNumber; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  GetSmartCardNumberPlans(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getSmartCardNumberPlans; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  GetInternetDataPlans(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getInternetDataPlans; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  CheckBoroPowerMeterEligibility(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().checkBoroPowerMeterEligibility; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  GetBoroPowerMeterCustomerInfo(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getBoroPowerMeterCustomerInfo; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  BorrowPower(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().borrowPower; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(catchError(this.handleError));
  }

  PayElectricity(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().payElectricity; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(catchError(this.handleError));
  }

  BuyInternetData(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().buyInternetData; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(catchError(this.handleError));
  }

  SubscribeTv(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().subscribeTv; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(catchError(this.handleError));
  }

  AirtimeRecharge(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().airtimeRecharge; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(catchError(this.handleError));
  }

  GetBeneficiaries_(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getBeneficiaries; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  GetBeneficiaries(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getBeneficiaries; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  DeleteBeneficiary(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().deleteBeneficiaries; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  TransactionHistory(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().transactionHistory; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  GetInstititions() {
    const url = this.handlers.truPayBaseUrl() + this.handlers.urlpaths().institutions; // concatinating url
    return this.http.get(url, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  Nameinquiry(postData) {
    const url = this.handlers.truPayBaseUrl() + this.handlers.urlpaths().nameinquiry; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  Transfer(postData) {
    const url = this.handlers.truPayBaseUrl() + this.handlers.urlpaths().transfer; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(catchError(this.handleError));
  }

  Intrabank(postData) {
    const url = this.handlers.truPayBaseUrl() + this.handlers.urlpaths().intrabank; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(catchError(this.handleError));
  }

  TransferBeneficiaries(postData) {
    const url = this.handlers.truPayBaseUrl() + this.handlers.urlpaths().transferbeneficiaries; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(catchError(this.handleError));
  }

  DeleteTransferBeneficiaries(postData) {
    const url = this.handlers.truPayBaseUrl() + this.handlers.urlpaths().deletetransferbeneficiaries; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.feature) })
    .pipe(catchError(this.handleError));
  }

  Location(address) {
    const url = this.handlers.truPayBaseUrl() + this.handlers.urlpaths().location + address; // concatinating url
    console.log(url)
    return this.http.get(url, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }

  ExchangeRate() {
    const url = this.handlers.truPayBaseUrl() + this.handlers.urlpaths().fx; // concatinating url
    console.log(url)
    return this.http.get(url, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }




  //QUICKTELLER
  GetQuicktellersBiller(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getQuicktellersBiller; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }
  
  GetQuicktellersBillerInCategory(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getQuicktellersBillerInCategory; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }
  
  GetQuicktellersBettingOffers(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().getQuicktellersBettingOffers; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }
  
  ValidateQuicktellersBettingSubscriber(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().validateQuicktellersBettingSubscriber; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }
  
  PayBetting(postData) {
    const url = this.handlers.billsBaseUrl() + this.handlers.urlpaths().payBetting; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader() })
    .pipe(timeout(45000), catchError(this.handleError));
  }
}
