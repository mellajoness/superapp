import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanRejectionReasonPage } from './loan-rejection-reason.page';

const routes: Routes = [
  {
    path: '',
    component: LoanRejectionReasonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanRejectionReasonPageRoutingModule {}
