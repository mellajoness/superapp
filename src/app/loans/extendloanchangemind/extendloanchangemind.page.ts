import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import {LoanService} from 'src/app/services/loan/loan.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { ProfileService } from '../../services/user/profile.service'
@Component({
  selector: 'app-extendloanchangemind',
  templateUrl: './extendloanchangemind.page.html',
  styleUrls: ['./extendloanchangemind.page.scss'],
})
export class ExtendloanchangemindPage implements OnInit {
  loanDataResp:any;
  userInfo:any;
  phoneNumber:any
  feedback: object[] = [
    {id: 1, reason: 'Loan amount is too low'},
    {id: 2, reason: 'Loan interest is too high'},
    {id: 3, reason: 'Charges are too much'},
    {id: 4, reason: 'Loan term is too short'},
  ];
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
        this.loanDataResp = this.router.getCurrentNavigation().extras.state.loanType;
        console.log('my loan type is ', this.loanDataResp);
      }
    })
  }

  ngOnInit() {
    this.userInfo = this.profileSrvc.getUserProfileData();
    console.log('user data',this.userInfo)
    this.phoneNumber = this.profileSrvc.getUserPhone().replace(/^0+/, '234');;
    console.log('my exten phone no',this.phoneNumber);
  }

  async reason(val){
    const loader = await this.loaderSrvc.loadCtrl('');
  loader.present();
    console.log('Value', val);
    const note = val.reason;
    console.log('my body',note)
    const body = {
      loanType: this.loanDataResp,
      phoneNumber: this.phoneNumber,
      reason: note
   };
   console.log('my body',body);
   this.loanSrvc.rejectPaydayLoanExtension(body).subscribe(resp => {  
    loader.dismiss();
    console.log(' reject Response', resp);
      if (resp.responseCode === '00') {
        this.alertSrvc.showErrorToast(resp.message);
        this.router.navigate(['loans']);
      }   
      else if  (resp.responseCode !== '00'){
        this.alertSrvc.showErrorToast(resp.message);
        this.router.navigate(['loans']);
      }   
      else{
        this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
        this.router.navigate(['loans']);
      }   
      
  },
  err =>{
    console.log(err)
    loader.dismiss();
    this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
  }
   )
  }

  noReason(){
    this.router.navigate(['loans']);
  }

  back(){
    this.router.navigate(['loans/extendloandetails']);
  }

}
