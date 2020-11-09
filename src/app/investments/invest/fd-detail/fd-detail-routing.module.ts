import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FdDetailPage } from './fd-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FdDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FdDetailPageRoutingModule {}
