import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookingConfirmationPage } from './booking-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: BookingConfirmationPage
  },
  {
    path: 'booking-successful',
    loadChildren: () => import('./booking-successful/booking-successful.module').then( m => m.BookingSuccessfulPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookingConfirmationPageRoutingModule {}
