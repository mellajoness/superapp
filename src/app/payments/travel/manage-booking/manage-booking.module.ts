import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ManageBookingPageRoutingModule } from './manage-booking-routing.module';

import { ManageBookingPage } from './manage-booking.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ManageBookingPageRoutingModule
  ],
  declarations: [ManageBookingPage]
})
export class ManageBookingPageModule {}
