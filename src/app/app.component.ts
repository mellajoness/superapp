import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SharedData } from './shared/shared.components';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { AlertService } from './services/utilities/alert.service';
import { StorageService } from './services/storage/storage.service';
import { Router } from '@angular/router';

// import { Deploy } from 'cordova-plugin-ionic/dist/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public sharedData: SharedData,
    private appVersion: AppVersion,
    private faio: FingerprintAIO,
    private oneSignal: OneSignal,
    private fcm: FCM,
    private screenOrientation: ScreenOrientation,
    private alertSrvc: AlertService,
    private storageService: StorageService,
    private router: Router,
    // private deploy: Deploy
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.onBoarding();
      this.statusBar.styleBlackTranslucent();
      if (this.platform.is('ios')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#000000');
      }
      setTimeout(() => {
        this.splashScreen.hide();
      }, 2000);
      this.checkBiometricsAvailability();
      
      if (this.platform.is('cordova')) {
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
        this.storageService.get("can-deactive-notification").then(res => {
          if(!res) {this.setupPush();}
        })
      };

      this.deployMethod();

    });
    
  }

  async deployMethod() {
    // const info = await this.deploy.getCurrentVersion();
    // console.log(info);
  }
  
  checkBiometricsAvailability() {
    this.faio.isAvailable()
    .then(
      (result) => {
        console.log('FAIO availabilty is', result)
        this.sharedData.isBiometericsAvailable = true;
        // alert(result);
      }
      )
      .catch(
        (error) => {
          this.sharedData.isBiometericsAvailable = false;
          // alert(error)
      }
    )
  }
      
  setupPush() {
    this.storageService.get("app-notifications").then(storageNotifications => {
      this.sharedData.NOTIFICATIONS = storageNotifications;
    })
    this.fcmPermission();
    this.oneSignal.startInit("dc246002-33d9-446f-b046-5a37b9b50d0b", "649954096986");
    this.oneSignal.getIds().then((id) => {
      console.log("PLAYER ID BELOW")
      console.log(id.userId);
      this.sharedData.PLAYER_ID = id.userId;
    });

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived().subscribe((data: any) => {
      console.log(data);
      this.processNotification(data);
      console.log("NOTIFICATION DATA WILL BE HANDLED HERE")
    });

    this.oneSignal.handleNotificationOpened().subscribe((data: any) => {
      if (data.notification.payload.notificationID) {
        let global = this;
        this.storageService.get("app-notifications").then(function (notifications) {
          for (var i = 0; i < notifications.length; i++) {
            if (notifications[i].id === data.notification.payload.notificationID) {
              notifications[i].read = true;
              global.storageService.store('app-notifications', notifications);
              break;
            }
          }
          this.storageService.get("app-notifications").then(storageNotifications => {
            this.sharedData.NOTIFICATIONS = storageNotifications;
          })
        });
      }
    })

    this.oneSignal.endInit();
  }

  fcmPermission() {
    const w: any = window;
    console.log('starting to req permission for push notification');
    w.FCMPlugin.requestPushPermissionIOS(
      () => {
        console.log('FCM perm Requested');
      },
      (err) => {
        console.log('FCM perm rejected', err)
      }
    );
    console.log('finished req permission for push notification');
  }

  onBoarding() {
    this.storageService.get('onboarding').then(res => {
      // this.storageService.store('onboarding', null)
      this.sharedData.firstlaunch = res
      if (!res) {
        // this.alertSrvc.displayOnboarding(null, null)
        this.router.navigateByUrl('/auth/onboarding');
      }
    })
  }

  processNotification(data) {
    this.storageService.get("app-notifications").then(storageNotifications => {

      if (storageNotifications) {
        let notifications = storageNotifications
        // if (!this.available(data)) {
        if (this.available(data)) {
          let message = {};
          message['id'] = data.payload.notificationID;
          message['title'] = data.payload.title;
          message['body'] = data.payload.body;
          // message['module'] = data.payload.additionalData && data.payload.additionalData.data && data.payload.additionalData.data.module;
          message['module'] = data.payload.additionalData.data.module;
          message['image'] = data.payload.bigPicture && data.payload.bigPicture;
          message['href'] = data.payload.additionalData && data.payload.additionalData['href'];
          message['date'] = this.getddMMYYYY(new Date());
          message['read'] = false;
          notifications.push(message);
          notifications.reverse();

          this.storageService.store('app-notifications', notifications);
          this.storageService.get("app-notifications").then(storageNotifications => {
            this.sharedData.NOTIFICATIONS = storageNotifications
          })

        } else {
          console.log("Can't store this notification")
        }
      } else {
        let notifications = [];
        // if (!this.available(data)) {
        if (this.available(data)) {
          let message = {};
          message['id'] = data.payload.notificationID;
          message['title'] = data.payload.title;
          message['body'] = data.payload.body;
          // message['module'] = data.payload.additionalData && data.payload.additionalData.data && data.payload.additionalData.data.module;
          message['module'] = data.payload.additionalData.data.module;
          message['image'] = data.payload.bigPicture && data.payload.bigPicture;
          message['href'] = data.payload.additionalData && data.payload.additionalData['href'];
          message['date'] = this.getddMMYYYY(new Date());
          message['read'] = false;
          notifications.push(message);
          notifications.reverse();

          this.storageService.store('app-notifications', notifications);
          this.storageService.get("app-notifications").then(storageNotifications => {
            this.sharedData.NOTIFICATIONS = storageNotifications
          })

        }
      }
    })
  }

  getddMMYYYY = function (d) {
    let mons = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    var yyyy = d.getFullYear().toString();
    var mm = (d.getMonth() + 1); // getMonth() is zero-based
    var dd = d.getDate().toString();
    var hr = d.getHours();
    var mins = d.getMinutes().toString();
    let hrNow = hr > 12 ? (hr-12).toString() : hr.toString();
    let period = hr > 12 ? 'PM' : 'AM';
    let date = mons[mm] + ' ' + dd + ', ' + yyyy + ' at ' + hrNow + ':' + mins + period;
    return date;
  };

  available(data) {
    if(
      data.payload.title && 
      data.payload.body && 
      data.payload.additionalData && 
      data.payload.additionalData.data && 
      data.payload.additionalData.data.saveNotification) {
      return true
    }
  }
}
