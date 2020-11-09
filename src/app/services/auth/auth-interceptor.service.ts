import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { Constants } from 'src/app/config/constants';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { AlertService } from '../utilities/alert.service';
import { SharedData } from 'src/app/shared/shared.components';
import { ProfileService } from '../user/profile.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  token: any;
  SessionID: any;

  constructor(
    private storageSrvc: StorageService,
    private router: Router,
    private authSrvc: AuthService,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    private profileSrvc: ProfileService,
  ) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.storageSrvc.get(Constants.TOKEN).then(res => {
    //   this.token = res;
    // });
    this.authSrvc.currentTokenData.subscribe(res => {
      this.token = res;
    });

    this.authSrvc.currentSessionIDData.subscribe(
      res => {
        this.SessionID = res;
      }
    )

    if (req.url.startsWith('https://dtptest.fidelitybank.ng/eWalletAPI/api') || req.url.startsWith('https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/Wallet')) {
      const cloned = req.clone({
        setHeaders: {
          // Authorization: `Bearer ${this.token}`,
          session: this.SessionID,
          phoneNumber: this.sharedData.PHONENUMBER
        },
      });
      // console.log(cloned.url);
      return next.handle(cloned);
    } else if (req.url.startsWith('https://dtptest.fidelitybank.ng/billpayment/api') || req.url.startsWith('https://dtptest.fidelitybank.ng/LimitlessAPIGateway/api/BillPayment')) {
      const cloned = req.clone({
        setHeaders: {
          // Authorization: `Bearer ${this.token}`,
          session: this.SessionID,
          phoneNumber: this.sharedData.PHONENUMBER
        },
      });
      // console.log(cloned.url);
      return next.handle(cloned);
    } else if (req.url.startsWith('https://dtptest.fidelitybank.ng/digitaltravels/api')) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: "vWdyuR?wd6u730:l892e9dc892e=231!",
          session: this.SessionID,
        },
      });
      // console.log(cloned.url);
      return next.handle(cloned);
    } else if (req.url.startsWith(environment.travelPaymentUrl)) {
      const cloned = req.clone({
        setHeaders: {
          // Authorization: `Bearer ${this.token}`,
          session: this.SessionID,
          Authorization: "vWdyuR?wd6u730:l892e9dc892e=231!",
        },
      });
      // console.log(cloned.url);
      return next.handle(cloned);
    } else if (this.token && this.SessionID) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.token}`,
          session: this.SessionID,
          phoneNumber: this.profileSrvc.getUserPhone(),
          access_token: this.sharedData.TOKEN
        },
      });
      // console.log(cloned.url);
      return next.handle(cloned);
    } else if (this.SessionID) {
      const cloned = req.clone({
        setHeaders: {
          session: this.SessionID
        },
      });
      // console.log(cloned.url);
      return next.handle(cloned);
    } else {
      return next.handle(req).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse && event.body.resultCode === '445'
            && event.body.ResultMessage === 'Invalid/Expired Token Passed. Session invalid.') {
            this.authSrvc.isAuthenticated = false;
            this.alertSrvc.showErrorToast('Your session has expired, Please Login again');
            this.router.navigate(['/auth']);
          }
        })
      );
    }
  }
}
