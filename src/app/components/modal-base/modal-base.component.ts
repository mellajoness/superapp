import { CardOrTokenPage } from './../../payments/identify-fidelity-customer/card-or-token/card-or-token.page';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  templateUrl: './modal-base.component.html',
  styleUrls: ['./modal-base.component.scss']
})
export class ModalBaseComponent implements OnInit {

  @ViewChild('ion-nav', {static: false}) nav: any

  rootPage: any;
  constructor() { }

  ngOnInit() {
  }

  next(page) {
    this.nav.push(page)
  }

}
