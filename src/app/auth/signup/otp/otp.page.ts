import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/user/profile.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent } from 'ngx-countdown';
import { ModalController } from '@ionic/angular';
import { ConfirmPage } from '../confirm/confirm.page';
import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';
import { StorageService } from '../../../services/storage/storage.service';
import { UserService } from '../../../services/user/user.service';
import { AlertService } from '../../../services/utilities/alert.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BiometricSetupComponent } from 'src/app/components/biometric-setup/biometric-setup.component';
import { SharedData } from 'src/app/shared/shared.components';


@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss', '../../../../theme/payments.scss'],
})
export class OtpPage implements OnInit {
  otp: string;
  userPhone: any;

  showOtpComponent = true;
  @ViewChild('ngOtpInput', { static: false }) ngOtpInput: any;
  @ViewChild('countdown', { static: false }) counter: CountdownComponent;

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      width: '2rem',
      height: '2rem',
      color: '#000000',
    },
    containerClass: 'otp-container'
  };

  successParams = {
    message: 'Your account creation was successful',
    route: 'home'
  };

  // otp: string[] = [];
  status = 'start';

  constructor(
    public modalCtrl: ModalController,
    private smsRetriever: SmsRetriever,
    private storageService: StorageService,
    private userSrvc: UserService,
    private alertSrvc: AlertService,
    private loaderSrvc: LoaderService,
    private authSrvc: AuthService,
    private sharedData: SharedData,
    private profileSrvc: ProfileService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // get Phone number from signup-information
    this.storageService.get('userPhone').then((res: any) => {
      this.userPhone = res;
      console.log(this.userPhone);
    });
  }

  ionViewDidEnter() {
    // start sms listener
    this.retrieveSMS();
  }

  finishTest() {
    console.log('count down', this.counter);
    this.status = 'finished';
    this.counter.restart();
  }

  resetTimer() {
    this.counter.restart();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ConfirmPage,
    });

    await modal.present();
  }

  retrieveSMS() {
    console.log('Watching');
    this.smsRetriever.startWatching()
      .then((res: any) => {
        console.log(res);
        // Your OTP to complete your moneyzip operation is 062716 -/- CCi4EFsubhk
        this.otp = res.Message.toString().substr(39, 6);
        alert(`OTP Received - ${this.otp}`);
        this.verifyOTP();
      })
      .catch((error: any) => console.log(error));
  }

  onOtpChange(otp) {
    this.otp = otp;
    console.log(this.otp);
  }

  verifyOTP() {
    this.loaderSrvc.showLoader();
    this.userSrvc.verifyOTP(this.otp, this.userPhone).subscribe(res => {
      this.loaderSrvc.hideLoader();
      if (res.resultCode === '200') {
        const parsedMessage = JSON.parse(res.message);
        this.authSrvc.updateSessionIDSubject(parsedMessage.SessionID);
        this.authSrvc.updateTokenSubject(parsedMessage.Token);
        this.profileSrvc.setUserPhone(parsedMessage.MobilePhone);
        this.storeToken(res.Token);
        this.authSrvc.isAuthenticated = true;
        // this.alertSrvc.displaySuccessModal(this.successParams.message, '/auth/security-questions');
        this.router.navigate(['/', 'auth', 'security-questions']);
        // if (this.sharedData.isBiometericsAvailable) {
        //   this.alertSrvc.displayBiometricSetupModal(BiometricSetupComponent,this.successParams.message, '/home');
        // }
        // else {
        //   // this.alertSrvc.displaySuccessModal(this.successParams.message, '/home/profile/bvn');
        //   this.alertSrvc.displaySuccessModal(this.successParams.message, '/home');
        // }
      } else if (res.resultCode === '404' || res.resultCode === '-404') {
        this.alertSrvc.showErrorToast('Invalid OTP');
      } else if (res.resultCode === '600') {
        this.alertSrvc.showErrorToast('OTP has already been used');
      } else if (res.resultCode === '' && res.status === false) {
        this.alertSrvc.showErrorToast('Profile activation failed, due wallet creation failure.');
      } else {
        this.alertSrvc.showErrorToast(res.message);
      }
    }, err => {
      this.loaderSrvc.hideLoader();
      this.alertSrvc.showErrorToast('Oops! something went wrong!, please try again');
    });
  }

  storeToken(value) {
    this.userSrvc.storeToken(value);
  }

}
