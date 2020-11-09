import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanTermsConditionsPage } from './loan-terms-conditions.page';

const routes: Routes = [
  {
    path: '',
    component: LoanTermsConditionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanTermsConditionsPageRoutingModule {}
