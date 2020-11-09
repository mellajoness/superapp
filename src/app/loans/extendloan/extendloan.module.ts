import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtendloanPageRoutingModule } from './extendloan-routing.module';

import { ExtendloanPage } from './extendloan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtendloanPageRoutingModule
  ],
  declarations: [ExtendloanPage]
})
export class ExtendloanPageModule {}
