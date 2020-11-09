import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MigosPage } from './migos.page';

const routes: Routes = [
  {
    path: '',
    component: MigosPage
  },
  {
    path: 'migoscard',
    loadChildren: () => import('./migoscard/migoscard.module').then( m => m.MigoscardPageModule)
  },
  {
    path: 'migosnewcard',
    loadChildren: () => import('./migosnewcard/migosnewcard.module').then( m => m.MigosnewcardPageModule)
  },
  {
    path: 'migoscardpayment',
    loadChildren: () => import('./migoscardpayment/migoscardpayment.module').then( m => m.MigoscardpaymentPageModule)
  },
  {
    path: 'migosconfirm',
    loadChildren: () => import('./migosconfirm/migosconfirm.module').then( m => m.MigosconfirmPageModule)
  },
  {
    path: 'migoschangemind',
    loadChildren: () => import('./migoschangemind/migoschangemind.module').then( m => m.MigoschangemindPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigosPageRoutingModule {}
