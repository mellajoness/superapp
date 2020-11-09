import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelPage } from './travel.page';

const routes: Routes = [
  {
    path: '',
    component: TravelPage
  },
  {
    path: 'search-flights',
    loadChildren: () => import('./search-flights/search-flights.module').then( m => m.SearchFlightsPageModule)
  },
  {
    path: 'book-flight-forms',
    loadChildren: () => import('./book-flight-forms/book-flight-forms.module').then( m => m.FormsPageModule)
  },  {
    path: 'booking-confirmation',
    loadChildren: () => import('./booking-confirmation/booking-confirmation.module').then( m => m.BookingConfirmationPageModule)
  },
  {
    path: 'manage-booking',
    loadChildren: () => import('./manage-booking/manage-booking.module').then( m => m.ManageBookingPageModule)
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelPageRoutingModule {}
