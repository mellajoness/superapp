import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { CreditCheckComponent } from '../../modals/credit-check/credit-check.component';
import { LoanService } from 'src/app/services/loan/loan.service';
import { IDashboardInfo } from 'src/app/models/loan/IDashBoardInfo';
import { ProfileService } from 'src/app/services/user/profile.service';
import { NavigationExtras, Router,ActivatedRoute } from '@angular/router';
import {ParentloanserviceService} from '../../parentloanservice.service'
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
@Component({
  selector: 'app-all-loan-offers',
  templateUrl: './all-loan-offers.page.html',
  styleUrls: ['./all-loan-offers.page.scss'],
})
export class AllLoanOffersPage implements OnInit {

  dashboardData: IDashboardInfo;
  totalEligibleAmount: number;
  loanLists: any[] = [];
  phone: string;
  bvn: any;
  custId: any;
  isStaff: any;
  account_Number: any;
  totalloanbal: any;
  hasList: boolean;
  noList: boolean;

  constructor(private modalCtrl: ModalController, 
              private loanService: LoanService,
              private ParentLoanSrvc:   ParentloanserviceService,
              private profileSrvc: ProfileService,
              private router: Router,
              private navCtrl: NavController,
              private activatedRoute:ActivatedRoute,
              private loaderSrvc: LoaderService,
              private alertSrvc: AlertService,
              ) {
                activatedRoute.paramMap.subscribe(params => {
                  if (this.router.getCurrentNavigation().extras.state) {
                    this.bvn = this.router.getCurrentNavigation().extras.state.bvn;
                    this.custId = this.router.getCurrentNavigation().extras.state.custId;
                    this.isStaff = this.router.getCurrentNavigation().extras.state.isStaff;
                    this.account_Number = this.router.getCurrentNavigation().extras.state.accountNumber;
                    this.totalloanbal = this.router.getCurrentNavigation().extras.state.totalLoanBal
                    console.log('my lbvn is ', this.bvn);
                    console.log('my lcustId is ', this.custId);
                    console.log('my IisStaff is ', this.isStaff);
                    console.log('my account no is ', this.account_Number);
                    console.log('my totalloambal is ', this.totalloanbal);
                    
                  }
                })
               }

  async ngOnInit() {
    this.phone = this.loanService.formatPhoneAs234(this.profileSrvc.getUserPhone()); 
    console.log('my exten phone no',this.phone);
  }

  goBack(){
    this.router.navigate(['loans']);
  }

  ionViewWillEnter() {
    this.getLoanOffers()
    // this.ParentLoanSrvc.dashboardData.subscribe(data=>{
    //   if(data){
    //     this.dashboardData = data;
    //     this.loanLists = data.eligibleData.fastLoanOffer || [];
    //     this.totalEligibleAmount = data.eligibleData.totalEligibleAmount;
    //     console.log('my data from dashboard',data);
    //   }
    // });
  
    
  }

async getLoanOffers(){
  const loader = await this.loaderSrvc.loadCtrl('');
  loader.present();
  const body = {
    phonenumber:this.phone,
    custId:this.custId,
    account_Number:this.account_Number,
    isStaff:this.isStaff,
    bvn:this.bvn,
    channelId: 1
  };
  console.log('BODY', body);
  this.ParentLoanSrvc.getRequestLoan(body).subscribe(resp => { 
    loader.dismiss();
  console.log('BODY', resp);
   this.loanLists = resp.fastLoanOffer || [];
   if(this.loanLists.length>0){
     this.hasList= true;
   }
   else if (this.loanLists.length < 1){
      this.noList= true;
    }
   
   this.totalEligibleAmount = resp.totalEligibleAmount;
  }
  )
  err =>{
    console.log(err)
    loader.dismiss();
    this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
  }
}

  async doEligibiltyCheck(loan){

    if (loan.doCreditCheck===true) {
       const modal = await this.modalCtrl.create({
        component: CreditCheckComponent,
        showBackdrop: true,
        cssClass: 'loanCreditCheckModal',
        componentProps: {
          params: {
            loanCategory: loan.loan_Category,
            accountNumber: loan.account_Number,
            userMessage: loan.doCreditCheckMessage,
            customerId: this.custId,
            bvn: this.bvn,
            phone: this.phone,
            isTopUp: loan.isTopUp || false,
            parentRoute: 'loans/all-loan-offers'
          }
        }
        });
        
       return await modal.present();
    } 

    else if (!loan.doCreditCheck  && loan.loan_Category != 'Migo' && loan.loan_Category != 'Laptop') {
      let eligibilityInfo: NavigationExtras = {
        state: {
          intent: loan,
          bvn:this.bvn,
          custId:this.custId
        }
      };
      this.router.navigate(['loans/all-loan-offers/payday-application'], eligibilityInfo);
    } 

    else if (!loan.doCreditCheck  && loan.loan_Category == 'Laptop') {
      let eligibilityInfo: NavigationExtras = {
        state: {
          intent: loan,
          bvn:this.bvn,
          custId:this.custId
        }
      };
      this.router.navigate(['loans/laptop-loan'], eligibilityInfo);
    } 

    else {
      let eligibilityInfo: NavigationExtras = {
        state: {
          migoData: loan
        }
      };
      this.router.navigate(['loans/all-loan-offers/migos'], eligibilityInfo);
    }
    
  }

  migo(){
    this.router.navigate(['loans/all-loan-offers/migos'])
  }

}
