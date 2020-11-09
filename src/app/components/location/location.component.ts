import { Component, OnInit } from '@angular/core';
import { SharedData } from 'src/app/shared/shared.components';
import { Handlers } from 'src/app/shared/handlers';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { BillspaymentshandlerService } from 'src/app/services/billspaymentshandler/billspaymentshandler.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { BillspaymentsService } from 'src/app/services/billspayments/billspayments.service';
import { LocationinfoComponent } from '../locationinfo/locationinfo.component';
declare var google: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss', '../../../theme/payments.scss'],
})
export class LocationComponent implements OnInit {

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  start = 'kruisstraat 50, oss';
  end = 'ridderhof 69, oss';

  constructor(
    public sharedData: SharedData,
    public handlers: Handlers,
    private router: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {}

  hide() {
    this.handlers.hide();
  }

  showLocationDetails(location) {
    console.log(location);
    this.sharedData.location = location;
    this.hide();
    this.handlers.locationModalInfo(LocationinfoComponent)

    this.calculateAndDisplayRoute();
  }

  calculateAndDisplayRoute() {
    this.directionsService.route({
      origin: this.start,
      destination: this.end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        console.log('Directions request failed due to ' + status);
      }
    });
  }

}
