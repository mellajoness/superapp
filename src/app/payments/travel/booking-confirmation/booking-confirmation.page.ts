import { AuthService } from './../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Handlers } from 'src/app/shared/handlers';
import { TravelService } from 'src/app/services/payments/travel/travel.service';
import { LoaderService } from 'src/app/services/utilities/loader.service';
import { SharedData } from 'src/app/shared/shared.components';
import { AlertService } from 'src/app/services/utilities/alert.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.page.html',
  styleUrls: ['./booking-confirmation.page.scss', '../../../../theme/payments.scss'],
})
export class BookingConfirmationPage implements OnInit {

  arrowIcon;
  dates;
  todaysDate;
  bookingDetails;
  bookedItinerary;
  customerPhone;
  customerEmail;
  paymentData;
  token;
  SessionID;

  constructor(
    public handlers: Handlers,
    private travelService: TravelService,
    protected loaderSrvc: LoaderService,
    public sharedData: SharedData,
    private alertSrvc: AlertService,
    private authSrvc: AuthService

  ) {
    this.authSrvc.currentTokenData.subscribe(res => {
      this.token = res;
    });

    this.authSrvc.currentSessionIDData.subscribe(
      res => {
        this.SessionID = res;
      }
    )
    this.initializePage();
  }

  ngOnInit() {
    this.sharedData.travel.paymentComplete = false;
  }

  initializePage() {

    this.customerPhone = this.sharedData.userProfile.phoneNumber;
    this.customerEmail = this.sharedData.userProfile.emailAddress;
    this.paymentData = {
      walletId: this.sharedData.userProfile.walletAcctNumber,
      accounts: this.sharedData.userAccounts
    }


    this.todaysDate = this.handlers.getYYYYMMdd(new Date(Date.now()));
    this.dates = {
      arrival: null,
      departure: null
    };
    this.arrowDirection();
    this.formatDates();


    // MOCK
    // this.sharedData.travel.bookingDetails = {"requestId":"d1f5e801-8e6a-4184-ae39-04e0d15d4933","responseCode":"00","responseMessage":"Flight reservation successful!. Kindly ensure you pay before 4/2/2020 11:59:00 PM to get your ticket","data":{"header":{"cookie":"clz3zui2b0wenamtocaitd0j"},"body":{"status":200,"message":"Your booking was successful, check the response for the pnr code","data":{"pnr":"QSOYLL","pnr_type":"F","travellers":[{"person":{"email":"folarindipo@mail.com","birth_date":"2000-04-01","name_prefix":"Mr","surname":"Folarin","given_name":"Olaldipupo"},"documents":null}],"booked_itinerary":[[[[{"departure":{"date":"2020-04-17","time":"12:30:00","airport":{"code":"LOS","name":"Lagos-Murtala Muhammed Intl, Nigeria","city_code":"LOS","city_name":"Lagos","country_code":"NG","country_name":"Nigeria","terminal":"I"}},"arrival":{"date":"2020-04-17","time":"19:50:00","airport":{"code":"NBO","name":"Nairobi-Jomo Kenyatta, Kenya","city_code":"NBO","city_name":"Nairobi","country_code":"KE","country_name":"Kenya","terminal":"I"}},"flight_number":"533","res_book_desig_code":"T","flight_duration":"05:20:00","operating_airline":{"code":"KQ","name":"Kenya Airways"},"equipment":{"code":"738","name":"Boeing 737-800"},"marketing_airline":{"code":"KQ","name":"Kenya Airways"},"cabins":[{"rph":"ADT","res_book_desig_cabin_code":"M","res_book_desig_cabin_name":"Economy"}]},{"departure":{"date":"2020-04-17","time":"22:20:00","airport":{"code":"NBO","name":"Nairobi-Jomo Kenyatta, Kenya","city_code":"NBO","city_name":"Nairobi","country_code":"KE","country_name":"Kenya","terminal":"1A"}},"arrival":{"date":"2020-04-18","time":"04:35:00","airport":{"code":"DXB","name":"Dubai-Dubai Intl, United Arab Emirates","city_code":"DXB","city_name":"Dubai","country_code":"AE","country_name":"United Arab Emirates","terminal":"1A"}},"flight_number":"304","res_book_desig_code":"T","flight_duration":"05:15:00","operating_airline":{"code":"KQ","name":"Kenya Airways"},"equipment":{"code":"788","name":"Boeing 787-8"},"marketing_airline":{"code":"KQ","name":"Kenya Airways"},"cabins":[{"rph":"ADT","res_book_desig_cabin_code":"M","res_book_desig_cabin_name":"Economy"}]}]]]],"ticket_time_limit":"2020-04-02T23:59:00","rules_and_penalties":[[{"fare_rule":{"fare_reference":"TSRWNG","filing_airline":{"code":"KQ","name":"Kenya Airways"},"marketing_airline_code":{"code":"KQ","name":"Kenya Airways"},"departure_airport":{"code":"LOS","name":"Lagos-Murtala Muhammed Intl, Nigeria","city_code":"LOS","city_name":"Lagos","country_code":"NG","country_name":"Nigeria"},"arrival_airport":{"code":"DXB","name":"Dubai-Dubai Intl, United Arab Emirates","city_code":"DXB","city_name":"Dubai","country_code":"AE","country_name":"United Arab Emirates"},"fare_rules":[{"sub_title":"PENALTIES","sub_code":"PE","info":"FOR TSRWNG TYPE FARES\n\n  CHANGES\n\n    BEFORE DEPARTURE\n      CHARGE USD 50.00.\n         NOTE -\n          CHARGE NO SHOW FEE WHERE APPLICABLE.\n\n    AFTER DEPARTURE\n      CHARGE USD 50.00.\n         NOTE -\n          CHARGE NO SHOW FEE WHERE APPLICABLE.\n\n    ANY TIME\n      CHARGE USD 100.00 FOR NO-SHOW.\n         NOTE -\n          CHARGE NO SHOW FEE WHERE APPLICABLE\n\n  CANCELLATIONS\n\n    BEFORE DEPARTURE\n      CHARGE USD 100.00 FOR REFUND.\n      WAIVED FOR DEATH OF PASSENGER.\n         NOTE -\n          FREE TEXT -\n          CANCELLATION FEE APPLIES IF THE FARE COMPONENT IS\n          REFUNDED PLUS ANY APPLICABLE NO-SHOW\n          PENALTY.\n          WAIVED FOR DEATH OF PASSENGER.\n          CANCELLATION/REFUND/NO-SHOW FEES ARE NOT\n          COMMISSIONABLE\n          -------------------------------------------------\n          WAIVED FOR DEATH OF PASSENGER/IMMEDIATE FAMILY\n          MEMBER\n          NOTE-\n          FREE TEXT-\n          1. WAIVED FOR DEATH OF PASSENGER OR IMMEDIATE\n             FAMILY MEMBER\n             A COPY OF VAILD DEATH CERTIFICATE ISSUED BY A\n             COMPETENT MEDICAL AUTHORITY IS REQURIED.\n             ISSUED BY A COMPETENT MEDICAL AUTHORITY IS\n             REQURIED.\n          2. NO WAIVER APPLICABLE FOR ILLNESS OF PASSANGER\n             OR FAMILY MEMBER.\n          3. CONTACT KQ LOCAL OFFICE FOR WAIVERS DEFINED\n             ABOVE OR REFER TO GGAIRKQ PAGES SPECIFIC TO\n             REFUNDS GPREF\n          CANCELLATION FEE APPLIES IF THE FARE COMPONENT IS\n          REFUNDED PLUS ANY APPLICABLE NO-SHOW PENALITY.\n          WAIVED FOR DEATH OF PASSENGER.\n          CANCELLATION/REFUND/NO-SHOW FEES ARE NOT\n          COMMISSIONABLE\n\n    AFTER DEPARTURE\n      TICKET IS NON-REFUNDABLE IN CASE OF REFUND.\n      WAIVED FOR DEATH OF PASSENGER.\n         NOTE -\n          AFTER DEPARTURE TICKET IS NON REFUNDABLE. WAIVED\n          FOR DEATH OF PASSENGER.\n          YQ/YR IS NOT REFUNDABLE\n          ------------------------------------------------\n          WAIVERS\n           WAIVED FOR DEATH OF PASSENGER/ IMMEDIATE FAMILY\n          MEMBER\n            NOTE-\n           AFTER DEPARTURE TICKET IS NON REFFUNDABLE.\n          1. WAIVED FOR DEATH OF PASSENGER OR IMMEDIATE\n             FAMILY MEMBER\n             A COPY OF VALID DEATH CERTIFICATE ISSUED BY A\n             COMPETENT MEDICAL AUTHORITY IS REQUIRED.\n          2. NO WAIVER APPLICABLE FOR ILLINESS OF PASSENGER\n             OR FAMILY MEMBER.\n          3. CONTACT KQ LOCAL OFFICE FOR WAIVER DEFINED\n             ABOVE OR REFER TO GGAIRKQ PAGES SPECIFIC TO\n             REFUNDS GPREF YQ/YR IS NOT REFUNDABLE\n"}]}}]],"price_message_info":[],"pricing":{"provider":{"base_fare":"134365","total_fare":"215452","fare_break_down":[{"passenger":{"code":"ADT","quantity":"1"},"provider_fare":{"base":"134365","taxes":["81087"],"total":"215452"}}]},"portal_fare":{"base_fare":"215452","mark_up_fare":{"user":0,"role":0,"airline":0,"cabin":0,"total":0},"mark_down_fare":{"user":0,"role":0,"airline":0,"cabin":0,"total":0},"vat":0.0,"total_fare":215452.0}},"reference_number":null,"fail_back":null},"additional_message":"Proceed to call the issue ticket endpoint to issue ticket for the customer if payment has been confirmed","errors":null}}}
    // MOCK


    this.bookingDetails = this.sharedData.travel.bookingDetails;
    console.log(this.bookingDetails);

    if (this.sharedData.travel.bookingInfoType === 'pnr') {
      this.bookedItinerary = this.bookingDetails.booked_itinerary;
    }
    else {
      this.bookedItinerary = this.bookingDetails.data.body.data.booked_itinerary;
    }

  }

  arrowDirection() {
    if (this.sharedData.travel.roundtrip) {
      this.arrowIcon = "swap-horizontal";
    }
    else {
      this.arrowIcon = "arrow-forward";
    }
  }

  formatDates() {
    this.dates.arrival = this.handlers.getDayName_dd_Mon_YYYY(this.sharedData.travel.searchParameters.arrivalDate[this.sharedData.travel.searchParameters.arrivalDate.length - 1], true);
    this.dates.departure = this.handlers.getDayName_dd_Mon_YYYY(this.sharedData.travel.searchParameters.departureDate[0], true);
  }

  payNow() {
    this.sharedData.paymentInfo = {};
    this.sharedData.billsPaymentsMode = this.handlers.variables().flight;
    this.sharedData.paymentInfo['amount'] = this.sharedData.travel.bookingInfoType === 'pnr' ? this.bookingDetails.pricing.portal_fare.total_fare : this.bookingDetails.data.body.data.pricing.portal_fare.total_fare;
    this.sharedData.paymentObj = {
      userId: this.customerPhone,
      channel: this.handlers.responseMsgs().trupay,
      paymentSourceId: null,
      narration: this.handlers.responseMsgs().travelNarration + (this.sharedData.travel.bookingInfoType === 'pnr' ? this.bookingDetails.pnr : this.bookingDetails.data.body.data.pnr),
      amount: this.sharedData.travel.bookingInfoType === 'pnr' ? this.bookingDetails.pricing.portal_fare.total_fare : this.bookingDetails.data.body.data.pricing.portal_fare.total_fare,
      bookingReference: this.sharedData.travel.bookingInfoType === 'pnr' ? this.bookingDetails.pnr : this.bookingDetails.data.body.data.pnr,
      paymentMethod: null,
      pin: null,
      userToken: `${this.token}::${this.SessionID}`,
      emailForNotification: this.customerEmail
    }
    this.handlers.navigate().forward('payments/payment');
  }

  fareRules() {
    const pnr = this.sharedData.travel.bookingInfoType === 'pnr' ? this.sharedData.travel.bookingDetails.pnr : this.bookingDetails.data.body.data.pnr
    this.travelService.getFlightFareRules(pnr);
  }
}
