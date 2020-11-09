import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrpJoinChlngPage } from './grp-join-chlng.page';

const routes: Routes = [
  {
    path: '',
    component: GrpJoinChlngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GrpJoinChlngPageRoutingModule {}
