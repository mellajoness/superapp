import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import {LoanService} from 'src/app/services/loan/loan.service'
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { AppModule } from 'src/app/app.module';
@Component({
  selector: 'app-extendloan',
  templateUrl: './extendloan.page.html',
  styleUrls: ['./extendloan.page.scss'],
})
export class ExtendloanPage implements OnInit {
  phoneNumber;
  extensionOffers = [];
  loanType: any;
  custId: any;
  accountNumber: any;
  isStaff = true;
  loanTypeValue: number;
  recordId: any;
  channelId: any;
  hasExtension: boolean;
  noExtension: boolean;

  constructor(
    public menuCtrl: MenuController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loanSrvc: LoanService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private profileSrvc: ProfileService,
  ) { 
   
  }

  ngOnInit() {
    this.phoneNumber = this.profileSrvc.getUserPhone().replace(/^0+/, '234');;
    console.log('my exten phone no',this.phoneNumber);
   this.getExtendLoan()
  }

  goBack(){
    this.router.navigate(['loans'])
  }

 async getExtendLoan() {
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    const body = {
      phonenumber: this.phoneNumber,
      channelId: 'flashLendMobile'
    };

    this.loanSrvc.getLoanExtension(body).subscribe(resp => {
      loader.dismiss()
      if(resp.responseCode ==='00'){
      this.extensionOffers = resp.extensionOffer;
      this.custId = resp.cifId;
      this.channelId=resp.channelId;
      this.accountNumber = resp.account_Number;

      if (this.extensionOffers.length > 0) {
        this.hasExtension = true;
      } else if (this.extensionOffers.length ===0) {
        this.noExtension = true;
      }

      for(var ext of this.extensionOffers){
        this.recordId = ext.recordId,
        console.log('record RESPONSE', this.recordId);  
      }

      console.log('EXTEND RESPONSE', resp);
      console.log('record RESPONSE', this.recordId);  
   
    
      }
      // else if (resp.responseCode==='01'){
      //   this.alertSrvc.showErrorToast(resp.message);
      // }

      // else{
      //   this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
      // }
    },
    err=>{
      loader.dismiss()
      this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
    });
  }

  try(){
    this.router.navigate(['loans/extendloandetails']);
  }

  extendLoan(val) {
    console.log('VAL', val);
  //   if (val.loan_Category === 'Migo') {
  //   this.loaderSrvc.showLoader();
  //   this.loanSrvc.migoLoanExtension().subscribe(resp => {
  //     this.loaderSrvc.hideLoader();
  //     if (resp.loan_Category === 'migo') {
  //       console.log('Extension Response', resp);
  //       let respDataMigo: NavigationExtras = {
  //         state: {
  //           extendLoanResponseMigo: resp
  //         }
  //       };
  //       this.router.navigate(['loans/migo'],respDataMigo);
  //     } 
  //     else if (resp.loan_Category !== 'migo') {
  //       console.log('Extension Response', resp);
  //       this.alertSrvc.showErrorToast(resp.message);
  //     }
  //   })
  // }
  //   else {
  //     this.loaderSrvc.showLoader();
  //     this.loanType = val.loan_Category;
  //     console.log('MY LOAN TYPE',this.loanType)
      if(val.loan_Category=="Personal"){
        this.loanTypeValue=0
        console.log('my loantypevalue is',this.loanType)
      }
      else if(val.loan_Category=="Car"){
       this.loanTypeValue=1
       console.log('my loantypevalue is',this.loanTypeValue)
     }
     else if(val.loan_Category=="Payday"){
       this.loanTypeValue=2
       console.log('my loantypevalue is',this.loanTypeValue)
     }
      const body = {
        phonenumber: this.phoneNumber,
        loanType: this.loanTypeValue,
        cifId: this.custId,
        isStaff: this.isStaff,
        foracid: this.accountNumber,
        recordId:this.recordId,
        channelId: 0 
      };
  //     console.log('BODY', body);
      // localStorage.setItem('body', JSON.stringify(body));  //note
      // this.loanSrvc.acceptPaydayLoanExtension(body).subscribe(resp => {
       
      // this.loaderSrvc.hideLoader();
      
        // if (resp.loan_Category === 'Payday') {
          
          let respData: NavigationExtras = {
            state: {
              extendLoanResponse: val,
              extendLoanBody:body
            }
          };
          // this.router.navigate(['loans'], respData);
          this.router.navigate(['loans/extendloandetails'],respData);
        // }   
        // console.log(' extend Response', resp);
    // },
  //   err=>{
  //     this.loaderSrvc.hideLoader();
  //     this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
  //   }
  //   );
  // }

 }
}
