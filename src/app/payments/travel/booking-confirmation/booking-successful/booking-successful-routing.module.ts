import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingSuccessfulPage } from './booking-successful.page';

const routes: Routes = [
  {
    path: '',
    component: BookingSuccessfulPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingSuccessfulPageRoutingModule {}
