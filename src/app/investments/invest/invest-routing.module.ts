import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestPage } from './invest.page';

const routes: Routes = [
  {
    path: '',
    component: InvestPage
  },  {
    path: 'fixed-deposit',
    loadChildren: () => import('./fixed-deposit/fixed-deposit.module').then( m => m.FixedDepositPageModule)
  },
  {
    path: 'fd-detail',
    loadChildren: () => import('./fd-detail/fd-detail.module').then( m => m.FdDetailPageModule)
  },
  {
    path: 'fd-calculator',
    loadChildren: () => import('./fd-calculator/fd-calculator.module').then( m => m.FdCalculatorPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestPageRoutingModule {}
