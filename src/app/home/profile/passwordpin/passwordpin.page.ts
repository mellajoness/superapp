import { Component, OnInit } from '@angular/core';
import { TransactionPinService } from '../../../services/security/transaction-pin.service';
import { ProfileService } from '../../../services/user/profile.service';
import { PasswordPinService } from 'src/app/services/security/password-pin.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-passwordpin',
  templateUrl: './passwordpin.page.html',
  styleUrls: ['./passwordpin.page.scss', '../../../../theme/payments.scss'],
})
export class PasswordpinPage implements OnInit {

  phoneNumber;

  constructor(
    private transPinService: TransactionPinService,
    private loadingService: LoaderService,
    private profileSrvvc: ProfileService,
    private passwordpinSrvc: PasswordPinService,
    private alertSrvc: AlertService
  ) { }

  ngOnInit() {
    this.phoneNumber = this.profileSrvvc.getUserPhone();
  }

  openPINSetup() {
    this.loadingService.showLoader();
    this.transPinService.checkTranPinStatus().subscribe(res => {
      this.loadingService.hideLoader();
      const resultCode = res.resultCode;
      const status = res.status;
      if (resultCode === '402' && status === false) {
        this.passwordpinSrvc.displaySetupPINModal(null);
        // this.alertServcie.displaySetupPINModal(this.plan);
      } else if (resultCode === '200') {
        this.alertSrvc.showErrorToast('PIN already Exists!');
      } else {
        this.alertSrvc.showErrorToast('Error Processing Request');
      }
    }, err => {
      this.loadingService.hideLoader();
    });
  }

  openForgotPIN() {
    this.passwordpinSrvc.displayForgotPINModal(null);
  }

  openForgotPassword() {
    this.passwordpinSrvc.displayForgotPasswordModal();
  }

  openChangePassword() {
    this.passwordpinSrvc.displayChangePWModal(null);
  }


}
