import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtendloansuccessPageRoutingModule } from './extendloansuccess-routing.module';

import { ExtendloansuccessPage } from './extendloansuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtendloansuccessPageRoutingModule
  ],
  declarations: [ExtendloansuccessPage]
})
export class ExtendloansuccessPageModule {}
