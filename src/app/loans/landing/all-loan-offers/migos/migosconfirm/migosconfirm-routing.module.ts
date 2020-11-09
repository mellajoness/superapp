import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MigosconfirmPage } from './migosconfirm.page';

const routes: Routes = [
  {
    path: '',
    component: MigosconfirmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigosconfirmPageRoutingModule {}
