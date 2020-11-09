import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandingPage } from './landing.page';

const routes: Routes = [
  {
    path: '',
    component: LandingPage
  },
  {
    path: 'loan-balance',
    loadChildren: () => import('./loan-balance/loan-balance.module').then( m => m.LoanBalancePageModule)
  },
  {
    path: 'loan-topup',
    loadChildren: () => import('./loan-topup/loan-topup.module').then( m => m.LoanTopupPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
