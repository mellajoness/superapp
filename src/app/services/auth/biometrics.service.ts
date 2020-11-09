import { StorageService } from 'src/app/services/storage/storage.service';
import { Injectable } from '@angular/core';
import { FingerprintAIO, FingerprintOptions } from '@ionic-native/fingerprint-aio/ngx';
import { UserService } from '../user/user.service';
import { SharedData } from 'src/app/shared/shared.components';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class BiometricsService {

  isCordova;
  options: FingerprintOptions;

  private biometricsSubject = new BehaviorSubject<Boolean>(false);

  constructor(
    private faio: FingerprintAIO,
    private userService: UserService,
    private sharedData: SharedData,
    private platform: Platform,
    private storageService: StorageService

  ) {
    this.checkPlatform();
  }

  checkPlatform() {
    if (this.platform.is('cordova')) {
      this.isCordova = true;
    }
  }

  showBiometricsDialog() {
    let options = {
      clientId: 'fingerprint-Demo',
      clientSecret: 'password', //Only necessary for Android
      disableBackup: true  //Only for Android(optional)
    }

    const promise = new Promise((resolve, reject) => {
      if (this.sharedData.isBiometericsAvailable) {
        this.faio.show(options)
          .then((result: any) => {
            // console.log(result);
            resolve(result);
          })
          .catch((error: any) => {
            // console.log(error);
            reject(error);
          });
      }
    })
    return promise
  }

  enrol(token, userPhone?) {
    console.log("************   Biometric enrol called   ***************")
    const promise = new Promise((resolve, reject) => {
      this.showBiometricsDialog()
        .then(
          (res) => {
            this.userService.currentUserProfile.subscribe(
              (res: any) => {
                console.log(res);
                const bioToken = {
                  u: userPhone? userPhone : res.phoneNumber,
                  p: token
                }
                this.storageService.store('bioToken', bioToken);
                // this.sharedData.biometricEnrolled = true;
                this.updateBiometricSubject(true, 'biometricsService74');
                resolve();
              }
            )
            console.log(res);
          })
        .catch(
          (err) => {
            console.log(err);
            reject(err);
          }
        )
    })
    return promise
  }

  disenroll() {
    const promise = new Promise((resolve, reject) => {
      this.storageService.removeItem('bioToken');
      // this.sharedData.biometricEnrolled = false;
      this.updateBiometricSubject(false, 'biometricsService94');
      resolve();
    })
    return promise
  }

  checkBiometricsEnrolment() {
    this.storageService.get('isBiometricEnrolled')
      .then(
        (res: any) => {
          console.log
        }
      )
  }

  updateBiometricSubject(data: Boolean, where) {
    console.log('update called!', where)
    this.biometricsSubject.next(data);
  }

  get getBiometricSubject(): Observable<Boolean> {
    return this.biometricsSubject.asObservable();
  }
}
