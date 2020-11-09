import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { ProfileService } from 'src/app/services/user/profile.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss', '../../../../theme/payments.scss'],
})
export class ConfirmPage implements OnInit {
  signupData: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loaderSrvc: LoaderService,
    private storageSrvc: StorageService,
    private profileSrvc: ProfileService,
    private alertSrvc: AlertService,
    private authSrvc: AuthService,
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.signupData = this.router.getCurrentNavigation().extras.state.pageExtras;
      }
      console.log('params: ', this.signupData);
    });
  }


  registerAction() {
    this.loaderSrvc.showLoader();
    console.log(this.signupData);

    this.authSrvc.signup(this.signupData).subscribe((res: any) => {
      if (res) {
        this.loaderSrvc.hideLoader();
        if (res.resultCode === '200') {
          this.profileSrvc.setUserPhone(this.signupData.phoneNumber);
          this.storePhoneNumber(this.signupData.phoneNumber);
          this.storageSrvc.store("authToken", this.signupData.password);
          this.router.navigate(['auth', 'sign-up', 'otp']);
          // this.router.navigate(['home', 'profile', 'bvn'], { replaceUrl: true });
         } else if (res.resultCode === '-400') {
           this.alertSrvc.showErrorToast('User Already Exists');
         } else if (res.resultCode === '600') {
           this.alertSrvc.showErrorToast('Phone number or Email already in use');
         } else {
          this.alertSrvc.showErrorToast(res.message);
         }
      }
    },  error => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Oops! Something went wrong, try again later');
    });
  }

  storePhoneNumber(value) {
    this.authSrvc.storeUserPhone(value);
  }

}
