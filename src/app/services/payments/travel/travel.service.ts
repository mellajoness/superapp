import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, forkJoin } from 'rxjs';
import { retry, catchError, map, timeout } from 'rxjs/operators';
import { HttpErrorHandler } from '../../http/error/http-error-handler.service';
import { ErrorService } from '../../http/error/error.service';
import { Handlers } from 'src/app/shared/handlers';
import { SharedData } from 'src/app/shared/shared.components';
// import { HttpErrorHandler, HandleError } from '../../../../Business/error/http-error-handler.service';
// import { ErrorService } from '../../../../Business/error/error.service';
// import { Handlers } from 'src/Business/constants/handlers';
// import { DisplayServices } from 'src/Business/Display/displayServices';
// import { AuthService } from '../auth/auth.service';
// import { SharedData } from 'src/Business/shared/sharedservices/shared.components';
import { HttpService } from './../../http/http.service';
import { environment } from './../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class TravelService {
    //   public handlers: Handlers;
    private httpErrorHandler: HttpErrorHandler;
    private errorHandle: any;
    private errorService: ErrorService;

    featureName;

    constructor(
        private http: HttpClient,
        public handlers: Handlers,
        // private displayServices: DisplayServices,
        public sharedData: SharedData,
        private httpService: HttpService
    ) {

        // this.handlers = new Handlers();
        this.httpErrorHandler = new HttpErrorHandler(this.errorService);

        this.featureName = 'travel';
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

    //   getCityCodeByName(param: any): Observable<any> {
    //     return this.httpService.travel_GET(this.handlers.travelServiceNames().getCityCodeByName + param);
    //   }

    //   getAirportsInCity(param: any): Observable<any> {
    //     return this.httpService.travel_GET(this.handlers.travelServiceNames().getAirportsInCity);
    //   }

    //   getAirlineCodeByName(param: any): Observable<any> {
    //     return this.httpService.travel_GET(this.handlers.travelServiceNames().getAirlineCodeByName);
    //   }

    //   buyTicket(postData: any): Observable<any> {
    //     return this.httpService.travel_POST(this.handlers.travelServiceNames().buyTicket, postData);
    //   }

    //   updateGeotravelWithPaymentInfo(postData: any): Observable<any> {
    //     return this.httpService.travel_POST(this.handlers.travelServiceNames().updateGeotravelWithPaymentInfo, postData);
    //   }

    //   reCreateTicket(postData: any): Observable<any> {
    //     return this.httpService.travel_POST(this.handlers.travelServiceNames().reCreateTicket, postData);
    //   }

    //   getPnr(postData: any): Observable<any> {
    //     return this.httpService.travel_POST(this.handlers.travelServiceNames().getPnr, postData);
    //   }

    //   rebookFlight(postData: any): Observable<any> {
    //     return this.httpService.travel_POST(this.handlers.travelServiceNames().rebookFlight, postData);
    //   }

    //   bookFlight(postData: any): Observable<any> {
    //     return this.httpService.travel_POST(this.handlers.travelServiceNames().bookFlight, postData);
    //   }

    //   getAvailableFlights(postData: any): Observable<any> {
    //     return this.httpService.travel_POST(this.handlers.travelServiceNames().getAvailableFlights, postData);
    //   }

    // //   invalidateCookie(postData: any): Observable<any> {
    // //     return this.httpService.travel_POST(this.handlers.travelServiceNames().invalidateCookie, postData);
    // //   }

    // //   travelsLogin(postData: any): Observable<any> {
    // //     return this.httpService.travel_POST(this.handlers.travelServiceNames().travelsLogin, postData);
    // //   }





    returnObservable(): Observable<any> {
        return this.sharedData.travel.searchResult;
    }


    url(path) {
        return environment.travelPaymentUrl + path;
    }



    getCityCodeByName(param) {
        return this.http.get(
            this.url(this.handlers.travelServiceNames().getCityCodeByName + param),
            {headers: this.handlers.httpHeader(this.featureName)}
        );
    }

    getAirportsInCity(param) {
        param.name = param.name.split(' ')[0];
        return this.http.get(
            this.url(this.handlers.travelServiceNames().getAirportsInCity) + `?cityName=${param.name}&cityCode=${param.code}`,
            {headers: this.handlers.httpHeader(this.featureName)}
        );
    }

    getAirlineCodeByName(param) {
        return this.http.get(
            this.url(this.handlers.travelServiceNames().getAirlineCodeByName)
        );
    }

    getCountries() {
        return this.http.get(
            this.url(this.handlers.travelServiceNames().getCountries)
        );
    }

    buyTicket(postData) {
        const header = this.handlers.httpHeader('travel')
        return this.http.post(
            this.url(this.handlers.travelServiceNames().buyTicket),
            postData, {headers : this.handlers.httpHeader('travel')}
        );
    }

    updateGeotravelWithPaymentInfo(postData) {
        return this.http.post(
            this.url(this.handlers.travelServiceNames().updateGeotravelWithPaymentInfo),
            postData,
        );
    }

    reCreateTicket(postData) {
        return this.http.post(
            this.url(this.handlers.travelServiceNames().reCreateTicket),
            postData,
        );
    }

    getPnr(postData) {
        return this.http.post(
            this.url(this.handlers.travelServiceNames().getPnr),
            postData,
        );
    }

    rebookFlight(postData) {
        return this.http.post(
            this.url(this.handlers.travelServiceNames().rebookFlight),
            postData,
        );
    }

    bookFlight(postData) {
        return this.http.post(
            this.url(this.handlers.travelServiceNames().bookFlight),
            postData,
        );
    }

    getAvailableFlights(postData) {
        return this.http.post(
            this.url(this.handlers.travelServiceNames().getAvailableFlights),
            postData,
        );
    }

    getFlightFareRules(pnr) {
        (window as any).open(this.url(this.handlers.travelServiceNames().fareRules) + pnr, '_system', 'location=yes');
    }

}
