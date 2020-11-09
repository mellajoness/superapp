import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MigoscardPage } from './migoscard.page';

const routes: Routes = [
  {
    path: '',
    component: MigoscardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigoscardPageRoutingModule {}
