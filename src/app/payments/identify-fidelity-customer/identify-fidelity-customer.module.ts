import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IdentifyFidelityCustomerPageRoutingModule } from './identify-fidelity-customer-routing.module';

// import { IdentifyFidelityCustomerPage } from './identify-fidelity-customer.page';
import { CardOrTokenPageModule } from './card-or-token/card-or-token.module';
import { VerificationPageModule } from './verification/verification.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentifyFidelityCustomerPageRoutingModule,
    CardOrTokenPageModule,
    VerificationPageModule
  ],
  // declarations: [IdentifyFidelityCustomerPage]
})
export class IdentifyFidelityCustomerPageModule {}
