import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILoanDisbursementStatus } from 'src/app/models/loan/ILoanDisbursementStatus';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-payday-disbursement-status-payday',
  templateUrl: './payday-disbursement-status-payday.page.html',
  styleUrls: ['./payday-disbursement-status-payday.page.scss'],
})
export class PaydayDisbursementStatusPaydayPage implements OnInit {
  disbursementStatus: any;
  constructor(activatedRoute: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    ) {
   activatedRoute.paramMap.subscribe(params => {
     if (router.getCurrentNavigation().extras.state) {

       this.disbursementStatus = router.getCurrentNavigation().extras.state;
       console.log('loan-disbursement-status', this.disbursementStatus);
     }
   });
  }

 ngOnInit() {
   
 }

 gotoDashBoard(){
   // this.navCtrl.navigateRoot(['loans']);
   this.router.navigate(['loans']);
 }

}
