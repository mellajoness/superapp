import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { PaydayLoanService } from 'src/app/services/loan/payday/payday-loan.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { IUser } from 'src/app/models/superApp/IUser';

@Component({
  selector: 'app-loan-rejection-reason',
  templateUrl: './loan-rejection-reason.page.html',
  styleUrls: ['./loan-rejection-reason.page.scss'],
})
export class LoanRejectionReasonPage implements OnInit {

  userInfo: IUser;
  feedback: object[] = [
    { id: 1, reason: 'Loan amount is too low' },
    { id: 2, reason: 'Loan interest is too high' },
    { id: 3, reason: 'Charges are too much' },
    { id: 4, reason: 'Loan term is too short' }
  ];
  loanType: string;
  loanTypeRoute:any;
  loanTypeValue: number;

  constructor(private router: Router, private loanSrvc: LoanService,
    private profileSrvc: ProfileService, activatedRoute: ActivatedRoute,
    private pdayLoanService: PaydayLoanService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService) {
    activatedRoute.paramMap.subscribe(params => {
      if (router.getCurrentNavigation().extras.state) {
        this.loanType = router.getCurrentNavigation().extras.state.loanScheme;
        this.loanTypeRoute = router.getCurrentNavigation().extras.state.loanRoute;
        console.log('my loan data',this.loanType)
        console.log('my loan data',this.loanTypeRoute)
        console.log('nav-params', router.getCurrentNavigation().extras.state);
      }
    });
  }       

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.userInfo = this.profileSrvc.getUserProfileData();
    console.log('iser info',this.userInfo)
  }

  async sendFeedback(selectedFeedback) {
     if(this.loanTypeRoute.loan_Category=="Personal"){
       this.loanTypeValue=0
       console.log('my loantypevalue is',this.loanTypeValue)
     }
     else if(this.loanTypeRoute.loan_Category=="Car"){
      this.loanTypeValue=1
      console.log('my loantypevalue is',this.loanTypeValue)
    }
    else if(this.loanTypeRoute.loan_Category=="Payday"){
      this.loanTypeValue=2
      console.log('my loantypevalue is',this.loanTypeValue)
    }
    const body = {
      loanType:this.loanTypeValue,
      phoneNumber: this.loanSrvc.formatPhoneAs234(this.userInfo.phoneNumber),
      reason: selectedFeedback.reason
    };
    console.log('my body',body)
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    this.pdayLoanService.sendLoanRejectionFeedback(body)
      .subscribe(res => {
        loader.dismiss()
        console.log('my resp',res)
        if (res.code === '00') {
          this.alertSrvc.showSuccessToast(res.message);
          this.router.navigate(['loans']);
        }
        else if (res.code !== '00') {
          this.alertSrvc.showErrorToast(res.message);
          this.router.navigate(['loans']);
        }
        else {
          this.alertSrvc.showSuccessToast('Something went wrong, please try again');
        }
      },
        err => {
          loader.dismiss()
          this.alertSrvc.showSuccessToast('Something went wrong, please try again');
        });

  }

  gotoDashBoard() {
    this.router.navigate(['loans']);
  }

}
