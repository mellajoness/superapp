import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookingSuccessfulPageRoutingModule } from './booking-successful-routing.module';

import { BookingSuccessfulPage } from './booking-successful.page';
import { TravelMethodsModule } from 'src/app/pipes/travelMethods/travel-methods.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookingSuccessfulPageRoutingModule,
    TravelMethodsModule
  ],
  declarations: [BookingSuccessfulPage]
})
export class BookingSuccessfulPageModule {}
