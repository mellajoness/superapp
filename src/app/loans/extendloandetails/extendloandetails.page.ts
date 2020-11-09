import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,NavigationExtras } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import {LoanService} from 'src/app/services/loan/loan.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { ExtenloansuccessmodalComponent } from 'src/app/loans/modals/extenloansuccessmodal/extenloansuccessmodal.component';
@Component({
  selector: 'app-extendloandetails',
  templateUrl: './extendloandetails.page.html',
  styleUrls: ['./extendloandetails.page.scss'],
})
export class ExtendloandetailsPage implements OnInit {
  loanDataResp:any;
  extendLoanBody:any;
  phonenumber: any;
  custId: any;
  isStaff: any;
  accountNumber: any;
  recordId: any;
  channelId = 1;
  loanTypeValue: number;
  constructor(
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private loanSrvc: LoanService,
    private modalCtrl: ModalController
  )
   { 
    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loanDataResp = this.router.getCurrentNavigation().extras.state.extendLoanResponse;
        this.extendLoanBody=this.router.getCurrentNavigation().extras.state.extendLoanBody;
        console.log('pushed data from extendloan', this.loanDataResp);
        console.log(' body pushed data from extendloan', this.extendLoanBody);
      }
    })
   }

  ngOnInit() {
   
  }

  async accept(){
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    const body={
    phonenumber: this.extendLoanBody.phonenumber,
    loanType: this.extendLoanBody.loanType,
    channelId: 'flashLendMobile',
    cifId: this.extendLoanBody.cifId,
    isStaff: this.extendLoanBody.isStaff,
    foracid: this.extendLoanBody.foracid,
    recordId: this.loanDataResp.recordId
  };
  console.log('PUSHED BODY FROM EXTENDLOAN PAGE', body);
  this.loanSrvc.acceptPaydayLoanExtension(body).subscribe(async resp => { 
       
    loader.dismiss();
    console.log(' accept Response', resp);
      if (resp.responseCode === '00') {
        const modal = await this.modalCtrl.create({
          component: ExtenloansuccessmodalComponent,
          backdropDismiss:false,
          cssClass: 'extendsuccesssModal',
          componentProps: {
            params: {
              response: resp
              
            }
          }
          });
          
         return await modal.present();
      }
      else{
        this.alertSrvc.showErrorToast(resp.message);
      }
        
      //   let respData: NavigationExtras = {
      //     state: {
      //       extendLoanResponse: resp,
      //       extendLoanBody:body
      //     }
      //   };
       
      //   this.router.navigate(['loans/extendloansuccess'],respData);
      // }  

      
      
  },
  err =>{
    console.log(err)
    this.loaderSrvc.hideLoader();
    this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
  }
  )
  }

  changed(){
    let respData: NavigationExtras = {
      state: {
        loanType: this.extendLoanBody.loanType,
        
      }
    };
   
    this.router.navigate(['loans/extendloanchangemind'],respData);
  }

  goBack(){
    this.router.navigate(['loans/extendloan'])
  }

  terms() {
    this.router.navigate(['loans/terms']);
  }


}
