import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessorfailurePageRoutingModule } from './successorfailure-routing.module';

import { SuccessorfailurePage } from './successorfailure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuccessorfailurePageRoutingModule
  ],
  declarations: [SuccessorfailurePage]
})
export class SuccessorfailurePageModule {}
