import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoanhistoryPage } from './loanhistory.page';

const routes: Routes = [
  {
    path: '',
    component: LoanhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoanhistoryPageRoutingModule {}
