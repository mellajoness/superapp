import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { Router, NavigationExtras } from '@angular/router';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { StorageService } from 'src/app/services/storage/storage.service';
@Component({
  selector: 'app-loanhistory',
  templateUrl: './loanhistory.page.html',
  styleUrls: ['./loanhistory.page.scss'],
})
export class LoanhistoryPage implements OnInit {
  phoneNumber: any;
 
  customerId: any;
  total: any;
  show: boolean;
  dashboardData:any
  LoanHistory: Array<any> = [];
  hasLoanHistory = false;
  noLoanHistory = false;

  constructor(
    private profileSrvc: ProfileService,
    private loanService: LoanService,
    private router: Router,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private loanSrvc: LoanService,
    private storageService: StorageService,
  ) {
  
   }

  ngOnInit() {
    this.storageService.get('custId').then((val)=>{
      this.customerId=val
      console.log('new cust id',val)
   })

   this.phoneNumber = this.profileSrvc.getUserPhone();
   console.log(this.phoneNumber);
  
   }

   ionViewWillEnter(){
    this.getHistory(this.customerId,)
  }

  

 async getHistory(customerId) {
  let formattedPhone = this.loanSrvc.formatPhoneAs234(this.phoneNumber);
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    this.loanSrvc.getHistory(customerId,formattedPhone).subscribe(resp => {
      loader.dismiss();
      console.log('my history',resp)

      this.LoanHistory =resp
    
      // if (this.LoanHistory.length > 0) {
      //   this.hasLoanHistory = true;
      // } else if (this.LoanHistory.length < 1) {
      //   this.noLoanHistory = true;
      // }
      }
    )
    err=>{
      loader.dismiss()
      this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
      console.log(err);
  }

}

viewLoanHistory(val) {
  console.log(val.loanAccount);
  let loanBalanceData: NavigationExtras = {
    state: {
      LoanHistoryResponseData: val
    }
  };
  this.router.navigate(['loans/loanhistorydetails'],loanBalanceData);
}

goBack(){
  this.router.navigate(['loans'])
}
}
