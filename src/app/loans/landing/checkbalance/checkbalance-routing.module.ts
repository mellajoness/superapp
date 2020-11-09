import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckbalancePage } from './checkbalance.page';

const routes: Routes = [
  {
    path: '',
    component: CheckbalancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckbalancePageRoutingModule {}
