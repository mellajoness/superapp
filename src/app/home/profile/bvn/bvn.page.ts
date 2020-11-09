import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ProfileService } from '../../../services/user/profile.service';
import { AlertService } from '../../../services/utilities/alert.service';
import { LoaderService } from '../../../services/utilities/loader.service';
import { SharedData } from 'src/app/shared/shared.components';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bvn',
  templateUrl: './bvn.page.html',
  styleUrls: ['./bvn.page.scss', '../../../../theme/payments.scss'],
})
export class BvnPage implements OnInit {
  userData;
  bvnForm: FormGroup;
  // bvn: FormControl;
  userPhone;
  postData = {
    bvn: null
  };

  successParams = {
    message: 'Your BVN was added successfully',
    // route: 'home'
    route: 'home/profile'
  };

  constructor(
    private userSrvc: UserService,
    private profileSrvc: ProfileService,
    private formBildr: FormBuilder,
    private alertSrvc: AlertService,
    private loaderSrvc: LoaderService,
    public sharedData: SharedData,
    private router: Router,
    ) { }

  ngOnInit() {
    this.bvnForm = this.formBildr.group({
      bvn: ['', Validators.minLength(10)]
    });
  }

  ionViewWillEnter() {
    this.userPhone =  this.profileSrvc.getUserPhone();
    console.log(this.userPhone);
  }

  async submitAction() {
    console.log(this.bvnForm);
    this.postData.bvn = parseInt(this.bvnForm.value.bvn, 10);
    await this.loaderSrvc.showLoader();
    this.profileSrvc._updateBvn(this.postData.bvn).subscribe(async (res: any) => {
      if (res) {
        await this.loaderSrvc.hideLoader();
        if (res.resultCode === '200') {
          console.log('Success ' , res);
          this.sharedData.userProfile.bvn = this.postData.bvn + "";
          this.presentModal();
        } else {
          // console.log('Network connection error');
          this.alertSrvc.showErrorToast(res.message);
          console.log('Error ' , res);
          // this.router.navigate(['home']);
        }
      } else {
        await this.loaderSrvc.hideLoader();
        console.log('Network connection error');
      }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Error Processing Request, try again later');
    });
  }

  presentModal() {
    this.alertSrvc.displayProfileSuccessModal(this.successParams.message, this.successParams.route);
  }

}
