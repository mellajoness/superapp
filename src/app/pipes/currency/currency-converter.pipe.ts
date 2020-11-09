import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyConverter',
  pure: false
})
export class CurrencyConverterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (args === 'comma') {
      return this.currencyComma(value)
    }
    return this.currencyConverter(value);
  }

  currencyConverter(accountCurrency: any) {
    let result = '';
    if (accountCurrency == 'NGN') {
        result = '&#8358;';   
    } else if (accountCurrency == 'USD') {
        result = '&dollar;';
    } else if (accountCurrency == 'GBP') {
        result = '&pound;';
    } else if (accountCurrency == 'EUR') {
        result = '&euro;'; 
    }
    return result;
  }

  currencyComma(amount: any) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
