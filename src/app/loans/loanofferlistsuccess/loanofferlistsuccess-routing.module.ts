import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanofferlistsuccessPage } from './loanofferlistsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: LoanofferlistsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanofferlistsuccessPageRoutingModule {}
