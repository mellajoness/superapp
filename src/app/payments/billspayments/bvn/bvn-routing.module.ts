import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BvnPage } from './bvn.page';

const routes: Routes = [
  {
    path: '',
    component: BvnPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BvnPageRoutingModule {}
