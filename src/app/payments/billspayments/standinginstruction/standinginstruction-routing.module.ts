import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StandinginstructionPage } from './standinginstruction.page';

const routes: Routes = [
  {
    path: '',
    component: StandinginstructionPage
  },
  {
    path: 'create',
    loadChildren: () => import('./create/create.module').then( m => m.CreatePageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./view/view.module').then( m => m.ViewPageModule)
  },
  {
    path: 'summary',
    loadChildren: () => import('./summary/summary.module').then( m => m.SummaryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StandinginstructionPageRoutingModule {}
