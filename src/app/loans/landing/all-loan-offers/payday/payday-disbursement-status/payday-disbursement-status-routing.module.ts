import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaydayDisbursementStatusPage } from './payday-disbursement-status.page';

const routes: Routes = [
  {
    path: '',
    component: PaydayDisbursementStatusPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaydayDisbursementStatusPageRoutingModule {}
