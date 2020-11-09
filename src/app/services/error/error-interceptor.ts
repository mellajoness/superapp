import { Router } from '@angular/router';
import { AlertService } from './../utilities/alert.service';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

    constructor(
        private authSrvc: AuthService,
        private alertSrvc: AlertService,
        private router: Router
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.log(request)
            //   console.log(err)
            //   if (err.status === 401) {
            //     // auto logout if 401 response returned from api
            //   }
            //   const error = err.error?.error?.message || err.statusText;
            //   return throwError(error);

            console.log("====================Error Interceptor Works====================");
            if (err && err.error && err.error.resultCode == '666') {
                const error = err.error;
                this.authSrvc.isAuthenticated = false;
                this.alertSrvc.showErrorToast(err.error.message);
                this.router.navigate(['/auth']);
                return throwError(error.message);
            }
            if (err && err.error && err.error.responseCode == '666') {
                const error = err.error;
                this.authSrvc.isAuthenticated = false;
                this.alertSrvc.showErrorToast(err.error.message);
                this.router.navigate(['/auth']);
                return throwError(error.message);
            }
            if (err && err.error && err.error.message) {
                const error = err.error;
                this.alertSrvc.showErrorToast(err.error.message);
                return throwError(error.message);
            }
            console.log(err)
            return throwError('An error occurred while processing request');


        }))
    }
}
