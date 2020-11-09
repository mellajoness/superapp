import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayloanPage } from './payloan.page';

const routes: Routes = [
  {
    path: '',
    component: PayloanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PayloanPageRoutingModule {}
