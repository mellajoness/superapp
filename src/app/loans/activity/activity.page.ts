import { Component, OnInit } from '@angular/core';
import { ParentloanserviceService } from '../parentloanservice.service';
import { LoanService } from 'src/app/services/loan/loan.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  phoneNumber: any;
  userInfo:any
  activities: any;
  hasActivity: boolean;
  noActivites: boolean;
  debit: boolean;
  credit: boolean;

  constructor(
    private ParentLoanSrvc: ParentloanserviceService,
    private loanSrvc: LoanService,
    private profileSrvc: ProfileService,
    private router: Router,
    private menuCtrl: MenuController,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private storageService: StorageService,)
    {}
  

  ngOnInit() {
    this.phoneNumber = this.profileSrvc.getUserPhone();
    console.log(this.phoneNumber);
    this.userInfo = this.profileSrvc.getUserProfileData();
  }

  ionViewWillEnter(){
    this.activity()
  }

  goBack() {
    this.router.navigate(['loans']);
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
        this.hasActivity = true;

      //   for(var loan of this.activities){
      //     let debit = loan.type=="Debit";
      //     if(loan.type==="Debit"){
      //         this.debit==true;
      //     console.log('my debit',debit)
      //   }
      //    else if(loan.type==="Credit"){
      //       this.credit==true;
      //     }
      // }
          // if(this.activities.type==="Debit"){
          //   this.debit==true;
          // } 
          // else if(this.activities.type==="Credit"){
          //   this.credit==true;
          // }
      } else if (this.activities.length < 1) {
        this.noActivites = true;
      }

      console.log('Pay loan Response', resp);
    },
      err => {
        loader.dismiss()
        console.log(err);
        this.alertSrvc.showErrorToast('An unexpected error occured');
      }
    )
    }}
