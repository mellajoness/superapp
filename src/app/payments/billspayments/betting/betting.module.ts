import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BettingPageRoutingModule } from './betting-routing.module';

import { BettingPage } from './betting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BettingPageRoutingModule
  ],
  declarations: [BettingPage]
})
export class BettingPageModule {}
