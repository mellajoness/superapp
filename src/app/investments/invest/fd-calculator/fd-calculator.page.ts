import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InvestmentService } from 'src/app/services/investment/investment.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { NavigationExtras, Router } from '@angular/router';
import { SharedData } from 'src/app/shared/shared.components';

@Component({
  selector: 'app-fd-calculator',
  templateUrl: './fd-calculator.page.html',
  styleUrls: ['./fd-calculator.page.scss'],
})
export class FdCalculatorPage implements OnInit {

  tenors;
  amount;

  formOne = new FormGroup({
    amount: new FormControl('',
    [
      Validators.required,
      Validators.min(this.sD.investLimit && this.sD.investLimit.minFDAmount ? this.sD.investLimit.minFDAmount : 100000),
      Validators.max(this.sD.investLimit && this.sD.investLimit.maxFDAmount ? this.sD.investLimit.maxFDAmount : 999999999999)
    ])
  });

  formTwo = new FormGroup({
    term: new FormControl('', [Validators.required])
  });

  getRateData = {
    amount: 0,
    tenorDays: 0,
  };
  depositRate: any;

  constructor(
    private investSrvc: InvestmentService,
    private loader: LoaderService,
    private router: Router,
    public sD: SharedData
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getAllTenors();
  }

  getAllTenors() {
    this.loader.showLoader();
    this.investSrvc.getAllTenors().subscribe(res => {
      this.loader.hideLoader();
      this.tenors = res;
    });
  }

  calculateFd() {
    this.getRateData.amount = this.formOne.get('amount').value;
    this.getRateData.tenorDays = parseInt(this.formTwo.get('term').value, 10);
    // console.log(this.getRateData);
    this.investSrvc.calculateFDYield(this.getRateData).subscribe(res => {
      // console.log(res);
      if (res) {
        this.depositRate = res.yieldAmount + this.getRateData.amount;
      }
    });
  }

  openFDWithDetails() {
    const pageExtras = this.getRateData;
    const navigationExtras: NavigationExtras = {
      state: {
       pageExtras
      },
    };
    this.router.navigate(
      ['/', 'investments', 'invest', 'fixed-deposit'],
      navigationExtras
    );
  }

  amountToCheck(e) {
    if(e && e.target && e.target.value) {
      let val = e.target.value;
      if(this.sD.investLimit && this.sD.investLimit.minFDAmount && parseInt(val) < this.sD.investLimit.minFDAmount) {
        this.amount = true;
      } else if (parseInt(val) < 100000) {
        this.amount = true
      } else {
        this.amount = false;
      }
    }
  }

}
