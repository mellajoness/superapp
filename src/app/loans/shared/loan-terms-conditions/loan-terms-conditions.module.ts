import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanTermsConditionsPageRoutingModule } from './loan-terms-conditions-routing.module';

import { LoanTermsConditionsPage } from './loan-terms-conditions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanTermsConditionsPageRoutingModule
  ],
  declarations: [LoanTermsConditionsPage]
})
export class LoanTermsConditionsPageModule {}
