import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PayloanPageRoutingModule } from './payloan-routing.module';

import { PayloanPage } from './payloan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayloanPageRoutingModule
  ],
  declarations: [PayloanPage]
})
export class PayloanPageModule {}
