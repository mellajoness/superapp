import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-successorfailure',
  templateUrl: './successorfailure.page.html',
  styleUrls: ['./successorfailure.page.scss'],
})
export class SuccessorfailurePage implements OnInit {
  loanDataResp:any
  anyResponse: any;
  success = false;
  failed = false;
  caution = false;
  responseMsg: any;
  msg: any;
  
  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
  ) 
  { 
    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loanDataResp = this.router.getCurrentNavigation().extras.state.selectedLoanResponse;

        console.log('success or failure data', this.loanDataResp);
      }
    }
    );
  }

  ngOnInit() {
    if(this.loanDataResp.responseCode === '00') {
      this.success = true;
      this.responseMsg = this.loanDataResp.message;
    }
    else if (this.loanDataResp.responseCode === '01') {
      this.failed = true;
      this.responseMsg = this.loanDataResp.message;
    } else {
      this.caution = true;
      this.responseMsg = this.loanDataResp.message;
    }
    console.log('Any Response', this.loanDataResp);
  }

  landing(){
    this.navCtrl.navigateBack(['loans']);
  }

}
