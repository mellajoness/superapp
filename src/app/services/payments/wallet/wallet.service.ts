import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { map, tap, catchError, timeout } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Handlers } from 'src/app/shared/handlers';
import { HttpService } from '../../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  featureName;
  featureProfile;

  constructor(
    public handlers: Handlers,
    public http: HttpClient,
    private httpService: HttpService,
  ) {
    this.featureName = 'wallet';
    this.featureProfile = 'validateFidelityCustomer';
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

  Getalltransactions(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().getalltransactions; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  GetBeneficiaries(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().getWalletBeneficiaries; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  SaveBeneficiary(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().saveWalletBeneficiaries; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  DeleteBeneficiaries(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().deleteWalletBeneficiaries; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }
  
  Checkbalance(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().checkbalance + '?phoneNumber=' + postData.wallet_id + "&wallet_id=" + postData.wallet_id; // concatinating url
    // const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().checkbalance + "?wallet_id=" + postData.wallet_id; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  Cashoutwallettofidelityaccount(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().cashoutwallettofidelityaccount; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  Cashoutwallettononfidelityaccount(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().cashoutwallettononfidelityaccount; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  Fundwallettowallet(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().fundwallettowallet; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  Fundwalletfromfidelityaccount(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().fundwalletfromfidelityaccount; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  Verifytransactionstatus(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().verifytransactionstatus; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  GetAccountDetails(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().getAccountDetails + postData.accountNumber; // concatinating url
    return this.http.get(url, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  NameEnquiryForInterbankTransfer(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().nameEnquiryForInterbankTransfer; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  Verifyphonenumber(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().verifyphonenumber + postData.phoneNumber; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  Register(postData) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().register; // concatinating url
    return this.http.post(url, postData, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }
  
  ResetPin(phoneNumber) {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().resetpin + "?phoneNumber=" + phoneNumber; // concatinating url
    return this.http.post(url, null, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  WalletAccountUpdateByPhone(phoneNumber) {
    const url = this.handlers.truPofileBaseUrl() + this.handlers.urlpaths().walletAccountUpdateByPhone + phoneNumber; // concatinating url
    return this.http.get(url, { headers: this.handlers.httpHeader(this.featureProfile) })
    .pipe(timeout(60000), catchError(this.handleError));
  }

  GetAllBanksAndBankCodes() {
    const url = this.handlers.walletBaseUrl() + this.handlers.urlpaths().getAllBanksAndBankCodes; // concatinating url
    return this.http.get(url, { headers: this.handlers.httpHeader(this.featureName) })
    .pipe(timeout(60000), catchError(this.handleError));
  }
}
