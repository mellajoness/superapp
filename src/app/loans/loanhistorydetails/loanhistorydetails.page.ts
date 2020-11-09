import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loanhistorydetails',
  templateUrl: './loanhistorydetails.page.html',
  styleUrls: ['./loanhistorydetails.page.scss'],
})
export class LoanhistorydetailsPage implements OnInit {
  loanHistoryDataResp: any;
  LoanTransHistory: any;
  LoanType: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
  ) { 
    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loanHistoryDataResp = this.router.getCurrentNavigation().extras.state.LoanHistoryResponseData;
        console.log('my loan type is ', this.loanHistoryDataResp);
        this.LoanTransHistory = this.loanHistoryDataResp.loanInstances;
        this.LoanType= this.loanHistoryDataResp.loanType;
        console.log('LOAN HISTORY', this.LoanTransHistory);
        console.log('LOAN type', this.LoanType);
      }
    })
  }

  ngOnInit() {
  }
  goBack() {
    this.router.navigate(['loans/loanhistory']);
  }
}
