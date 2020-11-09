import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvestmentsPage } from './investments.page';

const routes: Routes = [
  {
    path: '',
    component: InvestmentsPage,
    children: [
      {
        path: 'landing',
        loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
      }
    ]
  },
  {
    path: 'save',
    loadChildren: () => import('./save/save.module').then( m => m.SavePageModule)
  },
  {
    path: 'invest',
    loadChildren: () => import('./invest/invest.module').then( m => m.InvestPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvestmentsPageRoutingModule {}
