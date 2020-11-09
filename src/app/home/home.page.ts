import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/user/profile.service';
import { SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../services/user/user.service';
import { SavingsService } from '../services/investment/savings.service';
import { AlertService } from '../services/utilities/alert.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuController, Platform, AlertController } from '@ionic/angular';
import { IUser } from '../models/superApp/IUser';
import { AuthService } from '../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { StorageService } from '../services/storage/storage.service';
import { SharedData } from '../shared/shared.components';
import { BackbuttonService } from 'src/app/services/backbutton/backbutton.service';
import { Constants } from '../config/constants';
import { constants } from 'os';
// import { SmsRetriever } from '@ionic-native/sms-retriever/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss', '../../theme/payments.scss'],
})
export class HomePage implements OnInit {
  userPhone;
  userProfile: IUser;
  photo: SafeResourceUrl;

  pages = [
    {
      url: '/home/accountscards',
      title: 'Accounts & Cards',
      icon: 'assets/icon/menu-icns/card.svg'
    },
    // {
    //   url: '/pages/referral',
    //   title: 'Referral',
    //   icon: 'assets/icon/menu-icns/gift.svg'
    // },
    // {
    //   url: '/pages/contact',
    //   title: 'Talk to Us',
    //   icon: 'assets/icon/menu-icns/text.svg'
    // },
    {
      url: '/home/settings',
      title: 'Settings',
      icon: 'assets/icon/menu-icns/Setting.svg'
    },
  ];

  subscription: Subscription;


  constructor(
    private profileSrvc: ProfileService,
    private router: Router,
    private userSrvc: UserService,
    private authSrvc: AuthService,
    private alertSrvc: AlertService,
    private menuCtrl: MenuController,
    private authServc: AuthService,
    private platform: Platform,
    private alertController: AlertController,
    private backBtnService: BackbuttonService,
    private storageService: StorageService,
    private sharedData: SharedData
  ) {
    this.backBtnPressed();
  }

  async ionViewWillEnter(){
    this.menuCtrl.enable(false, 'home-menu');
    // get user profile data
    this.getandSetUserProfileDetails();
    this.menuRadius();
  }

  ionViewDidEnter() {
    setTimeout(() => {
      console.log('Timeout ended');
      this.checkBVNStatus();
    }, 2000);

    // this.subscription = this.platform.backButton.subscribe(() => {
    //    this.presentExitApp();
    // });

  }

  getandSetUserProfileDetails() {
    this.userSrvc.getUserProfileData(this.userPhone).subscribe(res => {
      this.userProfile = res;
      this.userSrvc.setUserProfileData(res);
      this.checkFirstPayment();
    });
  }

  ngOnInit() {
    this.userPhone = this.profileSrvc.getUserPhone();
  }

  async presentExitApp() {
    this.alertSrvc.displayExitAppModal('Logout?', '/auth')
  }
  
  backBtnPressed() {
    this.subscription = this.platform.backButton.subscribeWithPriority(1, async() => {
      this.backBtnService.backPress();
    });
  }

  // async presentExitApp() {
  //   const alert = await this.alertController.create({
  //     header: 'Confirm!',
  //     message: 'Exit App?',
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         cssClass: 'secondary',
  //         handler: (blah) => {
  //           console.log('Confirm Cancel: blah');
  //         }
  //       }, {
  //         text: 'Yes',
  //         handler: () => {
  //           navigator['app'].exitApp();
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

  checkBVNStatus() {
    if (this.userProfile && !this.userProfile.isBvnSET) {
      this.alertSrvc.showErrorToast('Please update your BVN to perform transactions');
    }
  }


  navigate(url?) {
    if (url) {
      this.router.navigateByUrl(url);
      return;
    }
    this.router.navigateByUrl('/home/profile');
  }

  logout() {
    this.authSrvc.clearData();
    this.presentExitApp();
  }

  ionViewWillLeave() {
    this.menuCtrl.enable(false, 'home-menu');
    this.subscription.unsubscribe();
  }

  checkFirstPayment() {
    this.storageService.get(this.userProfile.custId + 'FirstPayment')
      .then(
        value => {
          console.log(value);
          if (value) {
            this.sharedData.firstPayment = false;
          } else {
            this.sharedData.firstPayment = true;
          }
        }
      )
  }

  menuRadius() {
    // setTimeout(() => {
    //   document.querySelector('ion-menu').shadowRoot.querySelector('.menu-inner').setAttribute('style', 'border-radius:0px 40px 40px 0px');
    // }, 2000);
  }
}
