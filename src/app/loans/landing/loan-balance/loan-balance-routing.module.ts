import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanBalancePage } from './loan-balance.page';

const routes: Routes = [
  {
    path: '',
    component: LoanBalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanBalancePageRoutingModule {}
