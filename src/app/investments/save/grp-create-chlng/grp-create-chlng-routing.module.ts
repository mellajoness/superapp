import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrpCreateChlngPage } from './grp-create-chlng.page';

const routes: Routes = [
  {
    path: '',
    component: GrpCreateChlngPage
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrpCreateChlngPageRoutingModule {}
