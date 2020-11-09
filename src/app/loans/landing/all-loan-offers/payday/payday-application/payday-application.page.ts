import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { IPaydayEligibilityCheckResp } from 'src/app/models/loan/IPaydayEligibilityCheckResp';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-payday-application',
  templateUrl: './payday-application.page.html',
  styleUrls: ['./payday-application.page.scss'],
})
export class PaydayApplicationPage implements OnInit {
 
  eligibilityInfo: IPaydayEligibilityCheckResp;
  dashboardInfo: any;
  userInfo: any;
  loanAmount: number;
  LoanForm: FormGroup;
  bvn: any;
  custId: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertSrvc: AlertService,) {

    activatedRoute.paramMap.subscribe(params => {
      if (router.getCurrentNavigation().extras.state) {
        this.eligibilityInfo = router.getCurrentNavigation().extras.state.intent;
        this.bvn = this.router.getCurrentNavigation().extras.state.bvn;
        this.custId = this.router.getCurrentNavigation().extras.state.custId;
        console.log('payday-application', this.eligibilityInfo);
        console.log('payday-application', this.bvn);
        console.log('payday-application', this.custId);
      }
    });
  }

  goBack(){
    this.router.navigate(['loans/all-loan-offers']);
  }

  ngOnInit() {
    this.LoanForm =  new FormGroup({
      loanAmount: new FormControl('', Validators.compose([
        Validators.required, Validators.min(this.eligibilityInfo.minAmount),
        Validators.max(this.eligibilityInfo.total_Eligible_Amount)
      ]))
    });
  }

  proceedToConfirmLoan() {
  
    const loanInfo: NavigationExtras = {
      state: {
        loanAmount: this.LoanForm.value.loanAmount,
        eligibilityInfo: this.eligibilityInfo
      }
    };
    this.router.navigate(['loans/all-loan-offers/payday-confirm-application'], loanInfo);
  }

}
