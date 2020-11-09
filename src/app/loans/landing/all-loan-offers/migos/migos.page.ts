import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import {LoanService} from 'src/app/services/loan/loan.service'
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { ProfileService } from 'src/app/services/user/profile.service';
@Component({
  selector: 'app-migos',
  templateUrl: './migos.page.html',
  styleUrls: ['./migos.page.scss'],
})
export class MigosPage implements OnInit {
  offers = [];
  userHasLoan = false;
  message: any;
  phoneNumber;
  loanDataResp: any;
  constructor(
    public menuCtrl: MenuController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loanSrvc: LoanService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private profileSrvc: ProfileService,
  ) { 
    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loanDataResp = this.router.getCurrentNavigation().extras.state.migoData;
        console.log('migo data from all loan offer', this.loanDataResp);
      }
    })
  }

  ngOnInit() {
    this.phoneNumber = this.profileSrvc.getUserPhone().replace(/^0+/, '234');;
    console.log('my exten phone no',this.phoneNumber);
    // this.phoneNumber = this.loanSrvc.formatPhoneAs234(this.phoneNumber);
    // console.log('my exten phone no',this.phoneNumber);
    //  this.getMigos(this.phoneNumber)
  }

  getMigos(phoneNumber) {
    this.loaderSrvc.showLoader(); 
    this.loanSrvc.getMigo(phoneNumber).subscribe(resp => {
      this.loaderSrvc.hideLoader();
      console.log('my get MIGOS data', resp);
      if(resp){
        this.offers = resp.data;
        this.message = resp.message === 'ok' ? 'Sorry we couldn\'t determine an offer for you'
         : resp.message.replace('Client currently has', 'You currently have');
        console.log('Get Offers Response', this.offers);
      } else if (resp.message === 'ok') {

      }
    },
      err => {
        this.loaderSrvc.hideLoader();
        console.log(err);
      })
  }

  selectloan(val){
    const body={
    phonenumber: this.phoneNumber,
    offerId: val.id,
  };
 
  console.log('BODY', body);
  this.loaderSrvc.showLoader();
  this.loanSrvc.selectMigoLoan(body).subscribe(resp => {
       
    this.loaderSrvc.hideLoader();
    console.log(' accept Response', resp);
      if (resp.responseCode === '00') {
        
        let respData: NavigationExtras = {
          state: {
            extendLoanResponse: resp,
            extendLoanBody:body
          }
        };
       
        this.router.navigate(['loans/all-loan-offers/migoscard'],respData);
      }   

      else {
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

  next(){
    this.router.navigate(['loans/all-loan-offers/migos/migosnewcard']);
  }
  





  goBack(){
    this.router.navigate(['loans/all-loan-offers']);
  }

}
