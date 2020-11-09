import { VerificationPage } from "./../verification/verification.page";
import { ProfileService } from "src/app/services/user/profile.service";
import { Component, OnInit } from "@angular/core";
import { Handlers } from "src/app/shared/handlers";
import { SharedData } from "src/app/shared/shared.components";
import { LoaderService } from "src/app/services/utilities/loader.service";
import { AlertService } from "src/app/services/utilities/alert.service";
import { IonNav } from '@ionic/angular';

@Component({
  selector: "app-card-or-token",
  templateUrl: "./card-or-token.page.html",
  styleUrls: ["./card-or-token.page.scss", "../../../../theme/payments.scss"],
})
export class CardOrTokenPage implements OnInit {
  invalidInputs;
  firstPan;
  lastPan;
  pin;
  formInputClass;
  heading;
  page;
  token;
  phoneNumberVerified;
  fidelityPhoneNumber;
  accountNo;
  cardType;
  allCardTypes;
  expirationMonth;
  expirationYear;
  nav = document.querySelector("ion-nav");

  constructor(
    public handlers: Handlers,
    private sharedData: SharedData,
    private profileService: ProfileService,
    private loaderService: LoaderService,
    private alertService: AlertService,
  ) {
    this.initializePage();
  }

  ngOnInit() { }

  initializePage() {
    this.page = this.sharedData.identityType;
    this.heading = this.page === "card" ? "Card Details" : "Token";
    this.formInputClass = "item-wrapper";
    this.invalidInputs = {
      firstPan: null,
      lastPan: null,
      pin: null,
      token: null,
    };
  }

  ionViewWillEnter() {
    this.phoneNumberVerified = false;
    this.firstPan = null;
    this.lastPan = null;
    this.pin = null;
  }

  validateInputs() {
    if (this.page === "token") {
      if (!this.token || !this.token.length || this.token.length === 0) {
        this.invalidInputs.token = true;
        this.formInputClass = "item-wrapper-invalid";
        console.log(this.formInputClass);
      }
      return;
    }

    if (!this.firstPan || !this.firstPan.length || this.firstPan.length === 0) {
      this.invalidInputs.firstPan = true;
      this.formInputClass = "item-wrapper-invalid";
      console.log(this.formInputClass);
    }
    if (!this.lastPan || !this.lastPan.length || this.lastPan.length === 0) {
      this.invalidInputs.lastPan = true;
    }
    if (!this.pin.length || !this.pin.length || this.pin.length === 0) {
      this.invalidInputs.pin = true;
    }
  }

  async getCardTypes() {
    this.loaderService.showLoader();
    this.profileService.profileFidelityCustomer_GetCardProducts().subscribe(
      (res) => {
        if(res.status) {
          this.allCardTypes = res.body
        }
        else {
          this.alertService.showErrorToast(res.message);
          this.nav.pop();
        }
        this.loaderService.hideLoader();
      },
      err => {
        this.alertService.showErrorToast(err.message);
        this.loaderService.hideLoader();
        this.nav.pop();
      }
    )
  }

  submit() {
    if (!this.phoneNumberVerified) {
      if (!this.fidelityPhoneNumber) {
        this.alertService.showErrorToast("Please enter phone number");
        return;
      }
      this.getCardTypes();
      this.phoneNumberVerified = !this.phoneNumberVerified;
      return;
    }
    if (this.page === "card") {
      this.loaderService.showLoader();
      const postData = {
        // left6Pan: this.firstPan,
        // right4Pan: this.lastPan,
        cardPin: this.pin,
        fidelityPhoneNumber: this.fidelityPhoneNumber,
        cardProduct: this.cardType,
        expirationYear: this.expirationYear,
        expirationMonth: this.expirationMonth,
      };
      this.profileService.profileWithCard(postData).subscribe(
        (res: any) => {
          this.loaderService.hideLoader();
          console.log(res);
          if (res.status) {
            this.alertService.showSuccessToast(res.message);
            // this.handlers.navigate().forward('payments/identify-fidelity-customer/verification')
            this.sharedData.fidelityPhoneNumber = postData.fidelityPhoneNumber;
            this.nav.push(VerificationPage);
          } else {
            this.alertService.showErrorToast(res.message);
          }
        },
        (err) => {
          this.loaderService.hideLoader();
          this.alertService.showErrorToast("An error occurred. Please try again later");
          console.log(err);
        }
      );
    }
    if (this.page === "token") {
      this.loaderService.showLoader();
      const postData = {
        accountNo: this.accountNo,
        token: this.token,
        fidelityPhoneNumber: this.fidelityPhoneNumber,
      };
      this.profileService.profileWithToken(postData).subscribe(
        (res: any) => {
          this.loaderService.hideLoader();
          console.log(res);
          if (res.status) {
            this.alertService.showSuccessToast(res.message);
            // this.handlers.navigate().forward('payments/identify-fidelity-customer/verification')
            this.sharedData.fidelityPhoneNumber = postData.fidelityPhoneNumber;
            this.token = null;
            this.nav.push(VerificationPage);
          } else {
            this.alertService.showErrorToast(res.message);
            this.token = null;
          }
        },
        (err) => {
          this.token = null;
          this.alertService.showErrorToast("An error occurred. Please try again later");
          this.loaderService.hideLoader();
          console.log(err);
        }
      );
    }
  }
}
