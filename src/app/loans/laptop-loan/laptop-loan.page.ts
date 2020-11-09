import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-laptop-loan',
  templateUrl: './laptop-loan.page.html',
  styleUrls: ['./laptop-loan.page.scss'],
})
export class LaptopLoanPage implements OnInit {
  laptoploan: any;
  total_Eligible_Amount: any;
  laptopSpecs: [];
  tenorDuration: any;
  account: any;
  accounttwo: any;
  interestRate: any;
  eligibilityInfo: any;

  constructor(
    private router: Router,
    activatedRoute: ActivatedRoute,
    private alertSrvc: AlertService,
  ) {
    activatedRoute.paramMap.subscribe(params => {
      if (router.getCurrentNavigation().extras.state) {
        this.eligibilityInfo = router.getCurrentNavigation().extras.state.intent;
        this.laptoploan = router.getCurrentNavigation().extras.state.intent;
        this.total_Eligible_Amount=this.laptoploan.total_Eligible_Amount;
        this.laptopSpecs= this.laptoploan.laptopSpecs;
        this.tenorDuration=this.laptoploan.tenorDuration;
        this.interestRate=this.laptoploan.interestRate;
        console.log('laptoploan data', this.laptoploan);
        console.log('laptop specs ', this.laptopSpecs);
        console.log('total eligibe amount ', this.total_Eligible_Amount);
        console.log('tenure duration', this.tenorDuration);
        console.log('interest rate', this.interestRate);
      }
    });
   }

  ngOnInit() {
  }
  goBack(){
    this.router.navigate(['loans']);
  }

  goToDetails(laptop){
    console.log('test',laptop)
    let eligibilityInfo: NavigationExtras = {
      state: {
        eligibilityInfo: this.eligibilityInfo,
        laptoploanIndex: laptop,
        custId:'abcd',
        bvn: '233383838383', 
      }
    };
    this.router.navigate(['loans/laptop-confirm-application'], eligibilityInfo);
  }

  // async pay() {
  //   if (!this.account) {
  //     this.alertSrvc.showErrorToast('Please select a laptop');
  //     return;
  //   }
  //   if (!this.accounttwo) {
  //     this.alertSrvc.showErrorToast('Please select duration ');
  //     return;
  //   }
// }
}
