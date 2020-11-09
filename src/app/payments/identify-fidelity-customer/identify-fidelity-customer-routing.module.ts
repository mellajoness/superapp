import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentifyFidelityCustomerPage } from './identify-fidelity-customer.page';

const routes: Routes = [
  {
    path: '',
    component: IdentifyFidelityCustomerPage
  },
  {
    path: 'card-or-token',
    loadChildren: () => import('./card-or-token/card-or-token.module').then( m => m.CardOrTokenPageModule)
  },
  {
    path: 'verification',
    loadChildren: () => import('./verification/verification.module').then( m => m.VerificationPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifyFidelityCustomerPageRoutingModule {}
