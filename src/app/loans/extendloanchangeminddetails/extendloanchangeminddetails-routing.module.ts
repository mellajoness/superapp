import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExtendloanchangeminddetailsPage } from './extendloanchangeminddetails.page';

const routes: Routes = [
  {
    path: '',
    component: ExtendloanchangeminddetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExtendloanchangeminddetailsPageRoutingModule {}
