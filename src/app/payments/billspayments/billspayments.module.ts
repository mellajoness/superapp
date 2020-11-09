import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillspaymentsPageRoutingModule } from './billspayments-routing.module';

import { BillspaymentsPage } from './billspayments.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillspaymentsPageRoutingModule
  ],
  declarations: [BillspaymentsPage]
})
export class BillspaymentsPageModule {}
