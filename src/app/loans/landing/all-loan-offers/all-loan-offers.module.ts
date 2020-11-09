import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllLoanOffersPageRoutingModule } from './all-loan-offers-routing.module';

import { AllLoanOffersPage } from './all-loan-offers.page';
// import { CreditCheckComponent } from '../modals/credit-check/credit-check.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllLoanOffersPageRoutingModule
  ],
  declarations: [AllLoanOffersPage, ]
  
})
export class AllLoanOffersPageModule {}
