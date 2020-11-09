import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FundwalletPage } from './fundwallet.page';

const routes: Routes = [
  {
    path: '',
    component: FundwalletPage
  },  {
    path: 'accounts',
    loadChildren: () => import('./accounts/accounts.module').then( m => m.AccountsPageModule)
  },
  {
    path: 'topup',
    loadChildren: () => import('./topup/topup.module').then( m => m.TopupPageModule)
  },
  {
    path: 'confirmpayment',
    loadChildren: () => import('./confirmpayment/confirmpayment.module').then( m => m.ConfirmpaymentPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FundwalletPageRoutingModule {}
