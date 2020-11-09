import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { BiometricsService } from 'src/app/services/auth/biometrics.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
// import { TimelineMax } from 'gsap';

@Component({
  selector: 'app-biometric-setup',
  templateUrl: './biometric-setup.component.html',
  styleUrls: ['./biometric-setup.component.scss', '../../../theme/payments.scss'],
})
export class BiometricSetupComponent implements OnInit {

  successRoute;
  successMessage;
  ifBiometric;

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private router: Router,
    private biometricsService: BiometricsService,
    private storageService: StorageService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.successMessage = this.navParams.get('message');
    this.successRoute = this.navParams.get('route');
    this.start();
  }

  dismiss() {
    this.modalCtrl.dismiss();
    if (this.successRoute) {
      this.router.navigate([this.successRoute]);
    }
  }

  setupLater() {
    this.dismiss()
  }

  setupBiometric() {
    //ifBiometric = true if biometric enrollment is successfull, green chkmark appear
    //ifBiometric = false if biometric enrollment is failse, red chkmark appear
    //CALL this.dismiss() to route to homepage

    this.storageService.get('authToken')
      .then(
        (authToken) => {
          if (authToken) {
            this.storageService.get("userPhone").then(
              userPhone => {
                this.biometricsService.enrol(authToken, userPhone).then(
                  res => {
                    this.ifBiometric = true;
                  },
                  err => {
                    this.ifBiometric = false;
                    // this.alertService.showErrorToast('An error occurred. Try later.');
                  }
                )
              }
            )
          }
          else {
            this.ifBiometric = false;
            // this.alertService.showErrorToast('An error occurred. Try later.');
          }
        },
        err => {
          this.ifBiometric = false;
          // this.alertService.showErrorToast('An error occurred. Try later.');
        }
      )

    //HANDLE APPROPRIATELY

    // this.ifBiometric = false;
  }

  start() {
    // let gqTl = new TimelineMax({paused:true});
    // gqTl.staggerFromTo(".fingerprint path", 1,{autoAlpha: 0}, {autoAlpha: 1}, 0.1);
    // gqTl.play();
  }


}
