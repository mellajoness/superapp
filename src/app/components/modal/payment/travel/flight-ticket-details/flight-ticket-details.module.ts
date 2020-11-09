import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

// import { FlightTicketDetailsComponentRoutingModule } from './flight-ticket-details-routing.module';

import { FlightTicketDetailsComponent } from './flight-ticket-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CurrencyConverterModule } from 'src/app/pipes/currency/currency-converter.module';
import { TravelMethodsModule } from 'src/app/pipes/travelMethods/travel-methods.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // FlightTicketDetailsComponentRoutingModule,
    SharedModule,
    CurrencyConverterModule,
    TravelMethodsModule
  ],
  declarations: [FlightTicketDetailsComponent]
})
export class FlightTicketDetailsComponentModule {}
