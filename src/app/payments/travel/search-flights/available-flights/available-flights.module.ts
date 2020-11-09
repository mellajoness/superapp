import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvailableFlightsPageRoutingModule } from './available-flights-routing.module';

import { AvailableFlightsPage } from './available-flights.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrencyConverterModule } from 'src/app/pipes/currency/currency-converter.module';
import { TravelMethodsModule } from 'src/app/pipes/travelMethods/travel-methods.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvailableFlightsPageRoutingModule,
    SharedModule,
    CurrencyConverterModule,
    TravelMethodsModule
  ],
  declarations: [AvailableFlightsPage]
})
export class AvailableFlightsPageModule {}
