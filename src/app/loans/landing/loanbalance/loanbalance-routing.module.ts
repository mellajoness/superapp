import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanbalancePage } from './loanbalance.page';

const routes: Routes = [
  {
    path: '',
    component: LoanbalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanbalancePageRoutingModule {}
