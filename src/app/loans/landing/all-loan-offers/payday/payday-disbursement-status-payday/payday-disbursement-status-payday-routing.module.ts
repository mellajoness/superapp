import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaydayDisbursementStatusPaydayPage } from './payday-disbursement-status-payday.page';

const routes: Routes = [
  {
    path: '',
    component: PaydayDisbursementStatusPaydayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaydayDisbursementStatusPaydayPageRoutingModule {}
