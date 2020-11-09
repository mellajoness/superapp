import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanhistorydetailsPage } from './loanhistorydetails.page';

const routes: Routes = [
  {
    path: '',
    component: LoanhistorydetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanhistorydetailsPageRoutingModule {}
