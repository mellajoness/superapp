import { Component, OnInit } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { FileOpener } from '@ionic-native/file-opener/ngx';
@Component({
  selector: 'app-loan-terms-conditions',
  templateUrl: './loan-terms-conditions.page.html',
  styleUrls: ['./loan-terms-conditions.page.scss'],
})
export class LoanTermsConditionsPage implements OnInit {

  constructor(private iab: InAppBrowser,
    private router: Router,
    private fileOpener: FileOpener
    ) { }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['loans']);
  }
  openTermsAndConditions(){
    const browser = this.iab.create('https://www.fidelitybank.ng/fastloans/');
  
    // browser.executeScript(...);
    // browser.insertCSS(...);
    
    browser.on('loadstop').subscribe(event => {
       browser.insertCSS({ code: "body{color: red;" });
    });
    
    browser.close();
}}
