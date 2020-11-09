import { Handlers } from './../../shared/handlers';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.page.html',
  styleUrls: ['./tax.page.scss', '../../../theme/payments.scss'],
})
export class TaxPage implements OnInit {

  constructor(
    protected handlers: Handlers
  ) { }

  ngOnInit() {
  }

}
