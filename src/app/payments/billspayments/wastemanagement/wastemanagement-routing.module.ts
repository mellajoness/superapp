import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WastemanagementPage } from './wastemanagement.page';

const routes: Routes = [
  {
    path: '',
    component: WastemanagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WastemanagementPageRoutingModule {}
