import { Injectable, NgZone } from '@angular/core';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { AlertService } from '../utilities/alert.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { SpinnerDialog } from '@ionic-native/spinner-dialog/ngx';

@Injectable({
  providedIn: 'root'
})
export class PaygateService {
  pageContent;
  amount;
  narration;
  orderId;
  email;
  pageContentUrl = 'data:text/html;base64,' + btoa(this.pageContent);
  browserRef: InAppBrowserObject;
  subscription: any;
  spinnerEvent: any;

  constructor(
    private inAppBrowser: InAppBrowser,
    private alertSrvc: AlertService,
    private storageSrvc: StorageService,
    private ngZone: NgZone,
    private router: Router,
    private spinnerDialog: SpinnerDialog,
  ) { }

  setUpPage() {
    const orderId = this.orderId;
    const amount = this.amount;
    const narration = this.narration;
    const email = this.email;
    this.pageContent =  `
    <html>
      <head></head>
      <body>
      <form class="w100" #form id="upay_form" name="upay_form"
      action="https://fidelitypaygate.fidelitybank.ng/cipg/MerchantServices/MakePayment.aspx" method="post">
        <input type="hidden" name="mercId" value="07666">
        <input type="hidden" name="currCode" value="566">
        <input type="hidden" name="amt" value="${amount}">
        <input type="hidden" name="orderId" value="${orderId}">
        <input type="hidden" name="prod" value="${narration}">
        <input type="hidden" name="email" value="${email}">
        </form>
    <script type="text/javascript">document.getElementById("upay_form").submit();</script>
    </body>
    </html>`;
    this.setupPageDetails();
  }

  setupPageDetails() {
    const pageContentUrl = 'data:text/html;base64,' + btoa(this.pageContent);
    const options = `
    hidden=no,location=startyes,clearsessioncache=yes,clearcache=yes,
    hideurlbar=yes,closebuttoncolor=#ffffff,closebuttoncaption=EXIT,toolbarcolor=#0E237E,navigationbuttoncolor=#ffffff`;
    this.browserRef = this.inAppBrowser.create(pageContentUrl, '_blank', options);
    this.jumbledLogic();
  }

  jumbledLogic() {
    this.subscription = this.browserRef.on('loadstart').subscribe((data) => {
      this.spinnerDialog.show('Loading', 'Please wait', true);
      this.spinnerEvent = data;
      console.log('SPINNER EVENT');
      console.log(this.spinnerEvent);

      setTimeout(() => {
        if (this.spinnerEvent && this.spinnerEvent.type === 'loadstart') {
          this.spinnerDialog.hide();
          this.browserRef.close();
          this.subscription.unsubscribe();
          this.alertSrvc.showErrorToast('Request timed out. Please try again.');
        } else {
          this.subscription.unsubscribe();
          console.log('CONDITION NOT TRUE');
          console.log(this.spinnerEvent);
        }
      }, 45000);

    }, err => {
      this.spinnerDialog.hide();
      this.subscription.unsubscribe();
      this.spinnerEvent = err;
      console.log('SPINNER EVENT');
      console.log(this.spinnerEvent);
    });

    this.browserRef.on('loadstop').subscribe((data) => {
      this.subscription.unsubscribe();
      this.spinnerEvent = data;
      console.log('SPINNER EVENT');
      console.log(this.spinnerEvent);

      this.browserRef.insertCSS({ code: 'html { margin-top: -50px }' });
      const global = this;
      this.spinnerDialog.hide();
      console.log(data);
      console.log(data.url);
      const x = data.url;
      const y = x.split('/wallet/pay?');
      console.log(y);
      y.map(i => {
        const global_ = global;
        if (i === 'http://localhost:8100/payments') {
          console.log(y[1].split('=')[3]);
          if (y[1].split('=')[3] !== 'DuplicateOrderID') {
            this.spinnerDialog.hide();
            this.browserRef.close();
            setTimeout(() => {
              console.log(y[1]);
              global_.storageSrvc.store('paygatedata', y[1]);
              this.ngZone.run(() => {
                this.router.navigate(['payments/wallet/fundwallet/confirmpayment']);
              });
            }, 100);
          } else {
            this.spinnerDialog.hide();
            this.browserRef.close();
          }
        }
      });

      if (x.split('?Transaction')[0] === 'http://localhost:8100/payments/wallet/cancel') {
        console.log('YES');
        this.spinnerDialog.hide();
        this.browserRef.close();
      }

      if (x.split('?')[0] === 'https://fidelitypaygate.fidelitybank.ng/cipg/MerchantServices/Rejects.aspx') {
        console.log('AN ERROR HAS OCCURED');
        this.spinnerDialog.hide();
        this.browserRef.close();
        this.alertSrvc.showErrorToast('Payment service is currently unavailable. Please try again later.');
      }

      if (x === 'https://fidelitypaygate.fidelitybank.ng/CIPG/https:/fidelitypaygate.fidelitybank.ng/cipg/customerlogin.aspx') {
        console.log('AN ERROR HAS OCCURED');
        this.spinnerDialog.hide();
        this.browserRef.close();
        this.alertSrvc.showErrorToast('Payment service is currently unavailable. Please try again later.');
      }

    }, err => {
      this.subscription.unsubscribe();
      this.spinnerEvent = err;
      console.log('SPINNER EVENT');
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    });

    this.browserRef.on('loaderror').subscribe((data) => {
      this.subscription.unsubscribe();
      this.spinnerEvent = data;
      console.log('SPINNER EVENT');
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    }, err => {
      this.subscription.unsubscribe();
      this.spinnerEvent = err;
      console.log('SPINNER EVENT');
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    });

    this.browserRef.on('exit').subscribe((data) => {
      this.subscription.unsubscribe();
      this.spinnerEvent = data;
      console.log('SPINNER EVENT');
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    }, err => {
      this.subscription.unsubscribe();
      this.spinnerEvent = err;
      console.log('SPINNER EVENT');
      console.log(this.spinnerEvent);
      this.spinnerDialog.hide();
    });
  }

}
