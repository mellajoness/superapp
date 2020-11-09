import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferPageRoutingModule } from './transfer-routing.module';

import { TransferPage } from './transfer.page';
import { CurrencyConverterModule } from 'src/app/pipes/currency/currency-converter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferPageRoutingModule,
    CurrencyConverterModule
  ],
  declarations: [TransferPage]
})
export class TransferPageModule {}
