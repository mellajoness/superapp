import { Component, OnInit, ɵConsole, DoCheck, Input } from '@angular/core';
import { ProfileService } from '../../services/user/profile.service'
import { LoanService } from 'src/app/services/loan/loan.service';
import { Router, NavigationExtras } from '@angular/router';
import { MenuController } from '@ionic/angular';

import { IUser } from 'src/app/models/superApp/IUser';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import {ParentloanserviceService} from '../parentloanservice.service'
import { FORMERR } from 'dns';
import { StorageService } from 'src/app/services/storage/storage.service';
// import { Network } from '@capacitor/core';
import { Network } from '@ionic-native/network/ngx';
import { Console } from 'console';
@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit ,DoCheck {
  @Input() o;
  greeting: any;
  phoneNumber: any;
  totalLoanBalance: any;
  globalLimit: any;
  repayments: any;
  firstName: any;
  lastName: any;
  loanBalances = [];
  activities = [];
  isLoaded = false;
  hide = true;
  profile: any = {};
  profilePicture: any;
  carda = false;
  cardb = false;
  userInfo: IUser;
  isLoading: boolean;
  public dashboardData:any;
  private dashboardSubject: any;
  disconnectSubscription:any
  allData: any;
  bvn: any;
  custId: any;
  isStaff: any;
  accountNumber: any;
  hasActivities: boolean;
  public show:boolean = false;
  public buttonName:any = 'View All';
  constructor(
   
    private ParentLoanSrvc: ParentloanserviceService,
    private loanSrvc: LoanService,
    private profileSrvc: ProfileService,
    private router: Router,
    private menuCtrl: MenuController,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private storageService: StorageService,
    private network: Network
  ) { }

  ngOnInit() {
   
  }

  ngDoCheck() {
  //   if(this.loanBalances !== this.o.loanBalances){
  //     this.getDashboard()
  //   }
  // console.log('my do check ')
}

toggle() {
  this.show = !this.show;

  // CHANGE THE NAME OF THE BUTTON.
  if(!this.show)  
    this.buttonName = "View All";
  else
    this.buttonName = "Collapse";
}

 ionViewWillEnter() {
  this.networktest()
  console.log('my ionviewwillenter  ')
 
   const today = new Date();
   const currentHour = today.getHours();
   console.log('Hour', currentHour);
   if (currentHour < 12) {
      this.greeting = 'Morning';
    } else if (currentHour < 18) {
      this.greeting = 'Afternoon';
    } else {
      this.greeting = 'Evening';
    }
    this.phoneNumber = this.profileSrvc.getUserPhone();
    console.log(this.phoneNumber);
    this.userInfo = this.profileSrvc.getUserProfileData();
    this.getDashboard();
  
    // await this.getProfile(this.phoneNumber);
    // await this.getDashboard(this.phoneNumber);
    // this.isLoaded = true;
    // loader.dismiss();
    this.activity()
  }


getNewData(){
  this.ParentLoanSrvc.updateData(this.dashboardData)
}

networktest(){

  let disconnectSubscription = this.network.onDisconnect().subscribe(resp => {
    if(resp){
    console.log('network was disconnected :-(');
    this.alertSrvc.showErrorToast('no network');
    }
  });
  
  // stop disconnect watch
  disconnectSubscription.unsubscribe();
  console.log('my  oninit ')
  // this.alertSrvc.showErrorToast('no network');

}

ngOnDestroy(){
 this.getDashboard()
}
// ngAfterViewInit(){

// if (this.isLoading == true) {
//   this.getDashboard();
// }  
// }
 async getDashboard() {
    // this.loaderSrvc.showLoader();
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    let formattedPhone = this.loanSrvc.formatPhoneAs234(this.phoneNumber);
    this.ParentLoanSrvc.getDashBoardData(formattedPhone).subscribe(resp => {
      loader.dismiss();
      this.ParentLoanSrvc.setDashboardDataObservable(resp);
      console.log('my dasboard data', resp);
      this.bvn=resp.bvn
      this.custId=resp.custId
      this.isStaff=resp.isStaff
      this.accountNumber=resp.accountNumber
      this.globalLimit = resp.globalLimit;
      console.log('my', this.globalLimit);
      this.totalLoanBalance = resp.totalLoanBal;
      this.repayments = resp.repaymentSum;
      this.loanBalances = resp.loanBalances;
      console.log('my bvn', this.bvn);
      console.log('my custid', this.custId);
      console.log('my isStaff', this.isStaff);
      if (this.loanBalances) {
        if (this.loanBalances.length <= 2) {
          this.carda = true;
        } else if (this.loanBalances.length > 2) {
          this.cardb = true
        }
      }
      else{
        this.alertSrvc.showErrorToast(resp.message);
       
      }
      // this.activities = resp.activities;
      // if (this.activities.length > 0) {
      //   this.hasActivities = true;
      // }
      this.storageService.store('custId',this.custId);
      this.storageService.get('custId').then((val)=>{
      console.log('new cust id',val)
      }
      
      )
    },
      err => {
        loader.dismiss();
        this.alertSrvc.showErrorToast('An unexpected error occured. Kindly retry in a moment');
        loader.dismiss();
        console.log(err);
      })
  }

  
  async activity(){
    const loader = await this.loaderSrvc.loadCtrl('');
    loader.present();
    let formattedPhone = this.loanSrvc.formatPhoneAs234(this.phoneNumber);
    this.ParentLoanSrvc.getActivity(formattedPhone).subscribe(resp => {
      loader.dismiss()
      console.log('activity data', resp);
      this.activities = resp;
      if (this.activities.length > 0) {
        this.hasActivities = true;
       }
      //  else if (this.activities.length < 1) {
      //   this.noActivites = true;
      // }

      // console.log('Pay loan Response', resp);
    },
      err => {
        loader.dismiss();
        console.log(err);
        this.alertSrvc.showErrorToast('An unexpected error occured');
      }
    )
    }


  gotoSuperAppHome(){
    console.log('Hello SuperApp')
    this.router.navigate(['/home']);
  }

  goToHistory() {
    this.router.navigate(['loans/loanhistory']);
  }

  goToBalance(){
    this.router.navigate(['loans/checkbalance']);
  }

  payLoan(){
    this.router.navigate(['loans/payloan']);
  }

  goToActivity(){
    this.router.navigate(['loans/activity']);
  }

  goToTc(){
    this.router.navigate(['loans/loan-terms-conditions']);
  }

  extendLoan(){
    this.router.navigate(['loans/extendloan']);
  }
  gotoAllLoanOffers(){
    let dashboardData: NavigationExtras = {
      state: {
        bvn: this.bvn,
        custId:this.custId,
        isStaff:this.isStaff,
        accountNumber:this.accountNumber,
        totalLoanBal:this.totalLoanBalance
      }
    };
    this.router.navigate(['loans/all-loan-offers'],dashboardData);
  }

  gotoLonTopUpOffers(){
    let dashboardData: NavigationExtras = {
      state: {
        bvn: this.bvn,
        custId:this.custId,
        accountNumber:this.accountNumber,
        totalLoanBal:this.totalLoanBalance
      }
    };
      this.router.navigate(['loans/loan-topup'],dashboardData);
  }

  // toggleMenu(){
  //   this.menuCtrl.open('loan-menu');
  // }
  
  loanBalance(val) {
    let respData: NavigationExtras = {
      state: {
        dashboardData:val,
       
      }
    };
    this.router.navigate(['loans/loanbalance'],respData);
  }

  doRefresh(event) {
    this.getDashboard();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}

