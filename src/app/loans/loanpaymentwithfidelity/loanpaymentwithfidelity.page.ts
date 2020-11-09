import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { LoanService } from 'src/app/services/loan/loan.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { PayloansuccessmodalComponent } from 'src/app/loans/modals/payloansuccessmodal/payloansuccessmodal.component';
import { PayloanfailuremodalComponent } from 'src/app/loans/modals/payloanfailuremodal/payloanfailuremodal.component';
@Component({
  selector: 'app-loanpaymentwithfidelity',
  templateUrl: './loanpaymentwithfidelity.page.html',
  styleUrls: ['./loanpaymentwithfidelity.page.scss'],
})
export class LoanpaymentwithfidelityPage implements OnInit {
  loanData: any
  operativeAccount: any;
  loanBalance: any;
  loanAccount: any;
  amount: any;
  account: any;
  resp: any
  constructor(
    public menu: MenuController,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loanSrvc: LoanService,
    private navCtrl: NavController,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private modalCtrl: ModalController,
    
  ) {

    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.loanData = this.router.getCurrentNavigation().extras.state.selectedLoan;

        console.log('data from ;LAST', this.loanData);
      }
    });
  }


  ngOnInit() {
    this.loanBalance = this.loanData.totalOutstanding;
    this.loanAccount = this.loanData.loanId
  }


  async payment() {
    if (!this.account) {
      this.alertSrvc.showErrorToast('Please select an account');
      return;
    }
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    const body = {
      loanAccount: this.loanAccount,
      amount: this.loanBalance,
      operativeAccount: this.account
    };
    this.loanSrvc.payLoan(body).subscribe(async resp => {
      console.log('my resp payloan',resp)
      loader.dismiss();
      if (resp.responseCode === '00') {
        const modal = await this.modalCtrl.create({
          component: PayloansuccessmodalComponent,
          backdropDismiss:false,
          cssClass: 'payloanSuccessModal',
          componentProps: {
            params: {
              response: resp
            
            }
          }
          });
          
         return await modal.present();
      } 
      else if (resp.responseCode === '01') {
        const modal = await this.modalCtrl.create({
          component: PayloanfailuremodalComponent,
          backdropDismiss:false,
          cssClass: 'payloanSuccessModal',
          componentProps: {
            params: {
              response: resp
            
            }
          }
          });  
         return await modal.present();
        }


        else {
          const modal = await this.modalCtrl.create({
            component: PayloanfailuremodalComponent,
            backdropDismiss:false,
            cssClass: 'payloanSuccessModal',
            componentProps: {
              params: {
                response: resp
              
              }
            }
            });  
           return await modal.present();
          }

       
    },
    err=>{
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
    });
  }

  goBack() {
    this.navCtrl.navigateBack(['loans/loanpaymenttype']);
  }

}
