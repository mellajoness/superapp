import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaxPage } from './tax.page';

const routes: Routes = [
  {
    path: '',
    component: TaxPage
  },
  {
    path: 'generateref',
    loadChildren: () => import('./generateref/generateref.module').then( m => m.GeneraterefPageModule)
  },
  {
    path: 'validateref',
    loadChildren: () => import('./validateref/validateref.module').then( m => m.ValidaterefPageModule)
  },
  {
    path: 'payment-form',
    loadChildren: () => import('./payment-form/payment-form.module').then( m => m.PaymentFormPageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaxPageRoutingModule {}
