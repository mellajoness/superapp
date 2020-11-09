import { StatusbarService } from './../../../services/utilities/statusbar.service';
import { Component, OnInit } from '@angular/core';
import { Handlers } from 'src/app/shared/handlers';
import { TravelService } from 'src/app/services/payments/travel/travel.service';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from './../../../services/utilities/loader.service';
import { SearchandselectComponent } from './../../../components/modal/payment/travel/searchandselect/searchandselect.component';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.page.html',
  styleUrls: ['./search-flights.page.scss', '../../../../theme/payments.scss'],
})
export class SearchFlightsPage implements OnInit {

  selectedDeparture;
  selectedArrival;
  passengers;
  numbers;
  userInput;
  subscription;
  tripWay;
  todaysDate;
  flightType;
  cabin;
  multiCity;

  constructor(
    public handlers: Handlers,
    private travelService: TravelService,
    private http: HttpClient,
    protected loaderSrvc: LoaderService,
    public sharedData: SharedData,
    private alertSrvc: AlertService,
    protected storageService: StorageService,
    private statusBarService: StatusbarService
  ) {
    this.initializePage();
    console.log("Arrival city is ==>>" + this.sharedData.travel.arrivalCity)
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.statusBarService.textColor().light();
    }, 300);
  }


  selectLocation(value) {
    // debugger;
    console.log(value);

    switch (value) {
      case "LOS":
        this.selectedDeparture.location = "LAGOS";
        break;

      case "LHR":
        this.selectedDeparture.location = "LONDON";
        break;
    }
  }

  getCities() {
    // this.loaderSrvc.showLoader();
    console.log('getCities Method fired');

    // this.test();
    // this.travelService.getCityCodeByName(this.userInput.departureCity).subscribe().unsubscribe();

    if (this.userInput.departureCity.length < 3) {
      return;
    }
    this.userInput.departureCity = this.userInput.departureCity.toString();

    // Cancel existing HTTP Call
    if (this.subscription.getCityCodeByName) {
      this.subscription.getCityCodeByName.unsubscribe();
      console.log('Unsubscribed from getCityCodeByName');
    }

    console.log('About to call getCityCodeByName');

    this.subscription.getCityCodeByName = this.travelService.getCityCodeByName(this.userInput.departureCity)
      .subscribe(
        (res: any) => {
          // this.loaderSrvc.hideLoader();
          console.log(res);
        },
        (err: any) => {
          // this.loaderSrvc.hideLoader();
          console.log(err);
        }
      )
  }


  multiCityMethods() {
    const methods = {
      add: () => {
        // Add city to itinerary

        if (this.multiCity.count.length === 0) {
          this.multiCity.count = ['1'];
          return;
        }

        this.selectedDeparture.date.push(null);

        const last = this.multiCity.count[this.multiCity.count.length - 1];
        const next = parseInt(last) + 1;
        this.multiCity.count.push(next.toString());
      },
      remove: (index?, item?) => {
        console.log('Remove at index ' + index);
        // Remove City from itinerary
        if (index) {
          this.multiCity.count.splice(index, 1);
        }
        else {
          this.multiCity.count.pop();
        }
      }
    }

    return methods;
  }


  initializePage() {

    this.sharedData.resetTravel();

    console.log('Initializing Search-Flight Page');

    this.selectedDeparture = {
      location: "Departure city",
      date: [null]
    }
    this.selectedArrival = {
      location: "Arrival city",
      date: [null]
    }
    this.passengers = {
      child: 0,
      adult: 1,
      infant: 0
    }
    this.multiCity = {
      placeholder: 'Stop',
      count: ['1']
    }

    this.numbers = this.handlers.generateArrayOfNumbers(0, 23);



    // Object for user input
    this.userInput = {
      arrivalCity: null,
      departureCity: null
    }

    // Object for HTTP Subscriptions
    this.subscription = {
      getCityCodeByName: null
    }

    this.tripWay = "oneway";

    //Get today's date in YY-MM-dd format
    this.todaysDate = this.handlers.getYYYYMMdd(new Date(Date.now()));

    console.log('0000000000000000000=====================00000000000000');
    console.log(this.selectedDeparture.date);
    console.log(this.selectedDeparture.date[0]);


    console.log('Search-Flight Page Initialized');


    // Get countries
    this.travelService.getCountries()
      .subscribe(
        (res: any) => {
          this.sharedData.travel.countries = res.data
          this.storageService.store("countries", res.data);
        },
        (err) => {

        }
      )


  }

  test() {
    const header = {
      'Content-Type': 'application/json',
      'Authorization': 'vWdyuR?wd6u730:l892e9dc892e=231!',
      'Access-Control-Allow-Origin': '*'
    }
    this.http.get('https://dtptest.fidelitybank.ng/digitaltravels/api/Travels/GetCityCodeByName?cityName=d', { headers: header })
      .subscribe().unsubscribe();
    this.http.get('https://dtptest.fidelitybank.ng/digitaltravels/api/Travels/GetCityCodeByName?cityName=d', { headers: header })
      .subscribe();
  }

  selectTripWay(selection) {
    console.log(selection);
    if (selection = 'oneway') {
      this.selectedArrival.date = [null];
    }
    if (selection !== 'multicity') {
      this.multiCity.count = ['1'];
      this.selectedDeparture.date = [null];
    }
  }

  pickCity(location, index) {
    this.sharedData.travel.cityPlaceholder = location;
    this.sharedData.travel.index = index;
    this.handlers.presentModal('searchAndSelect', SearchandselectComponent)
  }

  regularizeDates(index, trip) {

    // Only regularize for round trips
    if (this.tripWay !== 'roundtrip') {
      return;
    }

    if ((this.selectedDeparture.date[index] > this.selectedArrival.date[index]) || (this.selectedDeparture.date[index] < this.todaysDate)) {
      this.alertSrvc.showErrorToast(this.handlers.responseMsgs().invalidSelectedDates);
      this.selectedDeparture.date[index] = null;
      this.selectedArrival.date[index] = null;
    }

  }

  determineflightType() {
    if (this.sharedData.travel.departureCity[0].countryCode === this.sharedData.travel.arrivalCity[0].countryCode) {
      this.flightType = "domestic";
    }
    else {
      this.flightType = "international";
    }
  }

  convertDate(date) {
    console.log(date)
    let x = this.handlers.getddMMYYYY(new Date(date));
    x = this.handlers.convertDDMMYYtoMMDDYY(x);
    return x;
  }

  prepareOriginDestinations() {
    const array = [];

    if (this.tripWay !== 'multicity') {
      const index = 0;
      array.push(
        {
          departure_city: this.sharedData.travel.departureCity[index].code,
          destination_city: this.sharedData.travel.arrivalCity[index].code,
          departure_date: this.convertDate(this.selectedDeparture.date[index]),
          return_date: this.selectedArrival.date[index] ? this.convertDate(this.selectedArrival.date[index]) : ""
        }
      )
      return array;
    }

    this.sharedData.travel.departureCity.forEach(
      (element, index) => {
        array.push(
          {
            departure_city: this.sharedData.travel.departureCity[index].code,
            destination_city: this.sharedData.travel.arrivalCity[index].code,
            departure_date: this.convertDate(this.selectedDeparture.date[index]),
            return_date: this.selectedArrival.date[index] ? this.convertDate(this.selectedArrival.date[index]) : ""
          }
        )
      });
    return array;
  }

  searchFlights() {

    if (this.validateSearchParameters()) {
      console.log('something is missing')
      return;
    }

    console.log('performs else');
    this.determineflightType();
    if (this.tripWay === 'roundtrip') {
      this.sharedData.travel.roundtrip = true;
    }
    else {
      this.sharedData.travel.roundtrip = false;
    }

    if (this.passengers.adult < 1) {
      this.alertSrvc.showErrorToast(this.handlers.responseMsgs().invalidPassenger);
      return;
    }

    else if ((this.passengers.adult + this.passengers.child + this.passengers.infant) == 0) {
      this.alertSrvc.showErrorToast(this.handlers.responseMsgs().invalidPassenger);
      return;
    }


    const postData = {
      header: {
        cookie: ""
      },
      body: {
        flightType: this.flightType,
        origin_destinations: this.prepareOriginDestinations(),
        // origin_destinations: [
        //   {
        //     departure_city: this.sharedData.travel.departureCity.code,
        //     destination_city: this.sharedData.travel.arrivalCity.code,
        //     departure_date: this.convertDate(this.selectedDeparture.date),
        //     return_date: this.selectedArrival.date ? this.convertDate(this.selectedArrival.date) : ""
        //   }
        // ],
        search_param: {
          no_of_adult: this.passengers.adult ? this.passengers.adult : 1,
          no_of_child: this.passengers.child ? this.passengers.child : 0,
          no_of_infant: this.passengers.infant ? this.passengers.infant : 0,
          preferred_airline_code: "",
          calendar: false,
          cabin: this.cabin ? this.cabin : 'All'
        }
      }
    }

    console.log(postData);
    this.loaderSrvc.showLoader();

    this.travelService.getAvailableFlights(postData)
      .subscribe(
        (res: any) => {

          if (res.data.body.status !== 200) {
            if (res.data && res.data.body && res.data.body.errors && res.data.body.errors[0] && res.data.body.errors[0].flight) {
              this.loaderSrvc.hideLoader();
              this.alertSrvc.showErrorToast(res.data.body.errors[0].flight + this.handlers.responseMsgs().refineSearch);
              return;
            }
            else {
              this.loaderSrvc.hideLoader();
              this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
              return;
            }
          }


          this.sharedData.travel.passengers.adult = this.passengers.adult;
          this.sharedData.travel.passengers.child = this.passengers.child;
          this.sharedData.travel.passengers.infant = this.passengers.infant;
          this.sharedData.travel.searchResult = res;
          this.sharedData.travel.searchResultImmutable = JSON.parse(JSON.stringify(res));
          this.returnObservable(res);
          this.sharedData.travel.searchParameters.departureDate = this.selectedDeparture.date;
          this.sharedData.travel.searchParameters.arrivalDate = this.selectedArrival.date;
          this.sharedData.travel.searchParameters.cabin = this.cabin ? this.cabin : 'All';
          this.sharedData.travel.searchParameters.flightType = this.flightType;
          console.log(res);
          this.loaderSrvc.hideLoader();
          this.sharedData.travel.arilinesChecked = [];
          this.sharedData.travel.listAirlines = null;
          this.handlers.navigate().forward('payments/travel/search-flights/available-flights');
        },
        (err: any) => {
          console.log(err);
          this.loaderSrvc.hideLoader();

          if (err.title) {
            this.alertSrvc.showErrorToast(err.title + this.handlers.responseMsgs().refineSearch);
          }
          else if (err.statusText) {
            this.alertSrvc.showErrorToast(err.statusText + this.handlers.responseMsgs().refineSearch);
          }
          else {
            this.alertSrvc.showErrorToast(this.handlers.responseMsgs().errorOccurredTryLater);
          }

        }
      )


  }

  load() {
    this.loaderSrvc.showLoader();
  }

  returnObservable(response: any): Observable<any> {
    return response;
  }


  counter(type, add?) {
    if (add) {
      if (this.passengers[type] < 9) {
        this.passengers[type]++
      }
      else {
        return;
      }

    }
    else {
      if (this.passengers[type] > 1) {
        this.passengers[type]--
      }
      else if (type !== 'adult' && this.passengers[type] > 0) {
        this.passengers[type]--
      }
      else {
        return;
      }
    }
  }


  validateSearchParameters() {
    if (this.sharedData.travel.departureCity.length === 0) {
      this.alertSrvc.showErrorToast(this.handlers.responseMsgs().selectDepartureCity);
      console.log('invalid departure city')
      return true;
    }
    if (this.sharedData.travel.arrivalCity.length === 0) {
      this.alertSrvc.showErrorToast(this.handlers.responseMsgs().selectArrivalCity);
      console.log('invalid arrival city')
      return true;
    }
    if (this.selectedDeparture.date[0] === null || this.selectedDeparture.date[0] === undefined) {
      this.alertSrvc.showErrorToast(this.handlers.responseMsgs().enterDepartureDate);
      console.log('invalid departure date')
      return true;
    }
    if (this.tripWay === 'roundtrip' && (this.selectedArrival.date[0] === null || this.selectedArrival.date[0] === undefined)) {
      this.alertSrvc.showErrorToast(this.handlers.responseMsgs().enterArrivalDate);
      console.log('invalid arrival date')
      return true;
    }
  }

}
