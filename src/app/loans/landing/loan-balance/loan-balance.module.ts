import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanBalancePageRoutingModule } from './loan-balance-routing.module';

import { LoanBalancePage } from './loan-balance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanBalancePageRoutingModule
  ],
  declarations: [LoanBalancePage]
})
export class LoanBalancePageModule {}
