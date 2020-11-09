import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidatePageRoutingModule } from './validate-routing.module';

import { ValidatePage } from './validate.page';
import { MaskModule } from 'src/app/pipes/mask/mask.module';
import { CurrencyConverterModule } from 'src/app/pipes/currency/currency-converter.module';
import { Encryption } from 'src/app/services/encryption/encryption';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidatePageRoutingModule,
    MaskModule,
    CurrencyConverterModule
  ],
  declarations: [ValidatePage],
  providers: [Encryption]
})
export class ValidatePageModule {}
