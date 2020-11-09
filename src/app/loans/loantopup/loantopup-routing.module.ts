import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoantopupPage } from './loantopup.page';

const routes: Routes = [
  {
    path: '',
    component: LoantopupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoantopupPageRoutingModule {}
