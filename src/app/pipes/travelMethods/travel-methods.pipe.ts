import { Pipe, PipeTransform } from '@angular/core';
import { Handlers } from 'src/app/shared/handlers';

@Pipe({
  name: 'travelMethods'
})
export class TravelMethodsPipe implements PipeTransform {

  constructor(private handlers: Handlers) { }

  count = 0;

  transform(value: any, operation?: any, arg1?: any, arg2?: any, arg3?: any, arg4?: any): any {
    if (operation === 'refund') {
      return this.refund(value)
    }
    if (operation === 'maxDate') {
      return this.maxDate(value)
    }
    if (operation === 'slice') {
      return this.slice(value, arg1, arg2)
    }
    if (operation === 'hrMin') {
      return this.formatDuration(value, arg1)
    }
    if (operation === 'DayName_dd_Mon_YYYY') {
      return this.getDayName_dd_Mon_YYYY(value, arg1)
    }
    if (operation === 'passengerDOB') {
      return this.passengerDOB(value, arg1, arg2)
    }
    return this.monthDay(value);
  }

  monthDay(dateString: any) {
    this.count++;
    console.log('<<*************>> <<*************>> <<*************>> <<*************>>')
    const dateComponents = this.handlers.extractDateComponents(dateString);
    console.log(this.count);
    return `${dateComponents.month} ${dateComponents.day}`
  }

  getDayName_dd_Mon_YYYY(dateString: any, ordinal?: Boolean) {
    return this.handlers.getDayName_dd_Mon_YYYY(dateString, ordinal)
  }

  refund(itinerary) {
    let refund = null;

    // const trip = itinerary.origin_destinations[0].segments[0];
    if (itinerary.pricing.provider.fare_break_down[0].ticket_designator[0].ticket_designator_code) {
      if (itinerary.pricing.provider.fare_break_down[0].ticket_designator[0].ticket_designator_code.slice(0, 2) == '70') {
        refund = "Unavailable"
      }
      else if (itinerary.pricing.provider.fare_break_down[0].ticket_designator[0].ticket_designator_code.slice(0, 2) == '71') {
        refund = "Before Departure"
      }
      else if (itinerary.pricing.provider.fare_break_down[0].ticket_designator[0].ticket_designator_code.slice(0, 2) == '73') {
        refund = "With Penalty";
      }
      else {
        refund = null;
      }
    }
    return refund;
  }

  maxDate(x) {
    const date = new Date();
    const year = (this.handlers.getYear(date)).toString();
    let month = (this.handlers.getMonth(date) + 6).toString();
    if (month.length === 1) {
      month = `0${month}`
    }

    const maxDate = `${year}-${month}`
    console.log(maxDate)

    return maxDate
  }

  slice(string, start, end) {
    string = string.toString();
    return string.slice(start, end);
  }

  formatDuration(duration, short?) {
    let hr = duration.slice(0, 2);
    let min;
    if (short === true) {
      min = duration.slice(2, 4);
    }
    else {
      min = duration.slice(3, 5);
    }

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

  passengerDOB(todaysDate, passengerType, dateType) {

    const today = new Date().getTime();
    let date = null;
    const milli12 = (12 * 31556952000);
    const milli11 = (11.999 * 31556952000);
    const milli2 = (2 * 31556952000);
    let result;


    if(passengerType === 'ADT') {
      if(dateType === 'min') {
        return
      } 
      else {
        date = new Date(Math.abs(today - milli12));
        result = this.handlers.getYYYYMMdd(date);
      } 
    }
    else if (passengerType === 'CHI') {
      if(dateType === 'min') {
        date = new Date(Math.abs(today - milli11));
        result = this.handlers.getYYYYMMdd(date);
      }
      else {
        date = new Date(Math.abs(today - milli2));
        result = this.handlers.getYYYYMMdd(date);
      }
    }
    else {
      if(dateType === 'min') {
        date = new Date(Math.abs(today - milli2));
        result = this.handlers.getYYYYMMdd(date);
      }
      else {
        result = todaysDate;
      }
    }
    return result;
  }

}
