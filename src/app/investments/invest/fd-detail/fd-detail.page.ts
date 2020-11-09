import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { InvestmentService } from 'src/app/services/investment/investment.service';
import { ModalController } from '@ionic/angular';
import { TransactionPinComponent } from '../../../components/transaction-pin/transaction-pin.component';

@Component({
  selector: 'app-fd-detail',
  templateUrl: './fd-detail.page.html',
  styleUrls: ['./fd-detail.page.scss'],
})
export class FdDetailPage implements OnInit {
  plan;

  postData = {
      tdAccount: '',
      phoneNumber: '',
      tranPIN: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private investmentSrvc: InvestmentService,
    private loaderService: LoaderService,
    private alertServcie: AlertService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      if ( this.router.getCurrentNavigation().extras.state) {
        this.plan =  this.router.getCurrentNavigation().extras.state.pageExtras;
      }
      console.log('params: ', this.plan);
    });
  }

  liquidateFD() {
    this.postData.phoneNumber = this.plan.phoneNumber;
    this.postData.tdAccount = this.plan.tdAccount;
    this.loaderService.showLoader();
    this.investmentSrvc.liquidateFD(this.postData).subscribe(res => {
      this.loaderService.hideLoader();
      if (res.response === '00') {
        this.alertServcie.displaySuccessModal('Liquidation successful', '/investments/landing');
      } else if (res.response === '434') {
      this.alertServcie.showErrorToastDown('Invalid Transaction PIN');
      } else {
        this.alertServcie.showErrorToast(res.errorMessage);
      }
    },  error => {
      this.loaderService.hideLoader();
      this.alertServcie.showErrorToast('Error Processing liquidation, Please try again');
    });
  }

  async displayPinModal(componentProps) {
    const modal = await this.modalCtrl.create({
      component: TransactionPinComponent,
      backdropDismiss: false,
      cssClass: 'tranPinModal',
      componentProps
    });

    modal.onDidDismiss()
      .then((data) => {
        if (data.data.dismissed) {
          console.log('dismissed');
          return;
        } else if (data) {
          console.log(data);
          const pin = data.data; //
          this.postData.tranPIN = pin;
          // console.log(this.postData);
          this.liquidateFD();
          // console.log(this.postData);
        }
    });

    return await modal.present();
  }

}
