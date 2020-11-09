import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { MenuController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { LoanService } from 'src/app/services/loan/loan.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { ProfileService } from 'src/app/services/user/profile.service';
@Component({
  selector: 'app-migoscardpayment',
  templateUrl: './migoscardpayment.page.html',
  styleUrls: ['./migoscardpayment.page.scss'],
})
export class MigoscardpaymentPage implements OnInit {
  cards = [];
  selectedAccountDetails: any = {};
  kwikMoney: any = {};
  request: any = {};
  hasCard = false;
  noCard = false;
  newCardData: any;
  constructor(
   private iab: InAppBrowser,
   public menuCtrl: MenuController,
   private router: Router,
   private activatedRoute: ActivatedRoute,
   private loanSrvc: LoanService,
   private loaderSrvc: LoaderService,
   private alertSrvc: AlertService,
   private profileSrvc: ProfileService,
  ) { 
    activatedRoute.paramMap.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.newCardData = this.router.getCurrentNavigation().extras.state.migoNewCardLoanResponse;
        console.log('NEW CARD migo  DATA', this.newCardData);
      }
    })
  }

  ngOnInit() {
  }

  getCards() {
    this.loaderSrvc.showLoader();
    this.loanSrvc.getCardsMigoBank().subscribe(resp => {
      this.loaderSrvc.hideLoader();
      console.log('my payment card data', resp);
      if (resp.code === '00') {
        this.cards = resp.data;
        if (this.cards.length > 0) {
          this.hasCard = true;
        } else {
          this.noCard = true;
        }
      }
      else 
       {
        this.alertSrvc.showErrorToast(resp.message); 
      }
    },
      err => {
        this.loaderSrvc.hideLoader();
        console.log(err);
      })
  }



  addCardDetails() {
    this.loaderSrvc.showLoader();
    this.loanSrvc.addCardsMigo().subscribe(resp => {
      this.loaderSrvc.hideLoader();
      console.log('my payment card data', resp);
      if (resp.code === '00') {
        const target = '_self';
        const options = 'location = yes';
        const browser = this.iab.create('https://' + resp.message, target, options);
        browser.on('loadstop').subscribe(event => {
          this.getCards();
        });
        browser.close();
      } else {
        this.alertSrvc.showErrorToast(resp.message); 
      }
    },
      err => {
        this.loaderSrvc.hideLoader();
        console.log(err);
      })
  }
}
