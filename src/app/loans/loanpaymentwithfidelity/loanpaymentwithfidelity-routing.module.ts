import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanpaymentwithfidelityPage } from './loanpaymentwithfidelity.page';

const routes: Routes = [
  {
    path: '',
    component: LoanpaymentwithfidelityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanpaymentwithfidelityPageRoutingModule {}
