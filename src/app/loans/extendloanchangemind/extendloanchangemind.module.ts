import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtendloanchangemindPageRoutingModule } from './extendloanchangemind-routing.module';

import { ExtendloanchangemindPage } from './extendloanchangemind.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtendloanchangemindPageRoutingModule
  ],
  declarations: [ExtendloanchangemindPage]
})
export class ExtendloanchangemindPageModule {}
