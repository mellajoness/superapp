import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanofferlistsecondPage } from './loanofferlistsecond.page';

const routes: Routes = [
  {
    path: '',
    component: LoanofferlistsecondPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanofferlistsecondPageRoutingModule {}
