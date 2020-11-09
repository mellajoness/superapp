import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import {LoanService} from 'src/app/services/loan/loan.service'
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { ProfileService } from 'src/app/services/user/profile.service';
@Component({
  selector: 'app-migoscard',
  templateUrl: './migoscard.page.html',
  styleUrls: ['./migoscard.page.scss'],
})
export class MigoscardPage implements OnInit {
  loanDataResp:any
  banks: any;
  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loanSrvc: LoanService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private profileSrvc: ProfileService,
  ) {
    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loanDataResp = this.router.getCurrentNavigation().extras.state.selectedLoanResponse;

        console.log('success or failure data', this.loanDataResp);
      }
    }
    );
   }

  ngOnInit() {
    // this.getPaymentCards()
  }
  goBack(){
    this.router.navigate(['loans/all-loan-offers/migos']);
  }
  addCard(){
    this.router.navigate(['loans/all-loan-offers/migos/migoscard/migosnewcard']);
  }
  getPaymentCards() {
    this.loaderSrvc.showLoader();
    this.loanSrvc.getMigoPaymentCard().subscribe(resp => {
      this.loaderSrvc.hideLoader();
      console.log('my payment card data', resp);
      if(resp.code==='00'){
        this.banks = resp.data;
        if (!this.banks.length){
          this.router.navigate(['loans/all-loan-offers/migosnewcard']);
        }
      } 
      else 
       {
        this.alertSrvc.showErrorToast(resp.message); 
      }
    },
      err => {
       
        console.log(err);
      })
  }


    selectAccount(val) {
      let respData: NavigationExtras = {
        state: {
          extendLoanResponse: val,
        }
      };
     
      this.router.navigate(['loans/all-loan-offers/migoscardpayment'],respData);
    }
  }



