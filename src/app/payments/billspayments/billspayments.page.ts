import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { BillsmodalComponent } from '../../components/billsmodal/billsmodal.component';
import { SharedData } from 'src/app/shared/shared.components';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Handlers } from 'src/app/shared/handlers';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { CustomalertComponent } from 'src/app/components/customalert/customalert.component';

@Component({
  selector: 'app-billspayments',
  templateUrl: './billspayments.page.html',
  styleUrls: ['./billspayments.page.scss', '../../../theme/payments.scss'],
})
export class BillspaymentsPage implements OnInit {

  @ViewChild(IonRouterOutlet, { static: false }) routerOutlet: IonRouterOutlet

  allBillersdata = {
    isBorrowService: false,
    userId: this.sharedData.userProfile.phoneNumber,
    channelId: "trupay",
    userToken: this.sharedData.TOKEN + '::' + this.sharedData.SESSIONID
  }

  allBillers;
  getBillersSubscription;

  constructor(
    public modalController: ModalController,
    public sharedData: SharedData,
    private router: Router,
    private navCtrl: NavController,
    public handlers: Handlers,
    private billsPaymentsService: BillspaymentsService,
    private alertSrvc: AlertService,
  ) {

    this.sharedData.previousRoute = this.router.url

  }

  presentModal(modalCSS) {
    this.handlers.presentModal(modalCSS, BillsmodalComponent)
  }

  ngOnInit() {
    this.getAllBillers();
  }

  ionViewWillEnter() {
    this.sharedData.previousRoute = this.router.url
    this.sharedData.paymentObj = null;
    this.sharedData.paymentInfo = null;

    console.log('WINDOW HISTORY')
    console.log(window.history)
    console.log(window.history.length);
    console.log(this.routerOutlet);
  }

  ionViewWillLeave() {
    this.getBillersSubscription && this.getBillersSubscription.unsubscribe();
  }

  
  boroPower(mode) {
    this.sharedData.billsPaymentsMode = mode;
    this.sharedData.paymentType = mode;
    this.navCtrl.navigateForward('payments/billspayments/forms');
  }
  
  utilities(mode) {
    this.sharedData.billsPaymentsMode = mode;
    this.navCtrl.navigateForward('payments/billspayments/utilities');
  }

  comingsoon() {
    this.navCtrl.navigateForward('payments/comingsoon');
  }
  
  goBack() {
    this.navCtrl.navigateBack('payments');
  }
  
  getAllBillers() {
    this.getBillersSubscription = this.billsPaymentsService.GetAllBillers(this.allBillersdata)
      .subscribe(
        (res: any) => {
          if(res && res.code === '00' && res.data) {
            this.allBillers = res.data;
            this.sharedData.billsPaymentData = res.data;
          } else if (res && res.code !== '00' && res.message) {
            this.alertSrvc.showErrorToast(res.message);
            this.navCtrl.back();
          } else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
            this.navCtrl.back();
          }
          console.log(res);
        },
        err => {
          this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.navCtrl.back();
          console.log(err);
        }
    )
  }

  go (route) {
    if ((!this.sharedData.userProfile.isFidelityCustomerValidated && !this.sharedData.userProfile.finaclePhoneNumber)) {
      this.identifyCustomer()
    } else {
      this.navCtrl.navigateForward(route);
    }
  }

  manageBeneficiaries (route) {
    this.navCtrl.navigateForward(route);
  }

  identifyCustomer() {
    this.handlers.validateFidelityCustomer(CustomalertComponent);
  }

}
