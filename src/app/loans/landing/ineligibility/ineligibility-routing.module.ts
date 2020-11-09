import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IneligibilityPage } from './ineligibility.page';

const routes: Routes = [
  {
    path: '',
    component: IneligibilityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IneligibilityPageRoutingModule {}
