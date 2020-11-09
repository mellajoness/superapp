import { Component, OnInit } from '@angular/core';
import { Handlers } from 'src/app/shared/handlers';
import { TravelService } from 'src/app/services/payments/travel/travel.service';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-searchandselect',
  templateUrl: './searchandselect.component.html',
  styleUrls: ['./searchandselect.component.scss']
})
export class SearchandselectComponent implements OnInit {

  selectedLocation;
  userInput;
  subscription;
  placeholder;
  searchedCities;
  showSpinner;
  index;
  view;
  searchedAirports;
  selectedCityName;

  constructor(
    public handlers: Handlers,
    private travelService: TravelService,
    public sharedData: SharedData,
    private alertService: AlertService
  ) {
    this.initializePage();
    this.placeholder = `Enter ${this.sharedData.travel.cityPlaceholder} city`;
    this.showSpinner = false;
    this.searchedCities = null;
    this.index = this.sharedData.travel.index;
    this.sharedData.travel.index = null;
  }

  ngOnInit() {
  }

  unsubscribe() {
    if (this.subscription.getCityCodeByName) {
      this.subscription.getCityCodeByName.unsubscribe();
      console.log('Unsubscribed from getCityCodeByName');
    }
  }

  ionViewWillLeave() {
    this.unsubscribe();
  }

  getCities() {

    // Cancel existing HTTP Call
    if (this.view = 'airport') {
      this.view = 'city'
      this.searchedAirports = null;
    }

    if (this.userInput.length < 3) {
      this.unsubscribe();
      this.showSpinner = false;
      this.searchedCities = null;
      return;
    }
    this.unsubscribe();

    this.showSpinner = true;

    this.userInput = this.userInput.toString();



    this.subscription.getCityCodeByName = this.travelService.getCityCodeByName(this.userInput)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.showSpinner = false;
          this.searchedCities = res;
        },
        (err: any) => {
          console.log(err);
          this.showSpinner = false;
          this.searchedCities = null;
        }
      )
  }

  initializePage() {
    console.log('Initializing Search-Flight Page');

    this.selectedLocation = null;
    this.view = "city";




    // Object for user input
    this.userInput = null

    // Object for HTTP Subscriptions
    this.subscription = {
      getCityCodeByName: null
    }

    console.log('Search-Flight Page Initialized');
  }

  selectAirport(airportObject) {
    airportObject['countryCode'] = airportObject.country_code;
    airportObject['shortName'] = this.selectedCityName;
    if (this.sharedData.travel.cityPlaceholder === 'departure') {
      this.sharedData.travel.departureCity[this.index] = airportObject;
      this.handlers.hide();
    }
    else {
      this.sharedData.travel.arrivalCity[this.index] = airportObject;
      this.handlers.hide();
    }
  }

  showAirportsInCity(cityObject) {
    this.showSpinner = true;
    this.travelService.getAirportsInCity(cityObject)
      .subscribe(
        (res: any) => {
          this.searchedAirports = res.data
          this.view = "airport";
          this.showSpinner = false;
          this.selectedCityName = cityObject.name;
        },
        err => {
          this.alertService.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          this.showSpinner = false;
        }
      )
  }

}
