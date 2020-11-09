import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanpaymentwithfidelityPageRoutingModule } from './loanpaymentwithfidelity-routing.module';

import { LoanpaymentwithfidelityPage } from './loanpaymentwithfidelity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanpaymentwithfidelityPageRoutingModule
  ],
  declarations: [LoanpaymentwithfidelityPage]
})
export class LoanpaymentwithfidelityPageModule {}
