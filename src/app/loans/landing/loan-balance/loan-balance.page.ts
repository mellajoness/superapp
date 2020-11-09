import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { LoanService } from 'src/app/services/loan/loan.service';

@Component({
  selector: 'app-loan-balance',
  templateUrl: './loan-balance.page.html',
  styleUrls: ['./loan-balance.page.scss'],
})
export class LoanBalancePage implements OnInit {

  view: any;

  constructor(
    private profileSrvc: ProfileService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private loanSrvc: LoanService,
  ) { 
    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.view = this.router.getCurrentNavigation().extras.state.dashboardData;
        console.log('my loan data is ', this.view);
        let delta = Math.abs(this.view.dueDate - this.view.disbursedDate) / 1000;
        console.log('my delta 1',delta)
        // const days = Math.floor(delta / 86400);
        // delta -= days * 86400;
    
        // const hours = Math.floor(delta / 3600) % 24;
        // delta -= hours * 3600;
    
        // const minutes = Math.floor(delta / 60) % 60;
        // delta -= minutes * 60;
    
        // const seconds = delta % 60;
        // delta -= seconds;
        // console.log('Time Span', delta);
        // return delta;
      }
    })
  }

  ngOnInit() {
  }


  goBack() {
    
    this.router.navigate(['loans/checkbalance']);
  }

  payLoan(){
    this.router.navigate(['loans/payloan']);
  }

}
