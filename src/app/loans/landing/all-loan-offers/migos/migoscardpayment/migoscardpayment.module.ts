import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MigoscardpaymentPageRoutingModule } from './migoscardpayment-routing.module';

import { MigoscardpaymentPage } from './migoscardpayment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MigoscardpaymentPageRoutingModule
  ],
  declarations: [MigoscardpaymentPage]
})
export class MigoscardpaymentPageModule {}
