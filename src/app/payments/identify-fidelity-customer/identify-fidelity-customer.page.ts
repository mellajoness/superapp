// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Handlers } from 'src/app/shared/handlers';
// import { SharedData } from 'src/app/shared/shared.components';

// @Component({
//   selector: 'app-identify-fidelity-customer',
//   templateUrl: './identify-fidelity-customer.page.html',
//   styleUrls: ['./identify-fidelity-customer.page.scss'],
// })
// export class IdentifyFidelityCustomerPage implements OnInit {

//   cardOrToken;
//   verification;

//   constructor(
//     public handlers: Handlers,
//     private sharedData: SharedData
//   ) { }

//   ngOnInit() {
//   }

//   next(type) {
//     this.sharedData.identityType = type;
//     this.handlers.navigate().forward('payments/identify-fidelity-customer/card-or-token')
//   }

// }






import { Component, OnInit, ViewChild } from '@angular/core';
import { Handlers } from 'src/app/shared/handlers';
import { SharedData } from 'src/app/shared/shared.components';
import { CardOrTokenPage } from './card-or-token/card-or-token.page';


@Component({
  selector: 'app-identify-fidelity-customer',
  templateUrl: './identify-fidelity-customer.page.html',
  styleUrls: ['./identify-fidelity-customer.page.scss', '../../../theme/payments.scss'],
})
export class IdentifyFidelityCustomerPage implements OnInit {

  @ViewChild('ion-nav', {static: false}) nav: any

  cardOrToken;
  verification;

  constructor(
    public handlers: Handlers,
    private sharedData: SharedData
  ) { }

  ngOnInit() {
  }

  next(type) {
    this.sharedData.identityType = type;
    // this.handlers.navigate().forward('payments/identify-fidelity-customer/card-or-token')
    const nav = document.querySelector('ion-nav');
    nav.push(CardOrTokenPage)
  }

}
