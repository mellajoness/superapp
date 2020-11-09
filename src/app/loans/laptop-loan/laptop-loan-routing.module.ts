import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaptopLoanPage } from './laptop-loan.page';

const routes: Routes = [
  {
    path: '',
    component: LaptopLoanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaptopLoanPageRoutingModule {}
