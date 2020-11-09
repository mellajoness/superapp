import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SendmoneyPage } from './sendmoney.page';

const routes: Routes = [
  {
    path: '',
    component: SendmoneyPage
  },
  {
    path: 'self',
    loadChildren: () => import('./self/self.module').then( m => m.SelfPageModule)
  },
  {
    path: 'fidelity',
    loadChildren: () => import('./fidelity/fidelity.module').then( m => m.FidelityPageModule)
  },
  {
    path: 'otherbanks',
    loadChildren: () => import('./otherbanks/otherbanks.module').then( m => m.OtherbanksPageModule)
  },
  {
    path: 'pin',
    loadChildren: () => import('./pin/pin.module').then( m => m.PinPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },  {
    path: 'beneficiaries',
    loadChildren: () => import('./beneficiaries/beneficiaries.module').then( m => m.BeneficiariesPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SendmoneyPageRoutingModule {}
