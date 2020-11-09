import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExchangeratePageRoutingModule } from './exchangerate-routing.module';

import { ExchangeratePage } from './exchangerate.page';
import { IconModule } from 'src/app/pipes/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExchangeratePageRoutingModule,
    IconModule,
  ],
  declarations: [ExchangeratePage]
})
export class ExchangeratePageModule {}
