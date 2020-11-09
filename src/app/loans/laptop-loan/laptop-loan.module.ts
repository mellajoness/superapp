import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaptopLoanPageRoutingModule } from './laptop-loan-routing.module';

import { LaptopLoanPage } from './laptop-loan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaptopLoanPageRoutingModule
  ],
  declarations: [LaptopLoanPage]
})
export class LaptopLoanPageModule {}
