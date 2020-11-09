import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaydayDisbursementStatusPaydayPageRoutingModule } from './payday-disbursement-status-payday-routing.module';

import { PaydayDisbursementStatusPaydayPage } from './payday-disbursement-status-payday.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaydayDisbursementStatusPaydayPageRoutingModule
  ],
  declarations: [PaydayDisbursementStatusPaydayPage]
})
export class PaydayDisbursementStatusPaydayPageModule {}
