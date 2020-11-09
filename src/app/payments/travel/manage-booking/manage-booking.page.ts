import { Component, OnInit } from '@angular/core';
import { TravelService } from 'src/app/services/payments/travel/travel.service';
import { AlertService } from 'src/app/services/utilities/alert.service';
import { Handlers } from 'src/app/shared/handlers';
import { SharedData } from 'src/app/shared/shared.components';
import { LoaderService } from 'src/app/services/utilities/loader.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.page.html',
  styleUrls: ['./manage-booking.page.scss', '../../../../theme/payments.scss'],
})
export class ManageBookingPage implements OnInit {


  pnr;
  bookingDetails;

  constructor(
    private travelService: TravelService,
    private alertSrvc: AlertService,
    private loaderSrvc: LoaderService,
    public handlers: Handlers,
    private sharedData: SharedData
  ) { 
    this.initializePage();
  }

  ngOnInit() {
    let x = {"requestId":"1890d675-e34d-4991-8ef7-cc889f6cb4f4","responseCode":"00","responseMessage":"Flight reservation successful!. Kindly ensure you pay before 4/4/2020 11:59:00 PM to get your ticket","data":{"header":{"cookie":"qlfp41qnnfqazypip2kniqnb"},"body":{"status":200,"message":"Your booking was successful, check the response for the pnr code","data":{"pnr":"WND3EY","pnr_type":"F","travellers":[{"person":{"email":"del@dsd.com","birth_date":"2000-04-03","name_prefix":"Mr","surname":"Leke","given_name":"Samnbo"},"documents":null}],"booked_itinerary":[[[[{"departure":{"date":"2020-04-16","time":"13:40:00","airport":{"code":"LOS","name":"Lagos-Murtala Muhammed Intl, Nigeria","city_code":"LOS","city_name":"Lagos","country_code":"NG","country_name":"Nigeria","terminal":"I"}},"arrival":{"date":"2020-04-16","time":"21:00:00","airport":{"code":"ADD","name":"Addis Ababa-Bole Intl, Ethiopia","city_code":"ADD","city_name":"Addis Ababa","country_code":"ET","country_name":"Ethiopia","terminal":"I"}},"flight_number":"1203","res_book_desig_code":"L","flight_duration":"05:20:00","operating_airline":{"code":"ET","name":"Ethiopian Airlines"},"equipment":{"code":"738","name":"Boeing 737-800"},"marketing_airline":{"code":"KP","name":"Asky"},"cabins":[{"rph":"ADT","res_book_desig_cabin_code":"M","res_book_desig_cabin_name":"Economy"}]},{"departure":{"date":"2020-04-16","time":"22:50:00","airport":{"code":"ADD","name":"Addis Ababa-Bole Intl, Ethiopia","city_code":"ADD","city_name":"Addis Ababa","country_code":"ET","country_name":"Ethiopia","terminal":""}},"arrival":{"date":"2020-04-17","time":"04:30:00","airport":{"code":"DXB","name":"Dubai-Dubai Intl, United Arab Emirates","city_code":"DXB","city_name":"Dubai","country_code":"AE","country_name":"United Arab Emirates","terminal":""}},"flight_number":"1121","res_book_desig_code":"L","flight_duration":"04:40:00","operating_airline":{"code":"ET","name":"Ethiopian Airlines"},"equipment":{"code":"738","name":"Boeing 737-800"},"marketing_airline":{"code":"KP","name":"Asky"},"cabins":[{"rph":"ADT","res_book_desig_cabin_code":"M","res_book_desig_cabin_name":"Economy"}]}]],[[{"departure":{"date":"2020-04-28","time":"01:55:00","airport":{"code":"DXB","name":"Dubai-Dubai Intl, United Arab Emirates","city_code":"DXB","city_name":"Dubai","country_code":"AE","country_name":"United Arab Emirates","terminal":"2"}},"arrival":{"date":"2020-04-28","time":"06:00:00","airport":{"code":"KGL","name":"Kigali-International, Rwanda","city_code":"KGL","city_name":"Kigali","country_code":"RW","country_name":"Rwanda","terminal":"2"}},"flight_number":"305","res_book_desig_code":"M","flight_duration":"06:05:00","operating_airline":{"code":"WB","name":"Rwandair Express"},"equipment":{"code":"333","name":"AIRBUS INDUSTRIE A330-300"},"marketing_airline":{"code":"WB","name":"Rwandair Express"},"cabins":[{"rph":"ADT","res_book_desig_cabin_code":"M","res_book_desig_cabin_name":"Economy"}]},{"departure":{"date":"2020-04-28","time":"09:30:00","airport":{"code":"KGL","name":"Kigali-International, Rwanda","city_code":"KGL","city_name":"Kigali","country_code":"RW","country_name":"Rwanda","terminal":""}},"arrival":{"date":"2020-04-28","time":"13:00:00","airport":{"code":"LOS","name":"Lagos-Murtala Muhammed Intl, Nigeria","city_code":"LOS","city_name":"Lagos","country_code":"NG","country_name":"Nigeria","terminal":""}},"flight_number":"202","res_book_desig_code":"M","flight_duration":"04:30:00","operating_airline":{"code":"WB","name":"Rwandair Express"},"equipment":{"code":"738","name":"Boeing 737-800"},"marketing_airline":{"code":"WB","name":"Rwandair Express"},"cabins":[{"rph":"ADT","res_book_desig_cabin_code":"M","res_book_desig_cabin_name":"Economy"}]}]]]],"ticket_time_limit":"2020-04-04T23:59:00","rules_and_penalties":[[{"fare_rule":{"fare_reference":"LPXOWET","filing_airline":{"code":"KP","name":"Asky"},"marketing_airline_code":{"code":"KP","name":"Asky"},"departure_airport":{"code":"LOS","name":"Lagos-Murtala Muhammed Intl, Nigeria","city_code":"LOS","city_name":"Lagos","country_code":"NG","country_name":"Nigeria"},"arrival_airport":{"code":"DXB","name":"Dubai-Dubai Intl, United Arab Emirates","city_code":"DXB","city_name":"Dubai","country_code":"AE","country_name":"United Arab Emirates"},"fare_rules":[{"sub_title":"PENALTIES","sub_code":"PE","info":"\n\n         NOTE -\n          CHANGES BEFORE DEPARTURE\n          PENALTY OF USD 25.00 APPLIES\n          WHEN ANY FARE COMPONENT IS CHANGED THE HIGHEST\n          PENALTY OF ALL FARE COMPONENTS WILL APPLY\n          WHEN CHANGE IS MADE BEFORE DEPARTURE THE FARES\n          FOR THE PASSENGER JOURNEY SHALL BE RECALCULATED\n          IN ACCORDANCE WITH THE FARES IN EFFECT ON THE\n          DATE ON WHICH THE CHANGE IS MADE.\n          WHEN INTERNATIONAL FARES ARE COMBINED WITH\n          INTERNATIONAL FARES THE MOST RESTRICTIVE PENALTY\n          APPLIES REGARDLESS OF THE CHANGED FARE BASIS.\n          ------------------------------------------------\n          EXTENSION OF VALIDITY AND UPGRADING TO A HIGHER\n          FARE IS PERMITTED BY CHARGING THE FARE DIFFERENCE\n          BETWEEN THE FARE PAID AND THE NEW FARE PLUS\n          APPLICABLE REBOOKING PENALTY.\n          REROUTING TO A SECTOR WITH EQUAL OR HIGHER RDB IS\n          PERMITTED BY COLLECTING FARE DIFFERENCE AND\n          APPLICABLE PENALTY.\n          REROUTING TO A SECTOR WITH LOWER RBD IS PERMITTED\n          BUT RESIDUAL FARE DIFFERENCE SHALL NOT BE\n          REFUNDED AND APPLICABLE PENALTY ALSO SHALL BE\n          COLLECTED.\n          UPGRADE-\n          ANY TIME WITHIN THE TICKET VALIDITY FARES CAN BE\n          UPGRADED TO ANY FARE IN A HIGHER CABIN AND THEN\n          THE FARE WILL BE RECALCULATED FROM THE POINT OF\n          ORIGIN PROVIDED THE CONDITIONS OF THE HIGHER\n          CABIN HAVE BEEN ME.  RE-ISSUE AND CHANE FEE WILL\n          NOT BE APPLICABLE HOWEVER ADDITIONAL TAX-IF ANY\n          HAVE TO BE COLLECTED.  IF THE RE-ISSUED TICKET IS\n          SUBSEQUENTLY CANCELLED THE ORIGINAL OR PENALTY OF\n          THE MOST RESTRICTED FARE WILL APPLY.\n          -------------------------------------------------\n          REFUND\n          BEFORE DEPARTURE -LESS USD 25.00\n          -------------------------------------------------\n          YR TAX REFUND\n          BEFORE DEPARTURE - FULL REFUND\n          --------------------------------------------------\n          CHILD AND INFANT DISCOUNT APPLIES ON THE\n          REBOOKING AND REFUND PENALTIES AND NO CHARGE\n          APPLIES FOR INFANT WITHOUT SEAT.\n          --------------------------------------------------\n          CHANGE FEE AND REFUND PENALTY IS WAIVED IN CASE\n          OF DEATH OF PASSENGER OR FAMILY MEMBER.\n"}]}},{"fare_rule":{"fare_reference":"MOWAEST","filing_airline":{"code":"WB","name":"Rwandair Express"},"marketing_airline_code":{"code":"WB","name":"Rwandair Express"},"departure_airport":{"code":"DXB","name":"Dubai-Dubai Intl, United Arab Emirates","city_code":"DXB","city_name":"Dubai","country_code":"AE","country_name":"United Arab Emirates"},"arrival_airport":{"code":"LOS","name":"Lagos-Murtala Muhammed Intl, Nigeria","city_code":"LOS","city_name":"Lagos","country_code":"NG","country_name":"Nigeria"},"fare_rules":[{"sub_title":"PENALTIES","sub_code":"PE","info":"BETWEEN MIDDLE EAST AND AFRICA FOR MOWAEST TYPE FARES\n\n  CHANGES\n\n    ANY TIME\n      CHANGES PERMITTED FOR REISSUE/REVALIDATION.\n         NOTE -\n          ONE CHANGE PERMITTED FREE OF CHARGE\n          ADDITIONAL CHANGES CHARGE USD 100.00 EACH\n          CHARGE USD 150.00 NO SHOW FEE WHERE APPLICABLE\n          .............................................\n          REBOOKING PERMITTED SUBJECT TO THE APPLICABLE\n          BOOKING CLASS BEING AVAILABLE. IF THE BOOKING\n          CLAS IS NOT AVAILABLE UPGRADE THE DIFFERENCE IN\n          FARE PLUS CHANGE OF RESERVATION FEE AND NO SHOW\n          WHERE APPLICABLE\n          ............................................\n          WHERE THIS FARE IS COMBINED WITH ANY OTHER FARE\n          ON A HALF ROUND-TRIP BASIS THE MOST\n          RESTRICTIVE/HIGHEST CANCELLATION/CHANGES FEE WILL\n          APPLY TO THE ENTIRE JOURNEY\n\n  CANCELLATIONS\n\n    ANY TIME\n      TICKET IS NON-REFUNDABLE IN CASE OF CANCEL/REFUND.\n         NOTE -\n          YQ/YR IS ALSO NON-REFUNDABLE FOR NON-RE\n          FUNDABLE TICKETS\n          ---------------------------------------------\n          WAIVERS\n           1.WAIVED FOR DEATH OF PASSENGER OR IMMEDIATE\n          FAMILY MEMBER.\n          A COPY OF VALID DEATH CERTIFICATE ISSUED BY A\n          COMPETENT MEDICAL AUTHORITY IS REQUIRED.\n           2.NO WAIVER APPLICABLE FOR ILLNESS OF PASSENGER\n          OR FAMILY MEMBER.\n           3.CONTACT WB LOCAL OFFICE FOR WAIVERS DEFINED\n          ABOVE.\n"}]}}]],"price_message_info":[],"pricing":{"provider":{"base_fare":"301624","total_fare":"467154","fare_break_down":[{"passenger":{"code":"ADT","quantity":"1"},"provider_fare":{"base":"301624","taxes":["165530"],"total":"467154"}}]},"portal_fare":{"base_fare":"467154","mark_up_fare":{"user":0,"role":0,"airline":0,"cabin":0,"total":0},"mark_down_fare":{"user":0,"role":0,"airline":0,"cabin":0,"total":0},"vat":0.0,"total_fare":467154.0}},"reference_number":null,"fail_back":null},"additional_message":"Proceed to call the issue ticket endpoint to issue ticket for the customer if payment has been confirmed","errors":null}}}
    console.log(x);
  }

  initializePage() {
    this.sharedData.travel.departureCity = [];
    this.sharedData.travel.arrivalCity = [];
  }

  getPNR() {
    this.loaderSrvc.showLoader();
    const postData = {
      header: {
        cookie: ""
      },
      body: {
        pnr: this.pnr,
        type: "flight"
      }
    }

    this.travelService.getPnr(postData)
    .subscribe(
      (res:any) => {

        if(res && res.data && res.data.body && res.data.body.status !== 200) {
          if(res.data.body.message) {
            this.alertSrvc.showErrorToast(res.data.body.message)
          }
          else {
            this.alertSrvc.showErrorToast("No records found for the provided PNR.");
          }
          this.loaderSrvc.hideLoader()
        }


        console.log(res);

        let ticketDate = new Date(res.data.body.data.booking_information.ticket_time_limit);
        let todaysDate = new Date();
        if (todaysDate > ticketDate) {
          this.alertSrvc.showErrorToast("Reservation time limit exceeded. Kindly make another reservation.");
          this.loaderSrvc.hideLoader();
          return;
        }

        this.sharedData.travel.pnrResponse = res;
        console.log(JSON.parse(res.data.body.data.booking_information.pnr_request_response));
        this.sharedData.travel.bookingDetails = JSON.parse(res.data.body.data.booking_information.pnr_request_response);

        let origin_destinations = this.sharedData.travel.bookingDetails.booked_itinerary[0];
        let origin = origin_destinations[0]
        let destination = origin_destinations[origin_destinations.length - 1];
        let origin_segments = origin[0];
        let destination_segments = destination[0];
        let departure = origin_segments[0].departure;
        let arrival = origin_segments[origin_segments.length - 1].arrival;

        let returnArrival = destination_segments[destination_segments.length - 1].arrival;
        

        
        // if (departure.airport.code === arrival.airport.code) {
        if (origin_segments[0].departure.airport.code === destination_segments[destination_segments.length - 1].arrival.airport.code) {
          this.sharedData.travel.roundtrip = true;
        }
        else {
          this.sharedData.travel.roundtrip = false;
        }

        this.sharedData.travel.searchParameters.departureDate[0] = departure.date;
        this.sharedData.travel.departureCity[0] = {name: departure.airport.city_name};
        this.sharedData.travel.arrivalCity[0] = {name: arrival.airport.city_name};
        this.sharedData.travel.searchParameters.arrivalDate[this.sharedData.travel.searchParameters.arrivalDate.length - 1] = returnArrival.date;


        // Get number of passengers
        this.sharedData.travel.passengers.adult = this.sharedData.travel.bookingDetails.pricing.provider.fare_break_down[0].passenger.quantity
        this.sharedData.travel.passengers.child = this.sharedData.travel.bookingDetails.pricing.provider.fare_break_down[1] ? this.sharedData.travel.bookingDetails.pricing.provider.fare_break_down[1].passenger.quantity : 0
        this.sharedData.travel.passengers.infant = this.sharedData.travel.bookingDetails.pricing.provider.fare_break_down[2] ? this.sharedData.travel.bookingDetails.pricing.provider.fare_break_down[2].passenger.quantity : 0
        // Get number of passengers



        this.loaderSrvc.hideLoader();
        this.sharedData.travel.bookingInfoType = 'pnr';
        this.handlers.navigate().forward('payments/travel/booking-confirmation');
        this.pnr = null;
      },
      err => {
        console.log(err)
        this.loaderSrvc.hideLoader();
      }
    )
  }

}
