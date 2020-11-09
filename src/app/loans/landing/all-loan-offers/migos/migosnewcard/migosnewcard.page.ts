import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoanService } from 'src/app/services/loan/loan.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { ProfileService } from 'src/app/services/user/profile.service';
@Component({
  selector: 'app-migosnewcard',
  templateUrl: './migosnewcard.page.html',
  styleUrls: ['./migosnewcard.page.scss'],
})
export class MigosnewcardPage implements OnInit {
  banks: any;
  code: any;
  isNotFidelityAccount: boolean;
  isFidelityAccount: boolean;
  addAccount: any;
  responseBvn: any;
  FidelityAccount: any;
  accountName: any;
  phoneNumber: string;
  LoanForm: FormGroup;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loanSrvc: LoanService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private profileSrvc: ProfileService,
    private formBuilder: FormBuilder,
  ) { }

  goBack(){
    this.router.navigate(['loans/all-loan-offers/migos']);
  }

  

  ngOnInit() {
    // this.LoanForm =  new FormGroup({
    //   loanAmount: new FormControl('', Validators.compose([
    //     Validators.required, Validators.min(this.eligibilityInfo.minAmount),
    //     Validators.max(this.eligibilityInfo.total_Eligible_Amount)
    //   ]))
    // });
    this.phoneNumber = this.profileSrvc.getUserPhone().replace(/^0+/, '234');;
    console.log('my exten phone no',this.phoneNumber);
  }

  getBanks() {
    this.loaderSrvc.showLoader();
    this.loanSrvc.getMigoBank().subscribe(resp => {
      this.loaderSrvc.hideLoader();
      console.log('my payment card data', resp);
      if(resp.code==='00'){
        this.banks = resp.data;
        this.router.navigate(['loans/all-loan-offers/migosnewcard']);
      } 
      else 
       {
        this.alertSrvc.showErrorToast(resp.message); 
      }
    },
      err => {
        this.loaderSrvc.hideLoader();
        console.log(err);
      })
  }


   onChange(val) {
    console.log(val.detail.value);
    this.code = val.detail.value;
    if (val.detail.value === '070') {
       this.getFidelityAccount();
      this.isNotFidelityAccount = false;
      this.isFidelityAccount = true;
    } else {
      this.isFidelityAccount = false;
      this.isNotFidelityAccount = true;
    }
  }


    press(val) {
    console.log(val);
    if (val.length === 10) {
      console.log('Ten digits entered');
      this.doNameEnquiry();
    }
  }


  doNameEnquiry() {
      console.log(this.addAccount.value.bank);
      console.log(this.addAccount.value.accountNo);
      const bank = this.addAccount.value.bank;
      const accountNo = this.addAccount.value.accountNo;
     
        this.loaderSrvc.showLoader();
          this.loanSrvc.getMigoBank().subscribe(resp => {
          console.log('Enquiry Response', resp);
          this.loaderSrvc.hideLoader();
    } )
    err => {
      this.loaderSrvc.hideLoader();
      console.log(err);
    }
    }
  


  getFidelityAccount() {
    this.loaderSrvc.showLoader();
    this.loanSrvc.getFidelityMigoBank().subscribe(resp => {
      this.loaderSrvc.hideLoader();
      console.log('my payment card data', resp);
      if(resp.code==='00'){
        this.FidelityAccount = resp.data;
        this.FidelityAccount.length ? console.log('User has a fidelity account')
          : this.alertSrvc.showErrorToast('Sorry you don\'t have an account with fidelity bank');
        this.responseBvn = resp.data[0].bvn;
        this.accountName = resp.data[0].accountName;
      } 
      else 
       {
        this.alertSrvc.showErrorToast(resp.message); 
      }
    },
      err => {
        this.loaderSrvc.hideLoader();
        console.log(err);
      })
  }

  submitDetailss(){
    this.router.navigate(['loans/all-loan-offers/migos/migosnewcard/migoscardpayment']);
  }

 submitDetails(){
  if (!this.addAccount.valid) {
    return;
  }
    const body={
      accountNo: this.addAccount.value.accountNo,
      accountType: this.addAccount.value.accountType,
      bvn: this.isFidelityAccount === true ? this.responseBvn : this.addAccount.value.bvn,
      bankCode: this.code,
      clientNo: this.phoneNumber
   };
 
  console.log('BODY', body);
  this.loaderSrvc.showLoader();
  this.loanSrvc.submitMigoNewAccount(body).subscribe(resp => {
       
    this.loaderSrvc.hideLoader();
    console.log(' accept Response', resp);
      if (resp.responseCode === '00') {
        
        let respData: NavigationExtras = {
          state: {
            migoNewCardLoanResponse: resp,
          }
        };
       
        this.router.navigate(['loans/all-loan-offers/migoscardpayment'],respData);
      }   

      else {
        this.router.navigate(['loans/all-loan-offers/migoscard']);
        this.alertSrvc.showErrorToast(resp.message); 
      }        
  },
  err =>{
    console.log(err)
    this.loaderSrvc.hideLoader();
    this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
   }
   )
  }



  }



