import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FidelityPage } from './fidelity.page';

const routes: Routes = [
  {
    path: '',
    component: FidelityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FidelityPageRoutingModule {}
