import { Handlers } from 'src/app/shared/handlers';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { apiKeys } from '../../../environments/environment';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient,
    private handlers: Handlers
    ) { }

  post(serviceName: string, data: any): Observable<any> {

    const headers = new HttpHeaders({
      XApiKey: apiKeys.truprofile,
      Appid: 'LimitlessG@teway',
      Appsecret: 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });
    const url = environment.profileUrl + serviceName;

    return this.http.post(url, data, { headers }).pipe(shareReplay(1));
  }

  get(serviceName: string): Observable<any> {
    const headers = new HttpHeaders({
      'XApiKey': apiKeys.truprofile,
      'Appid': 'LimitlessG@teway',
      'Appsecret': 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });

    const url = environment.profileUrl + serviceName;

    return this.http.get(url, { headers }).pipe(shareReplay(1));
  }

  upload(serviceName: string, data: any) {
    const headers = new HttpHeaders({
      XApiKey: apiKeys.truprofile,
      Appid: 'LimitlessG@teway',
      Appsecret: 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });

    const url = environment.profileUrl + serviceName;

    return this.http.post(url, data, { headers }).pipe(shareReplay(1));
  }

  investpost(serviceName: string, data: any): Observable<any> {

    const headers = new HttpHeaders({
      XApiKey: apiKeys.moneyZip,
      Appid: 'LimitlessG@teway',
      Appsecret: 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });
    const url = environment.investmentUrl + serviceName;

    return this.http.post(url, data, { headers }).pipe(shareReplay(1));

  }

  digitalLoanPost(serviceName: string, data: any): Observable<any> {

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    headers.append('Access-Control-Allow-Origin', '*');

    const options = { header: headers, withCredentials: false ,};


    const url = environment.digitalLoanExtensionUrl + serviceName;

    return this.http.post(url, data, { ...options }).pipe(shareReplay(1));
  }


  digitalLoanPostNewUrl(serviceName: string, data: any): Observable<any> {
    const headers = new HttpHeaders(
      {
      ChannelName: 'SUPA_APP',
      APISecret: '567bf3bf232649d0b38e53df79976459'
    }
    );
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('ChannelName', 'SUPA_APP');
    // headers.append('APISecret','567bf3bf232649d0b38e53df79976459');
   
    const options = { headers: headers, withCredentials: false };


    const url = environment.digitalLoanExtensionUrl + serviceName;

    return this.http.post(url, data, {...options}).pipe(shareReplay(1));
  }

  
  digitalLoangetNewUrl(serviceName: string): Observable<any>  {
    const headers = new HttpHeaders({
      ChannelName: 'SUPA_APP',
      APISecret: '567bf3bf232649d0b38e53df79976459',
      'Appid': 'LimitlessG@teway',
      'Appsecret': 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    }
    );
    headers.append('Content-Type','application/json');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    headers.append('Access-Control-Allow-Origin', '*');
    const options = { headers: headers};

    const url = environment.digitalLoanExtensionUrl + serviceName;

    return this.http.get(url, {...options}).pipe(shareReplay(1));
  }



  investget(serviceName: string): Observable<any> {

    const headers = new HttpHeaders({
      XApiKey: apiKeys.moneyZip,
      Appid: 'LimitlessG@teway',
      Appsecret: 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });

    const url = environment.investmentUrl + serviceName;

    return this.http.get(url, { headers }).pipe(shareReplay(1));

  }

  digitalLoanget(serviceName:string): Observable<any> {
    const headers = new HttpHeaders(
    //   {
    //   ChannelName: 'SUPA_APP',
    //   APISecret: '567bf3bf232649d0b38e53df79976459'
    // }
    );
    headers.append('Content-Type', 'application/json');
    // headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    // headers.append('Access-Control-Allow-Origin', '*');
    headers.append('ChannelName', 'SUPA_APP');
    headers.append('APISecret','567bf3bf232649d0b38e53df79976459');
    const options = { header: headers, withCredentials: false };

    const url = environment.digitalLoanUrl + serviceName;

    return this.http.get(url, { ...options }).pipe(shareReplay(1));
  }

  billsPayments(serviceName: string, data: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    headers.append('Access-Control-Allow-Origin', '*');

    const options = { header: headers, withCredentials: false };

    const url = environment.billsPaymentUrl + serviceName;

    return this.http.post(url, data, { ...options }).pipe(shareReplay(1));
  }

diginvestpost(serviceName: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      XApiKey: apiKeys.digitalInvestment,
      Appid: 'LimitlessG@teway',
      Appsecret: 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });
    const url = environment.digiInvestUrl + serviceName;

    return this.http.post(url, data, {headers}).pipe(shareReplay(1));
  }

  diginvestget(serviceName: string): Observable<any> {

    const headers = new HttpHeaders({
      XApiKey: apiKeys.digitalInvestment,
      Appid: 'LimitlessG@teway',
      Appsecret: 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });

    const url = environment.digiInvestUrl + serviceName;

    return this.http.get(url, {headers}).pipe(shareReplay(1));
  }

  travel_GET(serviceName: string): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Authorization', 'vWdyuR?wd6u730:l892e9dc892e=231!');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    headers.append('Access-Control-Allow-Origin', '*');

    let newHeader = new HttpHeaders();
    let travelAuthHeader = newHeader.append('Authorization', 'vWdyuR?wd6u730:l892e9dc892e=231!');
    console.log(travelAuthHeader);
    console.log(travelAuthHeader.get('Authorization')) // output 22

    const options = { header: headers, withCredentials: false };

    const url = environment.travelPaymentUrl + serviceName;

    return this.http.get(url, { ...options }).pipe(shareReplay(1));
  }

  travel_POST(serviceName: string, data: any): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    headers.append('Authorization', 'vWdyuR?wd6u730:l892e9dc892e=231!');
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    headers.append('Access-Control-Allow-Origin', '*');

    const options = { header: headers, withCredentials: false };

    const url = environment.travelPaymentUrl + serviceName;

    return this.http.post(url, data, { ...options }).pipe(shareReplay(1));
  }


  digitalLoangetMigo(serviceName: string): Observable<any>  {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // headers.append('XApiKey', 'b2845461-05d4-4a7d-ba16-0a84b7b06e36');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type',)
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    headers.append('Access-Control-Allow-Origin', '*');

    const options = { header: headers, withCredentials: false };

    const url = environment.digitalLoanUrlMigo + serviceName;

    return this.http.get(url, {...options}).pipe(shareReplay(1));
  }

  digitalLoanPostMigo(serviceName: string, data: any): Observable<any> {
    
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    // headers.append('XApiKey', 'b2845461-05d4-4a7d-ba16-0a84b7b06e36');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type',)
    headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    headers.append('Access-Control-Allow-Origin', '*');

    const options = { header: headers, withCredentials: false };


    const url = environment.digitalLoanUrlMigo + serviceName;

    return this.http.post(url, data, {...options}).pipe(shareReplay(1));
  }

  profileCustomer_POST(serviceName: string, data: any): Observable<any> {

    // const headers = new HttpHeaders();
    // headers.append('XApiKey', 'b2845461-05d4-4a7d-ba16-0a84b7b06e36');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type',)
    // headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Content-Type', 'application/json');

    const headers = this.handlers.httpHeader('validateFidelityCustomer');
    
    const options = { header: headers, withCredentials: false };

    const url = environment.profileUrl + serviceName;

    return this.http.post(url, data, { headers }).pipe(shareReplay(1));
    // return this.http.post(url, data, {...options, responseType: 'json'}).pipe(shareReplay(1));
    // return this.http.post(url, data).pipe(shareReplay(1));
  }

  profileCustomer_GET(serviceName: string, customHeaders?): Observable<any> {
    // const headers = new HttpHeaders();
    // headers.append('Authorization', 'vWdyuR?wd6u730:l892e9dc892e=231!');
    // headers.append('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, XApiKey');
    // headers.append('Access-Control-Allow-Origin', '*');
    
    const headers = this.handlers.httpHeader('validateFidelityCustomer');
    const options = { headers: headers, withCredentials: false };

    const url = environment.profileUrl + serviceName;

    return this.http.get(url, { ...options }).pipe(shareReplay(1));
  }

  transactions_GET(serviceName: string) {

    const headers = new HttpHeaders({
      XApiKey: apiKeys.truprofile,
      Appid: 'LimitlessG@teway',
      Appsecret: 'f0da6339-ea04-4315-8da9-d45e6eb72394',
    });

    const url = environment.profileUrl + serviceName;

    return this.http.get(url, { headers }).pipe(shareReplay(1));
  }

}



