import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ManageBookingPage } from './manage-booking.page';

const routes: Routes = [
  {
    path: '',
    component: ManageBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageBookingPageRoutingModule {}
