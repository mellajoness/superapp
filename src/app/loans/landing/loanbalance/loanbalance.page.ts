import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { LoanService } from 'src/app/services/loan/loan.service';

@Component({
  selector: 'app-loanbalance',
  templateUrl: './loanbalance.page.html',
  styleUrls: ['./loanbalance.page.scss'],
})
export class LoanbalancePage implements OnInit {
 
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
    
    this.router.navigate(['loans']);
  }

  payLoan(){
    this.router.navigate(['loans/payloan']);
  }

}
