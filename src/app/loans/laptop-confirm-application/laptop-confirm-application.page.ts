import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PaydayLoanService } from '../../services/loan/payday/payday-loan.service';
import { IPaydayEligibilityCheckResp } from '../../models/loan/IPaydayEligibilityCheckResp';
import { IPaydayLoanRepaymentCalcResp } from '../../models/loan/IPaydayLoanRepaymentCalcResp';
import { LoaderService } from '../../services/utilities/loader.service';
import { ProfileService } from '../../services/user/profile.service';
import { IDashboardInfo } from '../../models/loan/IDashBoardInfo';
import { LoanService } from '../../services/loan/loan.service';
import { Subscription } from 'rxjs';
// import { AlertService } from 'src/app/services/utilities/alert.service';
import { AlertService } from '../../services/utilities/alert.service';
import { IUser } from '../../models/superApp/IUser';
import {ParentloanserviceService} from '../parentloanservice.service'
import { StorageService } from '../../services/storage/storage.service';
import { CreditCheckComponent } from '../../loans/modals/credit-check/credit-check.component';
import { SucessmodalComponent } from '../../loans/modals/sucessmodal/sucessmodal.component';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-laptop-confirm-application',
  templateUrl: './laptop-confirm-application.page.html',
  styleUrls: ['./laptop-confirm-application.page.scss'],
})
export class LaptopConfirmApplicationPage implements OnInit {
  inputedLoanAmount: number;
  isTop: boolean;
  repaymentCalc: IPaydayLoanRepaymentCalcResp;
  eligibilityInfo: IPaydayEligibilityCheckResp;
  loanDashboardInfo: IDashboardInfo;
  dashBoardInfoSub$: Subscription;
  loanTypeId: number;
  channelId: number = 1;
  interestFee: number;
  topupTotalAmount: number;
  totalOutstandingLoan: number;
  userInfo: IUser;
  bvn: any
  custId:  any
  laptoploan: any;

  constructor(activatedRoute: ActivatedRoute, private router: Router,
    private pdayloanService: PaydayLoanService, private loader: LoaderService,
    private profile: ProfileService, private loanSrvc: LoanService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private ParentLoanSrvc:   ParentloanserviceService,
    private storageService: StorageService,
    private modalCtrl: ModalController
   
    )
     {
      activatedRoute.paramMap.subscribe(params => {
       if (router.getCurrentNavigation().extras.state) {

        let routeData = router.getCurrentNavigation().extras.state;
        // this.inputedLoanAmount = routeData.loanAmount;
        this.eligibilityInfo = routeData.eligibilityInfo;
        this.laptoploan = router.getCurrentNavigation().extras.state.laptoploanIndex
        
        console.log('laptop loan index', this.laptoploan);
        // console.log('payday-confirm-application', routeData);
        console.log('eligible infooo', this.eligibilityInfo);

        // this.bvn = this.router.getCurrentNavigation().extras.state.bvn;
        // this.custId = this.router.getCurrentNavigation().extras.state.custId;
        // console.log('my Paydaybvn is ', this.bvn);
        // console.log('my PaydaycustId is ', this.custId);
  
      }
    });
  }

  ngOnInit() {
    this.storageService.get('custId').then((val)=>{
      this.custId=val
      console.log('new cust id',val)
   })

   this.storageService.get('bvn').then((val)=>{
    this.bvn=val
    console.log('new bnv',val)
 })

    this.initLoanParams();
   
  }


  goBack(){
    this.router.navigate(['loans/all-loan-offers'])
  }

  ionViewWillEnter() {
    this.userInfo = this.profile.getUserProfileData();
    this.dashBoardInfoSub$ = this.ParentLoanSrvc.dashboardData.subscribe(data=>{
    this.loanDashboardInfo = data;
    // console.log('dasboard indo',this.loanDashboardInfo)
 
    });
  }



  // getDashboard() {
  //   let formattedPhone = this.loanSrvc.formatPhoneAs234(this.userInfo.phoneNumber)
  //   this.ParentLoanSrvc.getDashBoardData(formattedPhone).subscribe(resp => {
  //     console.log('my dasboard data', resp);
  //     this.bvn=resp.bvn
  //     this.custId=resp.custId
  //     console.log('my bvn', this.bvn);
  //     console.log('my custid', this.custId); 
     
  //   },
  //     err => {
  //       this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
       
  //       console.log(err);
  //     })
  // }






  ionViewWillLeave(){
    this.dashBoardInfoSub$.unsubscribe();
  }

 

  async initLoanParams() {
    console.log('eligibility info',this.eligibilityInfo);
    if (this.eligibilityInfo.loan_Category === 'Personal') {
      this.loanTypeId = 0;
      this.totalOutstandingLoan = this.inputedLoanAmount + this.interestFee;
    }
    else if (this.eligibilityInfo.loan_Category === 'Car') {
      this.loanTypeId = 1;
      this.totalOutstandingLoan = this.inputedLoanAmount + this.interestFee;
    }
    else if (this.eligibilityInfo.loan_Category === 'Payday') {
      this.loanTypeId = 2;
      this.totalOutstandingLoan = this.inputedLoanAmount;
    }
    else if (this.eligibilityInfo.loan_Category === 'POT') {
      this.loanTypeId = 6;
      this.totalOutstandingLoan = this.inputedLoanAmount;
    }

    else if (this.eligibilityInfo.loan_Category === 'Laptop') {
      this.loanTypeId = 7;
      this.totalOutstandingLoan = this.inputedLoanAmount;
    }

    await this.repaymentCalculator().then(res => {
      console.log('res', res)
      if (this.eligibilityInfo.isTopUp) {
        this.secondRepaymentCalculator().subscribe(result => {
          if (result) {
            this.repaymentCalc = result;
            console.log('SECOND PRINCIPAL', result);
            this.topupTotalAmount = parseFloat((this.repaymentCalc.principal));
            this.interestFee = parseFloat((this.topupTotalAmount) + (this.repaymentCalc.interestAmount) +
              ((this.topupTotalAmount) * ((this.eligibilityInfo.managementRate) / 100)) +
              ((this.topupTotalAmount) * ((this.eligibilityInfo.insuranceRate) / 100)));
          }
        },
        err=> {
          this.alertSrvc.showErrorToast('Error calculating repayment information');
          console.log('Error reaching the repayment calculator api for the second time');
        });
      }
      else {
        console.log('repaymentcalc',this.repaymentCalc)
        this.repaymentCalc.isTopupInterestFee =
          (parseFloat((this.repaymentCalc.interestAmount) + ((this.eligibilityInfo.managementRate) / 100)
            *
            ((this.repaymentCalc.principal)) + ((this.eligibilityInfo.insuranceRate) / 100)
            *
            (this.repaymentCalc.principal)));
        this.interestFee = parseFloat(this.repaymentCalc.isTopupInterestFee) + parseFloat(this.repaymentCalc.principal);
        this.isTop = true;
      }
    },
    err=> {
      this.alertSrvc.showErrorToast('Error calculating repayment information');
      console.log('Error calculating repayment params');
    });

  }

  async repaymentCalculator() {
    return new Promise<IPaydayLoanRepaymentCalcResp>((resolve, reject)=>{
      const repaymentReq = {
        repaymentMode: this.eligibilityInfo.repaymentMode,
        interestRate: this.eligibilityInfo.interestRate,
        loanTenor: this.eligibilityInfo.tenorMonth,
        principalAmount: this.inputedLoanAmount
      };
      this.pdayloanService.calculatePaydayLoanRepayment(repaymentReq)
        .subscribe(res => {
          console.log('REPAYMENT CALC Response', res);
          if (res) {
            this.repaymentCalc = res;
            this.isTop = true;
            resolve(this.repaymentCalc);
          }
          else reject(null);
        },
        err => {
          console.log('Error connecting to paydayloan repayment calculator service');
          reject(null);
        });

    });
  }

  secondRepaymentCalculator() {
    const repaymentCalcReq = {
      repaymentMode: this.eligibilityInfo.repaymentMode,
      interestRate: this.eligibilityInfo.interestRate,
      loanTenor: this.eligibilityInfo.tenorMonth,
      principalAmount: this.inputedLoanAmount + this.eligibilityInfo.amount_Taken
    };

    return this.pdayloanService.calculatePaydayLoanRepayment(repaymentCalcReq);
  }

  async disbursePaydayLoan() {
    const paydayLoanDisbusmentReq = {
      phoneNumber: this.loanSrvc.formatPhoneAs234(this.userInfo.phoneNumber),
      // cifId: this.loanDashboardInfo.eligibleData.customer_Id,
      cifId: this.custId,
      foracid: this.eligibilityInfo.account_Number,
      amount: this.laptoploan.amount,
      type: this.loanTypeId,
      isStaff: true, // Instructed to hardcode for now by Olushina Ayeni
      staffId: '', //Hardcoded value
      bvnIdentification: this.bvn,
      isTopUp: this.eligibilityInfo.isTopUp,
      channelId: this.channelId,
      loanScheme: this.eligibilityInfo.loanScheme,
    };
    
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    console.log('body', paydayLoanDisbusmentReq)
    await this.pdayloanService.disbursePaydayLoan(paydayLoanDisbusmentReq)
      .subscribe(async resp => {
        loader.dismiss();
        console.log('Disburse Response', resp);
        let disbursementStatus: NavigationExtras = {
          state: {
            isSuccess: resp.responseCode == '00' ? true : false,
            message: resp.message,
            loanInterestFee: this.interestFee,
            elegibleData:this.eligibilityInfo
            
            
          }
        };
      if(resp.responseCode==="00"){
        const modal = await this.modalCtrl.create({
          component: SucessmodalComponent,
          // showBackdrop: false,
          backdropDismiss:false,
          // backdrop-dismiss:false,
          cssClass: 'loanSuccessModal',
          componentProps: {
            params: {
              isSuccess: resp.responseCode === '00' ? true : false,
              message: resp.message,
              loanInterestFee: this.interestFee,
              elegibleData:this.eligibilityInfo,
              
            }
          }
          });
          
         return await modal.present();
      }
      else{
        this.alertSrvc.showErrorToast(resp.message);
      }
      },
        err => {
          this.loaderSrvc.hideLoader();
          this.alertSrvc.showErrorToast('An error occoured. kindly retry in a moment');
          console.log('Error disbursing loan', err)
      });
  }

  declineLoan(){
    let loanType: NavigationExtras = {
      state: {
        loanScheme: this.eligibilityInfo.loanScheme,
        loanRoute: this.eligibilityInfo
      }
    };
    this.router.navigate(['loans/loan-rejection-reason'], loanType);
  }

  openTermsAndConditions(){
    this.router.navigate(['loans/terms']);
  }

}
