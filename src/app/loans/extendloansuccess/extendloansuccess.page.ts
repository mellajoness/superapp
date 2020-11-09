import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { NavController ,MenuController} from '@ionic/angular';
@Component({
  selector: 'app-extendloansuccess',
  templateUrl: './extendloansuccess.page.html',
  styleUrls: ['./extendloansuccess.page.scss'],
})
export class ExtendloansuccessPage implements OnInit {
  loanDataResp:any;
  message: any;
  success = false;
  failed = false;
  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    public menu: MenuController,
  ) { 
    { 
      activatedRoute.paramMap.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.loanDataResp = this.router.getCurrentNavigation().extras.state.extendLoanResponse;

          console.log('pushed data response', this.loanDataResp);
        }
      })
     }
  }

  ngOnInit() {
    if(this.loanDataResp.responseCode === '00') {
      this.success = true;
      this.message = this.loanDataResp.message;
    }
    else {
      this.failed = true;
      this.message = this.loanDataResp.message;
    }
  }


  dashboard(){
    this.router.navigate(['loans'])
  }

}
