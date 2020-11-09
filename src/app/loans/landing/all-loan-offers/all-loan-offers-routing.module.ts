import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllLoanOffersPage } from './all-loan-offers.page';

const routes: Routes = [
  {
    path: '',
    component: AllLoanOffersPage
  },
  {
    path: 'payday-application',
    loadChildren: () => import('./payday/payday-application/payday-application.module').then( m => m.PaydayApplicationPageModule)
  },
  {
    path: 'payday-ineligibility-feedback',
    loadChildren: () => import('./payday/payday-ineligibility-feedback/payday-ineligibility-feedback.module').then( m => m.PaydayIneligibilityFeedbackPageModule)
  },
  {
    path: 'payday-confirm-application',
    loadChildren: () => import('./payday/payday-confirm-application/payday-confirm-application.module').then( m => m.PaydayConfirmApplicationPageModule)
  },
  {
    path: 'payday-disbursement-status',
    loadChildren: () => import('./payday/payday-disbursement-status/payday-disbursement-status.module').then( m => m.PaydayDisbursementStatusPageModule)
  },
  {
    path: 'migos',
    loadChildren: () => import('./migos/migos.module').then( m => m.MigosPageModule)
  },
  {
    path: 'ineligibility',
    loadChildren: () => import('../ineligibility/ineligibility.module').then( m => m.IneligibilityPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllLoanOffersPageRoutingModule {}
