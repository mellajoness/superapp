import { Handlers } from './../../../../shared/handlers';
import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';

@Component({
  selector: 'app-booking-successful',
  templateUrl: './booking-successful.page.html',
  styleUrls: ['./booking-successful.page.scss', '../../../../../theme/payments.scss'],
})
export class BookingSuccessfulPage implements OnInit {

  bookingDetails;
  
  constructor(
    public sharedData: SharedData,
    public handlers: Handlers
  ) {
    this.bookingDetails = this.sharedData.travel.bookingDetails;
    console.log(this.bookingDetails);
   }

  ngOnInit() {
  }

}
