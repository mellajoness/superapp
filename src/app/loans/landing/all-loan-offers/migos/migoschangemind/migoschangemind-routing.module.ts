import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MigoschangemindPage } from './migoschangemind.page';

const routes: Routes = [
  {
    path: '',
    component: MigoschangemindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigoschangemindPageRoutingModule {}
