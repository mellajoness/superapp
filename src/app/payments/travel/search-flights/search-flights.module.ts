import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchFlightsPageRoutingModule } from './search-flights-routing.module';

import { SearchFlightsPage } from './search-flights.page';
import { TravelMethodsModule } from 'src/app/pipes/travelMethods/travel-methods.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchFlightsPageRoutingModule,
    TravelMethodsModule
  ],
  declarations: [SearchFlightsPage]
})
export class SearchFlightsPageModule {}
