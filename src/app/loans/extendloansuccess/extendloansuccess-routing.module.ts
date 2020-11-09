import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtendloansuccessPage } from './extendloansuccess.page';

const routes: Routes = [
  {
    path: '',
    component: ExtendloansuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtendloansuccessPageRoutingModule {}
