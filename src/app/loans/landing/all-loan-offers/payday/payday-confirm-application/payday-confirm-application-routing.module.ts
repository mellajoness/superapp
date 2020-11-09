import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaydayConfirmApplicationPage } from './payday-confirm-application.page';

const routes: Routes = [
  {
    path: '',
    component: PaydayConfirmApplicationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaydayConfirmApplicationPageRoutingModule {}
