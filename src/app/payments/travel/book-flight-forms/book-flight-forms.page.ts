import { Encryption } from './../../../services/encryption/encryption';
import { Component, OnInit } from '@angular/core';
import { Handlers } from 'src/app/shared/handlers';
import { SharedData } from 'src/app/shared/shared.components';
import { TravelService } from 'src/app/services/payments/travel/travel.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-forms',
  templateUrl: './book-flight-forms.page.html',
  styleUrls: ['./book-flight-forms.page.scss', '../../../../theme/payments.scss'],
})
export class FormsPage implements OnInit {

  passengerDetails;
  flightType;
  searchResult;
  idType;
  id;
  issuingCountry;
  expiryDate;
  todaysDate;
  maxExpiryDate;
  fauxLoopArray = [];
  formHeadings;
  index;
  passengersInfo = [];
  passengersComplete;
  invalidInputs;
  maxDOB;

  constructor(
    public handlers: Handlers,
    public sharedData: SharedData,
    private travelService: TravelService,
    private loaderSrvc: LoaderService,
    private alertSrvc: AlertService,
    private storageService: StorageService,
    private encryption: Encryption
  ) {
    this.initializePage();
  }

  initializePage() {
    this.todaysDate = this.handlers.getYYYYMMdd(new Date(Date.now()));
    this.maxExpiryDate = this.handlers.getYear() + 10;
    this.flightType = this.sharedData.travel.searchParameters.flightType;
    // this.passengerDetails = {
    //   dob: null,
    //   email: null,
    //   phone: null,
    //   surname: null,
    //   otherNames: null,
    //   title: null,
    //   documents_info: {
    //     type: null,
    //     id: null,
    //     issue_country_code: null,
    //     expire_date: null
    //   }
    // }

    this.resetPassengerDetails();
    this.invalidInputs = {
      title: null,
      surname: null,
      otherNames: null,
      email: null,
      phone: null,
      dob: null,
      idType: null,
      id: null,
      issuingCountry: null,
      expiryDate: null
    }

    this.maxDOB = {
      adult: null,
      child: null,
      infant: null
    }

    this.searchResult = this.sharedData.travel.searchResult;

    console.log("===================> FORMS");
    console.log(this.searchResult);


    // Mock
    // this.sharedData.travel.passengers.adult = 3;
    // this.sharedData.travel.passengers.child = 2;
    // this.sharedData.travel.passengers.infant = 1;
    // Mock

    this.index = 0;
    this.passengersInfo = [];
    this.formHeadings = this.formsToDisplay();


    // Get countries from storage
    this.storageService.get("countries")
      .then(
        (countries) => {
          this.sharedData.travel.countries = countries;
        }
      )
      
      // Mock data
      // this.formHeadings[0] = {type: 'INF'};
  }

  resetPassengerDetails() {
    this.passengerDetails = {
      dob: null,
      email: null,
      phone: null,
      surname: null,
      otherNames: null,
      title: null,
      documents_info: {
        type: null,
        id: null,
        issue_country_code: null,
        expire_date: null
      }
    }
    this.idType = null;
    this.id = null;
    this.issuingCountry = null;
    this.expiryDate = null;
  }

  ngOnInit() {
  }

  formsToDisplay() {
    let totalForms = this.sharedData.travel.passengers.adult + this.sharedData.travel.passengers.child + this.sharedData.travel.passengers.infant;
    this.fauxLoopArray = this.handlers.generateArrayOfNumbers(0, totalForms);
    let formHeadings = [];

    const populateHeadingsArray = (passengerType) => {
      if (this.sharedData.travel.passengers[passengerType] && this.sharedData.travel.passengers[passengerType] > 0) {
        for (let i = 1; i <= this.sharedData.travel.passengers[passengerType]; i++) {
          let type;
          if (passengerType === 'adult') {
            type = 'ADT'
          }
          else if (passengerType === 'child') {
            type = 'CHI'
          }
          else {
            type = 'INF'
          }
          formHeadings.push({
            name: `${passengerType} ${i}`,
            type
          })
        }
      }
    }

    populateHeadingsArray('adult');
    populateHeadingsArray('child');
    populateHeadingsArray('infant');

    return formHeadings;
  }

  convertDate(date) {
    console.log(date)
    let x = this.handlers.getddMMYYYY(new Date(date));
    x = this.handlers.convertDDMMYYtoMMDDYY(x);
    x = x.split('-').join('/')
    return x;
  }

  bookFlight() {

    if (!this.validateInputs()) {
      return;
    }

    const inputs = {
      type: this.formHeadings[this.index].type,
      personal_info: {
        name_prefix: this.passengerDetails.title,
        surname: this.passengerDetails.surname,
        given_name: this.passengerDetails.otherNames,
        birth_date: this.convertDate(this.passengerDetails.dob),
        email: this.passengerDetails.email,
        phone: {
          country_code: "NG",
          area_city_code: "LOS",
          number: this.passengerDetails.phone,
          type: "Home"
        }
      },
      documents_info: {
        type: this.idType,
        id: this.id,
        issue_country_code: this.issuingCountry,
        expire_date: this.convertDate(this.expiryDate)
      }
    }

    this.loaderSrvc.showLoader();
    this.passengersInfo.push(inputs);


    const postData = {
      header: {
        cookie: this.searchResult.data.header.cookie
      },
      body: {
        one_way_combinable_fare: "false",
        combination_id: parseInt(this.sharedData.travel.selectedItinerary.combination_id),
        sequence_number: parseInt(this.sharedData.travel.selectedItinerary.sequence_number),
        validating_airline_code: this.sharedData.travel.selectedItinerary.validating_airline_code,
        cabin_code: this.sharedData.travel.selectedItinerary.cabin.code,
        stops: parseInt(this.sharedData.travel.selectedItinerary.stops),
        direction_ind: parseInt(this.sharedData.travel.selectedItinerary.stops),
        destination_city: this.sharedData.travel.arrivalCity[0].code,
        cipheredtravellersInfo: this.cipher(),
        isOutBoundFlight: this.flightType === 'domestic' ? false : true,
        hash: this.hash()
      }
    }

    console.log(postData);


    this.travelService.bookFlight(postData)
      .subscribe(
        (res: any) => {
          console.log(res);
          this.loaderSrvc.hideLoader();
          this.passengersInfo.pop();
          if (res.data && res.data.body && res.data.body.status != 200 && res.responseMessage) {
            this.alertSrvc.showErrorToast(res.responseMessage);
            return;
          }
          else if (res.data && res.data.body && res.data.body.status != 200) {
            this.alertSrvc.showErrorToast('An error occurred. Please try again.');
            return;
          }
          this.sharedData.travel.bookingDetails = res;
          this.handlers.navigate().forwardWithoutHistory('payments/travel/booking-confirmation');
        },
        (err: any) => {
          console.log(err);
          this.alertSrvc.showErrorToast("An error occurred. Please try again");
          this.loaderSrvc.hideLoader();
          this.passengersInfo.pop();
        }
      )
  }

  continue() {

    if (!this.validateInputs()) {
      return;
    }

    const inputs = {
      type: this.formHeadings[this.index].type,
      personal_info: {
        name_prefix: this.passengerDetails.title,
        surname: this.passengerDetails.surname,
        given_name: this.passengerDetails.otherNames,
        birth_date: this.convertDate(this.passengerDetails.dob),
        email: this.passengerDetails.email,
        phone: {
          country_code: "NG",
          area_city_code: "LOS",
          number: this.passengerDetails.phone,
          type: "Home"
        }
      },
      documents_info: this.flightType === 'domestic' ? '' : {
        type: this.idType,
        id: this.id,
        issue_country_code: this.issuingCountry,
        expire_date: this.convertDate(this.expiryDate)
      }
    }

    // const inputs = this.formHeadings[this.index];

    this.passengersInfo.push(inputs);
    console.log(this.passengersInfo);

    if (this.index < this.formHeadings.length) {
      this.index++
      this.resetPassengerDetails();
    }
    else {
      this.passengersComplete = true;
    }
  }

  validateInputs() {
    const international = this.sharedData.travel.searchParameters.flightType === 'international' ? true : false;
    let formValid = false;
    this.invalidInputs = {
      title: null,
      surname: null,
      otherNames: null,
      email: null,
      phone: null,
      dob: null,
      idType: null,
      id: null,
      issuingCountry: null,
      expiryDate: null
    }

    if (this.passengerDetails.title === null) {
      this.invalidInputs.title = true;
    }
    if (this.passengerDetails.surname === null) {
      this.invalidInputs.surname = true;
    }
    if (this.passengerDetails.otherNames === null) {
      this.invalidInputs.otherNames = true;
    }
    if (this.passengerDetails.dob === null) {
      this.invalidInputs.dob = true;
    }
    if (!this.handlers.validateEmail(this.passengerDetails.email)) {
      this.invalidInputs.email = true;
    }
    if (this.passengerDetails.phone === null) {
      this.invalidInputs.phone = true;
    }
    if (international && this.idType === null) {
      this.invalidInputs.idType = true;
    }
    if (international && this.id === null) {
      this.invalidInputs.id = true;
    }
    if (international && this.issuingCountry === null) {
      this.invalidInputs.issuingCountry = true;
    }
    if (international && this.expiryDate === null) {
      this.invalidInputs.expiryDate = true;
    }

    if (this.invalidInputs.title || this.invalidInputs.surname || this.invalidInputs.otherNames ||
      this.invalidInputs.email || this.invalidInputs.dob || this.invalidInputs.phone ||
      this.invalidInputs.idType || this.invalidInputs.id || this.invalidInputs.issuingCountry ||
      this.invalidInputs.expiryDate
    ) {
      formValid = false;
    }
    else {
      formValid = true;
    }

    return formValid
  }

  hash() {
    return this.encryption.hash_SHA512(
      this.searchResult.data.header.cookie +
      this.cipher(),
      ''
      )
  }

  cipher() {
    return this.encryption.encrypt_AES256_Flight(JSON.stringify(this.passengersInfo));
  }

}
