import { Component, OnInit, Input } from '@angular/core';
import { ProfileService } from 'src/app/services/user/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IPaydayEligibilityCheckResp } from 'src/app/models/loan/IPaydayEligibilityCheckResp';
import { ModalController, NavParams } from '@ionic/angular';
import { PaydayLoanService } from 'src/app/services/loan/payday/payday-loan.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';

@Component({
  selector: 'app-creditcheckfailuremodal',
  templateUrl: './creditcheckfailuremodal.component.html',
  styleUrls: ['./creditcheckfailuremodal.component.scss'],
})
export class CreditcheckfailuremodalComponent implements OnInit {
  @Input() navparams: any;
  params: any
  loanTypeValue: number;
  constructor(private navParams: NavParams, private modalCtrl: ModalController,
    private pdayLoanService: PaydayLoanService,
    private router: Router,
    private alertSrvc: AlertService,
    private loaderSrvc: LoaderService)
     {
    this.params = navParams.get('navparams');
    
  }


  ngOnInit() {
    console.log('my failure params',this.params);
  }

async gotoDashboard(){
    this.router.navigate(['loans']);
    this.modalCtrl.dismiss();
  }

}
