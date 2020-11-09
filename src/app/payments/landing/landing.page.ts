import { PaymentsModel } from './../../models/trupay/payments';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, MenuController, IonSlides } from '@ionic/angular';
import { UserService } from 'src/app/services/user/user.service';
import { SharedData } from 'src/app/shared/shared.components';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { Handlers } from 'src/app/shared/handlers';
import { fade } from 'src/app/shared/animations';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss', '../../../theme/payments.scss'],
  animations: fade
})

export class LandingPage implements OnInit {

  pageReady;
  incomingImage;
  segment = {
    centerImage: null,
    topValue: null,
    bottomValue: null,
    top: null,
    bottom: null
  };
  state = 'in';
  counter = 0;
  enableAnimation = false;
  getAllUserAccountsSubscription;

  routes: Array<{ route, image, segment }>
  slideOptions = {
    // initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 100,
    disableOnInteraction: false
  };

  @ViewChild('slides', { static: false }) slides: IonSlides;


  constructor(
    private router: Router,
    private navCtrl: NavController,
    // private menuCtrl: MenuController,
    private alertSrvc: AlertService,
    public sharedData: SharedData,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    private loaderService: LoaderService,
    private paymentsModel: PaymentsModel
  ) {
    this.segment.top = "billspayments";
    this.segment.centerImage = `../../../assets/imgs/payments/billspayments.png`;
    this.intialize();
  }

  ngOnInit() {
    console.log(this.sharedData.userProfile);
    this.pageReady = false;
    this.loaderService.showLoader();
    // this.getUserData(this.sharedData.userPhone);

    // Check if accounts are already in shared Data. If not, try to get it again.
    if (this.sharedData.userAccounts) {
      console.log("Accounts previously fetched");
      this.pageReady = true;
      this.loaderService.hideLoader();
    }
    else {
      if (this.sharedData.userProfile.isFidelityCustomerValidated && !this.sharedData.userProfile.finaclePhoneNumber) {
        console.log("Accounts not found. Now fetching accounts");
        const data = {
          phoneNo: this.sharedData.userProfile.finaclePhoneNumber,
        }
        this.getUserAccounts(data);
      } else {
        console.log("User does not have finacle phone number");
        this.pageReady = true;
        this.loaderService.hideLoader();
      }
    }
  }

  ionViewWillEnter() {
    console.log("WILL ENTER PAYMENTS LANDING");
    this.slides.startAutoplay();
    this.segment.top = null;
    this.segment.bottom = null;
  }

  ionViewDidEnter() {
    this.sharedData.previousRoute = this.router.url;
    console.log("Previous route is DIDENTER ", this.sharedData.previousRoute);
  }

  slidesDidLoad(slides: IonSlides) {
    console.log("===================> SLIDES LOADED");
    slides.startAutoplay();
  }

  proceed(link) {
    if (link === 'payments/wallet') {
      if (this.sharedData.userProfile.walletAcctNumber) {
        this.navCtrl.navigateForward(link);
        this.sharedData.wallet.url = null;
      } else {
        this.alertSrvc.showErrorToast("User does not have a wallet account");
      }
    } else {
      this.navCtrl.navigateForward(link);
      this.sharedData.wallet.url = null;
    }
  }

  goBack() {
    this.navCtrl.navigateBack('home');
  }

  toggleMenu() {
    // this.menuCtrl.open('invest-menu');
  }

  getUserAccounts(data) {
    if (data && data.phoneNo) {
      this.getAllUserAccountsSubscription = this.billsPaymentsService.GetAllUserAccounts(data.phoneNo).subscribe(
        res => {
          this.sharedData.userAccounts = res;
          console.log(res);
          this.pageReady = true;
          this.loaderService.hideLoader();
        },
        err => {
          this.pageReady = false;
          this.loaderService.hideLoader();
          this.navCtrl.back();
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
        }
      );
    }
  }

  comingsoon() {
    this.navCtrl.navigateForward('payments/comingsoon');
  }

  segmentTopChanged(ev: any) {
    console.log('Segment TOP changed', ev);
    console.log('Opposiet is', this.segment.bottom);
    this.incomingImage = `./../../assets/imgs/payments/${ev}.png`;
    // this.incomingImage = `./../../assets/imgs/payments/${ev.detail.value}.png`;
    // this.segment.centerImage = `./../../assets/imgs/payments/${ev}.png`;
    console.log(this.segment.top);
    this.animate();
    setTimeout(() => {
      if (this.segment.bottom) {
        this.segment.bottom = null;
        console.log("nulled bottom");
      }
      this.go();
    }, 300);
  }


  segmentBottomChanged(ev: any) {
    console.log('Segment BOTTOM changed', ev);
    console.log('Opposiet is', this.segment.top);
    // this.segment.centerImage = `./../../assets/imgs/payments/${ev}.png`;
    // this.incomingImage = `./../../assets/imgs/payments/${ev.detail.value}.png`;
    this.incomingImage = `./../../assets/imgs/payments/${ev}.png`;
    console.log(this.segment.bottom);
    this.animate();
    setTimeout(() => {
      if (this.segment.top) {
        this.segment.top = null;
        console.log("nulled top");
      }
      this.go();
    }, 300);
  }

  animate() {
    this.enableAnimation = true;
    this.counter = 0;
    this.toggleState();
  }


  toggleState() {
    if (this.counter < 2) {
      this.state = this.state === 'in' ? 'out' : 'in';
      this.counter++;
    }
  }

  onDone($event) {
    if (this.enableAnimation) {
      if (this.counter === 1) {
        this.segment.centerImage = this.incomingImage;
      }
      this.toggleState();
    }
  }

  go(route?) {
    if (route && route.segment === 'top') {
      this.segment.top = route.route;
      this.segment.bottom = null;
    }
    else if (route && route.segment === 'bottom') {
      this.segment.bottom = route.route;
      this.segment.top = null;
    }
    console.log("GO WAS CALLED");
    console.log(this.segment.top || this.segment.bottom);
    if (this.segment.top) {

      if (this.segment.top === "sendmoney") {
        this.navCtrl.navigateForward(`payments/billspayments/sendmoney`);
      }
      else {
        // this.router.navigate([`payments/${this.segment.top}`]);
        this.navCtrl.navigateForward(`payments/${this.segment.top}`);
      }


    }
    else if (this.segment.bottom) {
      // this.router.navigate([`payments/${this.segment.bottom}`]);
      if (this.segment.bottom === "airtime") {
        this.loaderService.showLoader();
        this.sharedData.billsPaymentsMode = this.handlers.variables().airtime;
        this.sharedData.paymentType = this.handlers.variables().airtime;
        this.paymentsModel.getAllBillers().then(() => {
          this.loaderService.hideLoader();
          this.navCtrl.navigateForward(`payments/billspayments/forms`);
        }).catch(() => {
          this.loaderService.hideLoader();
        });
      }
      else if (this.segment.bottom === "borrowpower") {
        this.loaderService.showLoader();
        this.sharedData.billsPaymentsMode = this.handlers.variables().boropower;
        this.sharedData.paymentType = this.handlers.variables().boropower;
        this.paymentsModel.getAllBillers().then(() => {
          this.loaderService.hideLoader();
          this.navCtrl.navigateForward(`payments/billspayments/forms`);
        }).catch(() => {
          this.loaderService.hideLoader();
        });
      }
      else {
        this.navCtrl.navigateForward(`payments/${this.segment.bottom}`);
      }
    }
  }

  intialize() {
    this.routes = [
      {
        route: "billspayments",
        image: "../../../assets/imgs/payments/billspayments",
        segment: 'top'
      },
      {
        route: "travel",
        image: "../../../assets/imgs/payments/travel",
        segment: 'top'
      },
      {
        route: "insurance",
        image: "../../../assets/imgs/payments/insurance",
        segment: 'top'
      },
      {
        route: "tax",
        image: "../../../assets/imgs/payments/tax",
        segment: 'top'
      },
      {
        route: "shopping",
        image: "../../../assets/imgs/payments/shopping",
        segment: 'top'
      },
      {
        route: "airtime",
        image: "../../../assets/imgs/payments/airtime",
        segment: 'bottom'
      },
      {
        route: "education",
        image: "../../../assets/imgs/payments/education",
        segment: 'bottom'
      },
      {
        route: "remittance",
        image: "../../../assets/imgs/payments/remittance",
        segment: 'bottom'
      },
      {
        route: "borrowpower",
        image: "../../../assets/imgs/payments/borrowpower",
        segment: 'bottom'
      },
      {
        route: "more",
        image: "../../../assets/imgs/payments/more",
        segment: 'bottom'
      },
    ];
  }
}
