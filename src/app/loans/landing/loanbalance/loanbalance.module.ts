import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanbalancePageRoutingModule } from './loanbalance-routing.module';

import { LoanbalancePage } from './loanbalance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanbalancePageRoutingModule
  ],
  declarations: [LoanbalancePage]
})
export class LoanbalancePageModule {}
