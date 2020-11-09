import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtmlocationsPage } from './atmlocations.page';

const routes: Routes = [
  {
    path: '',
    component: AtmlocationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtmlocationsPageRoutingModule {}
