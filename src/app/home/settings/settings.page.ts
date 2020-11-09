import { StorageService } from 'src/app/services/storage/storage.service';
import { BiometricsService } from './../../services/auth/biometrics.service';
import { NavController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { SharedData } from 'src/app/shared/shared.components';
import { UserService } from 'src/app/services/user/user.service';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss', '../../../theme/payments.scss'],
})
export class SettingsPage implements OnInit {

  isCordova;
  settings;
  toggle_biometrics
  toggle_notifications;

  constructor(
    private navCtrl: NavController,
    private faio: FingerprintAIO,
    private platform: Platform,
    public sharedData: SharedData,
    private userService: UserService,
    private biometricsService: BiometricsService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
    this.checkPlatform();
    this.storageService.get("can-deactive-notification").then(res => {
      console.log(res)
      this.toggle_notifications = !res;
      console.log(!res);
    })
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // this.toggle_biometrics = this.sharedData.biometricEnrolled
    this.biometricsService.getBiometricSubject.subscribe(
      res => {
        this.toggle_biometrics = res;
      }
    )
  }

  ionViewWillLeave() {
    this.biometricsService.getBiometricSubject.subscribe(
      res => {
        console.log(res);
      }
    )

  }

  goBack() {
    this.navCtrl.back();
  }

  checkPlatform() {
    if (this.platform.is('cordova')) {
      this.isCordova = true;
    }
  }

  notifications() {

  }

  onToggle(e) {
    this.storageService.store('can-deactive-notification', !this.toggle_notifications);
  }

  toggleBiometrics(val?) {
    // if(val === this.sharedData.biometricEnrolled) {
    //   return;
    // }
    // if(val === this.toggle_biometrics) {
    //   return;
    // }
    if (val) {
      console.log('turn on')
      // this.biometricsService.enrol('Test1234@')
      this.storageService.get('authToken')
        .then(
          (res) => {
            if (res) {
              this.biometricsService.enrol(res)
                .then(() => {
                  this.alertService.showSuccessToast('Biometrics enabled successfully')
                })
                .catch(
                  (err) => {
                    console.log(err);
                    // this.sharedData.biometricEnrolled = false;
                    this.biometricsService.updateBiometricSubject(false, 'settings92');
                    this.toggle_biometrics = false;
                  }
                );
            }
            else {
              this.alertService.showErrorToast('An error occurred. Try later.');
              this.biometricsService.updateBiometricSubject(false, 'settings99');
              this.toggle_biometrics = false;
            }
          }
        )
    }
    else {
      console.log('turn off')
      // delete enrolment
      this.biometricsService.disenroll()
        .then(
          () => {
            // this.sharedData.biometricEnrolled = false;
            // this.biometricsService.updateBiometricSubject(false, 'settings112');
            this.toggle_biometrics = false;
          }
        )
        .catch(
          (err) => {
            console.log(err);
            this.toggle_biometrics = true;
            // this.sharedData.biometricEnrolled = this.sharedData.biometricEnrolled;
          }
        )
    }
  }

}
