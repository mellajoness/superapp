import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FdCalculatorPage } from './fd-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: FdCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FdCalculatorPageRoutingModule {}
