import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {

  constructor(
    private router: Router,
    private iab: InAppBrowser
  ) { }

  ngOnInit() {
  }

  back(){
    this.router.navigate(['loans/all-loan-offers/payday-confirm-application'])
  }

  openTermsAndConditions(){
    const browser = this.iab.create('https://www.fidelitybank.ng/fastloans/');
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
    });
    
    browser.close();
}}


