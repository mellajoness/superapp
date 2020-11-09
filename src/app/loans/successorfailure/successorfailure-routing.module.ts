import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessorfailurePage } from './successorfailure.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessorfailurePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuccessorfailurePageRoutingModule {}
