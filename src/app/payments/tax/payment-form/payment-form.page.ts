import { Handlers } from './../../../shared/handlers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.page.html',
  styleUrls: ['./payment-form.page.scss', '../../../../theme/payments.scss'],
})
export class PaymentFormPage implements OnInit {

  todaysDate;

  constructor(
    protected handlers: Handlers
  ) { 
    this.todaysDate = this.handlers.getYYYYMMdd(new Date(Date.now()));
  }

  ngOnInit() {
  }

}
