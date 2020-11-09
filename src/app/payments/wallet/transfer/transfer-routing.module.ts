import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferPage } from './transfer.page';

const routes: Routes = [
  {
    path: '',
    component: TransferPage
  },  {
    path: 'beneficiaries',
    loadChildren: () => import('./beneficiaries/beneficiaries.module').then( m => m.BeneficiariesPageModule)
  },
  {
    path: 'banks',
    loadChildren: () => import('./banks/banks.module').then( m => m.BanksPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPageRoutingModule {}
