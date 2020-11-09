import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/user/profile.service'
import { LoanService } from 'src/app/services/loan/loan.service';
import { NavigationExtras, Router } from '@angular/router';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';

@Component({
  selector: 'app-payloan',
  templateUrl: './payloan.page.html',
  styleUrls: ['./payloan.page.scss'],
})
export class PayloanPage implements OnInit {
  loanBalance: [];
  hasBalance = false;
  noBalance = false;
  customerId;
  phoneNumber;
  isLoading: boolean;

  constructor(
    private loanSrvc: LoanService,
    private profileSrvc: ProfileService,
    private router: Router,
    private alertSrvc: AlertService,
    private navCtrl: NavController,
    private storageService: StorageService,
    private loaderSrvc: LoaderService,
  ) { }

  ngOnInit() {
    this.storageService.get('custId').then((val)=>{
      this.customerId=val
      console.log('new cust id',val)
   })



    this.phoneNumber = this.loanSrvc.formatPhoneAs234(this.profileSrvc.getUserPhone());
    
  }

  ionViewWillEnter() {
    this.getLoan(this.phoneNumber);
  }

  paymentOptions(loan) {
    let loanType: NavigationExtras = {
      state: {
        selectedLoan: loan
      }
    };
    if (loan.loanType === 'Migo') {
      this.router.navigate(['loans'], loanType);
    }
    else {
      this.router.navigate(['loans/loanpaymenttype'], loanType);
    }

  }

  async getLoan(phoneNumber: string) {
   const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    this.loanSrvc.getLoanBalanceData(this.customerId, phoneNumber).subscribe(resp => {
      loader.dismiss();
      this.loanBalance = resp;
      if (this.loanBalance.length > 0) {
        this.hasBalance = true;
      } else if (this.loanBalance.length < 1) {
        this.noBalance = true;
      }

      console.log('Pay loan Response', resp);
    },
      err => {
        loader.dismiss()
        console.log(err);
        this.alertSrvc.showErrorToast('An unexpected error occured');
      }
    );
  }

  goBack(){
    this.navCtrl.navigateRoot(['loans']);
  }
}
