import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaydayDisbursementStatusPageRoutingModule } from './payday-disbursement-status-routing.module';

import { PaydayDisbursementStatusPage } from './payday-disbursement-status.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaydayDisbursementStatusPageRoutingModule
  ],
  declarations: [PaydayDisbursementStatusPage]
})
export class PaydayDisbursementStatusPageModule {}
