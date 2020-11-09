import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MigoscardpaymentPage } from './migoscardpayment.page';

const routes: Routes = [
  {
    path: '',
    component: MigoscardpaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigoscardpaymentPageRoutingModule {}
