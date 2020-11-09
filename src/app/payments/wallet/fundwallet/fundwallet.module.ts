import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FundwalletPageRoutingModule } from './fundwallet-routing.module';

import { FundwalletPage } from './fundwallet.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FundwalletPageRoutingModule
  ],
  declarations: [FundwalletPage]
})
export class FundwalletPageModule {}
