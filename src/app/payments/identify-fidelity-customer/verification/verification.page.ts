import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { UserService } from './../../../services/user/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Handlers } from 'src/app/shared/handlers';
import { SharedData } from 'src/app/shared/shared.components';
import { ProfileService } from 'src/app/services/user/profile.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { AccountService } from 'src/app/services/superapp/account.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.page.html',
  styleUrls: ['./verification.page.scss', '../../../../theme/payments.scss'],
})
export class VerificationPage implements OnInit {
  @ViewChild('ngOtpInput', {static: false}) ngOtpInput: any;
  otp;
  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '2rem',
      'height': '2.5rem',
      'border': 'none',
      'border-bottom': '2px solid',
      'border-radius': '0px',
      'margin': '0px 0.5rem'
    }
  };

  constructor(
    public handlers: Handlers,
    private sharedData: SharedData,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private alertService: AlertService,
    private userService: UserService,
    private accountService: AccountService,
    private router: Router,
    private smsRetriever: SmsRetriever,
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.retrieveSMS();
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp.length);
  }

  retrieveSMS() {
    console.log('Watching');
    this.smsRetriever.startWatching()
     .then((res: any) => {
       console.log(res);
       // Your OTP to complete your moneyzip operation is 062716 -/- CCi4EFsubhk
       this.otp = this.handlers.extractOTP(res.Message);
       alert(`OTP Received - ${this.otp}`);
       this.submit();
     })
     .catch((error: any) => console.log(error));
   }

  submit() {
    this.loaderService.showLoader();
    this.profileService.profileFidelityCustomer_VerifyToken(this.otp)
    .subscribe(
      (res:any) => {
        if(res.status){
          // this.handlers.hide();
          this.profileService.userProfileData
          .subscribe(
            (res: any) => {
              console.log(res)
              res['isFidelityCustomerValidated'] = true;
              res ['finaclePhoneNumber'] = this.sharedData.fidelityPhoneNumber;

              // User profile updated with verified phone number
              this.profileService.setUserProfileData(res);
              this.sharedData.userProfile['isFidelityCustomerValidated'] = true;
              this.sharedData.userProfile['finaclePhoneNumber'] = this.sharedData.fidelityPhoneNumber;
            }
          )
          if(this.sharedData.fidelityPhoneNumber) {
            this.userService.getAllAccounts(this.sharedData.fidelityPhoneNumber)
            .subscribe(
              (res:any) => {
                this.sharedData.userAccounts = res;
                if (this.sharedData.userAccounts && this.sharedData.userAccounts.length < 1) {
                  this.alertService.showErrorToast('Accounts could not be fetched at this time, please try again later');
                } else if (this.sharedData.userAccounts && this.sharedData.userAccounts.length > 0) {
                  console.log('ACCOUNT FETCHED')
                  if (this.sharedData.wallet.pageView === 'fundwallet-bank') {
                    this.router.navigate(['payments/wallet/fundwallet/accounts'])
                    // this.sharedData.wallet.pageView = null;
                  } else if (this.sharedData.wallet.pageView === 'withdrawal') {
                    this.router.navigate(['payments/wallet/withdrawal'])
                    // this.sharedData.wallet.pageView = null;
                  }
                }
                this.loaderService.hideLoader();
                this.handlers.hide();
                this.accountService.updateAccounts(res);
                this.alertService.showSuccessToast("Verification successful");
              },
              err => {
                console.log(err);
                this.loaderService.hideLoader();
                this.handlers.hide();
                this.alertService.showErrorToast("An error occurred. Please try again later");
              }
            )
          }
        }
        else {
          this.alertService.showErrorToast(res.message);
        }
        console.log(res);
      },
      err => {
        this.loaderService.hideLoader();
        console.log(err);
      }
    )
  }

}
