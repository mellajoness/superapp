import { Component, OnInit } from '@angular/core';
import { IDashboardInfo } from 'src/app/models/loan/IDashBoardInfo';
import { NavigationExtras, Router, ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { CreditCheckComponent } from '../../modals/credit-check/credit-check.component';
import { ParentloanserviceService } from '../../parentloanservice.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-loan-topup',
  templateUrl: './loan-topup.page.html',
  styleUrls: ['./loan-topup.page.scss'],
})
export class LoanTopupPage implements OnInit {

  dashboardData: IDashboardInfo;
  totalEligibleAmount: number;
  loanLists: any[] = [];
  phone: string;
  accountNumber: any;
  isStaff: any;
  custId: any;
  bvn: any;
  myCustId: Promise<any>;
  testCustId: any
 
  
  constructor(private modalCtrl: ModalController, private loanService: LoanService,
    private profileSrvc: ProfileService,
    private ParentLoanSrvc: ParentloanserviceService,
    private loanSrvc: LoanService,
    private router: Router,
    private activatedRoute:ActivatedRoute,
    private storageService: StorageService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    ) { 
      activatedRoute.paramMap.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.bvn = this.router.getCurrentNavigation().extras.state.bvn;
          this.custId = this.router.getCurrentNavigation().extras.state.custId;
          this.accountNumber = this.router.getCurrentNavigation().extras.state.accountNumber;
          console.log('my lbvn is ', this.bvn);
          console.log('my lcustId is ', this.custId);
          console.log('my account no ', this.accountNumber);
          
        }
      })
    }

    goBack(){
      this.router.navigate(['loans']);
    }

   async ngOnInit() {
     this.storageService.get('custId').then((val)=>{
      this.custId=val
      console.log('new cust id',val)
   })

   this.storageService.get('bvn').then((val)=>{
    this.bvn=val
    console.log('new bnv',val)
 })
  
  }

  ionViewWillEnter() {
    this.getToUp()
    // this.ParentLoanSrvc.dashboardData.subscribe(data=>{
    //  this.ParentLoanSrvc.dashboardData.subscribe(data=>{
    //   if(data){
    //     this.dashboardData = data;
    //     this.loanLists = data.topUpOffer || [];
    //     let totalTopUpAmount: number = 0.00;
    //     for(var loan of this.loanLists){
    //       totalTopUpAmount = loan.total_Eligible_Amount;
    //     }
    //     this.totalEligibleAmount = totalTopUpAmount;
    //     console.log('my top up',data);
    //   }
    // });
    
    this.phone = this.loanService.formatPhoneAs234(this.profileSrvc.getUserPhone());
  }




async getToUp(){
  const loader = await this.loaderSrvc.loadCtrl('');
  loader.present();
  this.ParentLoanSrvc.getTopUpOffers(this.accountNumber).subscribe(resp =>{
    loader.dismiss();
    if(resp){
    this.loanLists=resp || [];
    console.log('loan list',this.loanLists)
    let totalTopUpAmount: number = 0.00;
    for(var loan of resp){
       totalTopUpAmount = loan.total_Eligible_Amount;
       console.log('my totaltop up amount', totalTopUpAmount)
      this.totalEligibleAmount = totalTopUpAmount;
      console.log('my totaleligible amount', this.totalEligibleAmount)
      console.log('test my cust id', this.storageService.get('custId'))
     
     
  }}
  err =>{
    console.log(err)
    this.loaderSrvc.hideLoader();
    this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
  }
}
  )
}





  async doEligibiltyCheck(loan){
  
   if (loan.loan_Category === 'KwikMoney') {
      let eligibilityInfo: NavigationExtras = {
        state: {
          intent: loan
        }
      };
      this.router.navigate(['loans/all-loan-offers/migos'], eligibilityInfo);
    }

    else if (loan.loan_Category !== 'KwikMoney') {
      let eligibilityInfo: NavigationExtras = {
        state: {
          intent: loan
        }
      };
      this.router.navigate(['loans/all-loan-offers/payday-application'], eligibilityInfo);
    }

    // else{
    //   const modal = await this.modalCtrl.create({
    //     component: CreditCheckComponent,
    //     showBackdrop: true,
    //     cssClass: 'loanCreditCheckModal',
    //     componentProps: {
    //       params: {
    //         loanCategory: loan.loan_Category,
    //         accountNumber: loan.account_Number,
    //         userMessage: loan.doCreditCheckMessage,
    //         customerId: this.custId,
    //         bvn: this.bvn,
    //         phone: this.phone,
    //         isTopUp: loan.isTopUp || true,
    //         parentRoute: 'loans/all-loan-offers'
    //       }
    //     }
    //     });
    //    return await modal.present();
    // }



  
  }}






//     if (loan.doCreditCheck) {
//        const modal = await this.modalCtrl.create({
//         component: CreditCheckComponent,
//         showBackdrop: true,
//         cssClass: 'loanCreditCheckModal',
//         componentProps: {
//           params: {
//             loanCategory: loan.loan_Category,
//             accountNumber: loan.account_Number,
//             userMessage: loan.doCreditCheckMessage,
//             customerId: this.dashboardData.eligibleData.customer_Id,
//             bvn: this.dashboardData.eligibleData.bvn,
//             phone: this.phone,
//             isTopUp: loan.isTopUp || true,
//             parentRoute: 'loans/all-loan-offers'
//           }
//         }
//         });
//        return await modal.present();
//     } 
//     else if (!loan.doCreditCheck  && loan.loan_Category != 'Migo') {
//       let eligibilityInfo: NavigationExtras = {
//         state: {
//           intent: loan
//         }
//       };
//       this.router.navigate(['loans/all-loan-offers/payday-application'], eligibilityInfo);
//     } 
//     else {
//       let eligibilityInfo: NavigationExtras = {
//         state: {
//           intent: loan
//         }
//       };
//       this.router.navigate(['loans/all-loan-offers/kwik-money'], eligibilityInfo);
//     }
    
//   }


// }
