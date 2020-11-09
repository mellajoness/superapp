import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accounts'
})
export class AccountsPipe implements PipeTransform {

  transform(value: String): String {
    if(value == 'CAA') {
      return 'Current';
    }
    else if(value == 'SBA') {
      return 'Savings';
    }
    else if(value == 'ODA') {
      return 'Overdraft';
    }
  }
}
