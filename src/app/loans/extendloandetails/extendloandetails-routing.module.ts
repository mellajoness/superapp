import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtendloandetailsPage } from './extendloandetails.page';

const routes: Routes = [
  {
    path: '',
    component: ExtendloandetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtendloandetailsPageRoutingModule {}
