import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanofferlistfirstPage } from './loanofferlistfirst.page';

const routes: Routes = [
  {
    path: '',
    component: LoanofferlistfirstPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanofferlistfirstPageRoutingModule {}
