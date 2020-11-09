import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingConfirmationPageRoutingModule } from './booking-confirmation-routing.module';

import { BookingConfirmationPage } from './booking-confirmation.page';
import { TravelMethodsModule } from 'src/app/pipes/travelMethods/travel-methods.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingConfirmationPageRoutingModule,
    TravelMethodsModule
  ],
  declarations: [BookingConfirmationPage]
})
export class BookingConfirmationPageModule {}
