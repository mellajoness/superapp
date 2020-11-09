import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';

@Component({
  selector: 'app-flight-ticket-details',
  templateUrl: './flight-ticket-details.component.html',
  styleUrls: ['./flight-ticket-details.component.scss', '../../../../../../theme/payments.scss']
})
export class FlightTicketDetailsComponent implements OnInit {

  tab;
  itinerary;

  constructor(
    public sharedData: SharedData,
    private handlers: Handlers
  ) { 
    this.initializePage();
  }

  ngOnInit() {
  }

  initializePage() {
    this.tab = 'details';
    this.itinerary = this.sharedData.travel.ticketDetails;
    console.log(this.itinerary);
  }

  segmentChanged(event) {
    const segment = event.detail.value;
  }

  selectItinerary(itinerary) {
    this.handlers.hide();
    console.log(itinerary);
    this.sharedData.travel.selectedItinerary = itinerary;
    this.handlers.navigate().forward('payments/travel/book-flight-forms');
  }

  refund(itinerary) {
    let refund = null;

    // const trip = itinerary.origin_destinations[0].segments[0];
    if (itinerary.pricing.provider.fare_break_down[0].ticket_designator[0].ticket_designator_code) {
      if (itinerary.pricing.provider.fare_break_down[0].ticket_designator[0].ticket_designator_code.slice(0,2) == '70') {
        refund = "Unavailable"
      }
      else if (itinerary.pricing.provider.fare_break_down[0].ticket_designator[0].ticket_designator_code.slice(0,2) == '71') {
        refund = "Before Departure"
      }
      else if (itinerary.pricing.provider.fare_break_down[0].ticket_designator[0].ticket_designator_code.slice(0,2) == '73') {
        refund = "With Penalty";
      }
      else {
        refund = null;
      }
    }
    return refund;
  }

  formatDuration(duration) {
    let hr = duration.slice(0,2);
    let min = duration.slice(3,5);

    if (parseInt(min) == 0) {
      min = ""
    }
    else if (parseInt(min) == 1) {
      min = `${min}min`
    }
    else {
      min = `${min}mins`
    }
    
    if (parseInt(hr) == 0) {
      hr = ""
    }
    else if (parseInt(hr) == 1) {
      hr = `${hr}hr`
    }
    else {
      hr = `${hr}hrs`
    }

    return `${hr} ${min}`
  }


}
