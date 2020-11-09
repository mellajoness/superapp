import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillspaymentsPage } from './billspayments.page';

const routes: Routes = [
  {
    path: '',
    component: BillspaymentsPage
  },
  {
    path: 'utilities',
    loadChildren: () => import('./utilities/utilities.module').then( m => m.UtilitiesPageModule)
  },
  {
    path: 'forms',
    loadChildren: () => import('./forms/forms.module').then( m => m.FormsPageModule)
  },
  {
    path: 'wastemanagement',
    loadChildren: () => import('./wastemanagement/wastemanagement.module').then( m => m.WastemanagementPageModule)
  },
  {
    path: 'beneficiaries',
    loadChildren: () => import('./beneficiaries/beneficiaries.module').then( m => m.BeneficiariesPageModule)
  },  {
    path: 'bvn',
    loadChildren: () => import('./bvn/bvn.module').then( m => m.BvnPageModule)
  },
  {
    path: 'sendmoney',
    loadChildren: () => import('./sendmoney/sendmoney.module').then( m => m.SendmoneyPageModule)
  },
  {
    path: 'betting',
    loadChildren: () => import('./betting/betting.module').then( m => m.BettingPageModule)
  },
  {
    path: 'standinginstruction',
    loadChildren: () => import('./standinginstruction/standinginstruction.module').then( m => m.StandinginstructionPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillspaymentsPageRoutingModule {}
