import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WalletlogicService {

  constructor(
    public http: HttpClient,
  ) { }

  formatTransactionsData(data) {
    let x = data.sort((a, b) => new Date(a.tran_time).getTime() - new Date(b.tran_time).getTime());
    x = x.reverse();
    let months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let newD;
    let newM;
    let newDate;
    let nth = ['st', 'th', 'nd', 'rd']

    x.map(obj => {
      let date = new Date(obj.tran_time);
      let d = date.getDate();
      let m = date.getMonth();
      let y = date.getFullYear();
      
      newD = d === 1 ? d + nth[0] : d === 2 ? d + nth[2] : d === 3 ? d + nth[3] : d + nth[1];

      for(let i = 0; i < months.length; i++) {
        newM = months[m + 1];
        newDate = newM + " " + newD + ", " + y
      }
      obj.tran_particular_2 = obj.tran_particular.split(" ")[0]; 
      obj.tran_time = newDate;
    })

    return x;
  }

  shortenTransactionData(data) {
    let x = [];
    for (let i = 0; i < data.length; i++) {
      x.push(data[i]);
      if(i === 9) {
        break;
      }
    }
    return x;
  }

  generateOrderID() {
    let x = Math.floor(10000 + Math.random() * 90000);
    let u;
    u = "F" + x;
    return u;
  }

  formatDate(d) {
    if(d) {
      let newD = new Date(d);
      let year = newD.getFullYear() + "";
      let month = newD.getMonth() + 1 + "";
      let day = newD.getDate() + "";
      let dob = "";
  
      if (day.length === 1) {
        day = "0" + day;
      }
      dob = day + "-" + month + "-" + year;
      return dob;
    } else {
      return null;
    }
  }

  getInstitutionObj(institutions, name) {
    let x;
    institutions.map(i => {
      if(i.name === name) {
        x = i;
      }
    })
    return x;
  }

  walletBeneficiaries(benef) {
    let x = [];
    benef.map(i => {
      if(i.bank_name === 'LIMITLESS') {
        x.push(i);
      }
    })

    if(x.length > 0) {
      return x;
    } else {
      return null;
    }
  }

  bankAccountBeneficiaries(benef) {
    let x = [];
    benef.map(i => {
      if(i.bank_name !== 'LIMITLESS') {
        x.push(i);
      }
    })

    if(x.length > 0) {
      return x;
    } else {
      return null;
    }
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error( `Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError(error);
  }
  
  ConfirmResetpin(postData) {
    const walletHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + 'VHJ1V2FsbGV0U3lzdGVtQVBJOjFAMTIzd2VxIzE1NmVyWQ==' });
    const url = "https://dtptest.fidelitybank.ng/eWalletAPI/api/Onboarding/v1/confirmresetpin";
    return this.http.post(url, postData, { headers: walletHeader })
    .pipe(timeout(60000), catchError(this.handleError));
  }
}
