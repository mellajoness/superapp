import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WalletcreationPage } from './walletcreation.page';

const routes: Routes = [
  {
    path: '',
    component: WalletcreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WalletcreationPageRoutingModule {}
