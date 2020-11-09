import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtendloanchangemindPage } from './extendloanchangemind.page';

const routes: Routes = [
  {
    path: '',
    component: ExtendloanchangemindPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtendloanchangemindPageRoutingModule {}
