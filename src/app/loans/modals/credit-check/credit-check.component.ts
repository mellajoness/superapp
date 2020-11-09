import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { ICreditCheckNavParams } from 'src/app/models/loan/ICreditCheckNavParams';
import { PaydayLoanService } from 'src/app/services/loan/payday/payday-loan.service';
import { Router, NavigationExtras } from '@angular/router';
import { IPaydayEligibilityCheckResp } from 'src/app/models/loan/IPaydayEligibilityCheckResp';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import {CreditcheckfailuremodalComponent  } from '../../modals/creditcheckfailuremodal/creditcheckfailuremodal.component';
@Component({
  selector: 'app-credit-check',
  templateUrl: './credit-check.component.html',
  styleUrls: ['./credit-check.component.scss'],
})
export class CreditCheckComponent implements OnInit {

  @Input() navparams: any;
  params: ICreditCheckNavParams;
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
    console.log('my params',this.params);
  }

  async reject() {
    this.modalCtrl.dismiss();
  }

  async accept() {
    if(this.params.loanCategory=="Personal"){
      this.loanTypeValue=0
      console.log('my loantypevalue is',this.loanTypeValue)
    }
    else if(this.params.loanCategory=="Car"){
     this.loanTypeValue=1
     console.log('my loantypevalue is',this.loanTypeValue)
   }
    else if(this.params.loanCategory=="Payday"){
     this.loanTypeValue=2
     console.log('my loantypevalue is',this.loanTypeValue)
   }

   else if(this.params.loanCategory=="Laptop"){
    this.loanTypeValue=7
    console.log('my loantypevalue is',this.loanTypeValue)
  }
    this.modalCtrl.dismiss();
    const reqParam = {
      phonenumber: this.params.phone,
      accountNumber: this.params.accountNumber,
      custId: this.params.customerId,
      bvn: this.params.bvn,
      loanType: this.loanTypeValue,
      isStaff: true,
      channelId: "FlashLendMobile"
    };
console.log('my body ',reqParam)
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    if (this.params.isTopUp) {
      this.pdayLoanService.doPaydayLoanTopUpEligibilityCheck(reqParam)
        .subscribe(async res => {
          console.log('mt topup url', res)
          loader.dismiss();
          let data: IPaydayEligibilityCheckResp = res;
          console.log('my data',data);
          let eligibilityInfo: NavigationExtras = {
            state: {
              intent: data,
              custId:'abcd',
              bvn: '233383838383',
              
            }
      
          };
          console.log('req cust',reqParam.custId)
          if (data.responseCode == '00' && this.params.loanCategory !=="Laptop" ) {
            this.router.navigate([`${this.params.parentRoute}/payday-application`], eligibilityInfo);
           
          }

          else if (data.responseCode == '00' && this.params.loanCategory =="Laptop" ) {
            this.router.navigate([`${this.params.parentRoute}/laptop-confirm-application`], eligibilityInfo);
           
          }
          else {
            // this.router.navigate([`${this.params.parentRoute}/payday-ineligibility-feedback`], eligibilityInfo);
            const modal = this.modalCtrl.create({
              component: CreditcheckfailuremodalComponent,
              showBackdrop: true,
              cssClass: 'CreditcheckfailuremodalComponent',
              componentProps: {
                params: {
                   loanCategory: res.message,
                  parentRoute: 'loans/all-loan-offers'
                
                }
              }
              });
              console.log('modal resssssssssssss',res)
             return await  (await modal).present();

          
          }
        },
          err => {
            this.loaderSrvc.hideLoader();
            this.reject();
          });
    }
    else {
      this.pdayLoanService.getPaydayLoanEligibilityByLoanType(reqParam)
        .subscribe(async res => {
          this.loaderSrvc.hideLoader();
          let data: IPaydayEligibilityCheckResp = res;
          let eligibilityInfo: NavigationExtras = {
            state: {
              intent: data
            }
          };
          console.log(data);
          if (data.responseCode == '00') {
            this.router.navigate([`${this.params.parentRoute}/payday-application`], eligibilityInfo);
          }
          else {
            // this.router.navigate([`${this.params.parentRoute}/payday-ineligibility-feedback`], eligibilityInfo);
            const modal = this.modalCtrl.create({
              component: CreditcheckfailuremodalComponent,
              showBackdrop: true,
              cssClass: 'CreditcheckfailuremodalComponent',
              componentProps: {
                params: {
                   loanCategory: res.message,
                  parentRoute: 'loans/all-loan-offers'
                }
              }
              });
              
             return await (await modal).present();
          
          }
        },
          err => {
            this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
            this.loaderSrvc.hideLoader();
            this.reject();
          })

    }

  }

}
