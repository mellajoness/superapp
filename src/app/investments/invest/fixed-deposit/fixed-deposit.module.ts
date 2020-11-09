import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FixedDepositPageRoutingModule } from './fixed-deposit-routing.module';

import { FixedDepositPage } from './fixed-deposit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FixedDepositPageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [FixedDepositPage],
  entryComponents: []
})
export class FixedDepositPageModule {}
