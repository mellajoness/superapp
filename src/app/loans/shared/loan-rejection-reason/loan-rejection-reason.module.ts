import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanRejectionReasonPageRoutingModule } from './loan-rejection-reason-routing.module';

import { LoanRejectionReasonPage } from './loan-rejection-reason.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanRejectionReasonPageRoutingModule
  ],
  declarations: [LoanRejectionReasonPage]
})
export class LoanRejectionReasonPageModule {}
