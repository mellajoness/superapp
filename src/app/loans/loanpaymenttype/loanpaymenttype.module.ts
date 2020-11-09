import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanpaymenttypePageRoutingModule } from './loanpaymenttype-routing.module';

import { LoanpaymenttypePage } from './loanpaymenttype.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanpaymenttypePageRoutingModule
  ],
  declarations: [LoanpaymenttypePage]
})
export class LoanpaymenttypePageModule {}
