import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon',
  pure: false
})
export class IconPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.icon(value);
  }

  icon(val: string) {
    let result = '';
    if (val === 'AIRTELVTU') {
      return result += "../../../assets/icon/billspayments/airtel.png";
    } else if (val === 'GLOVTU') {
      return result += "../../../assets/icon/billspayments/glo.png";
    } else if (val === 'MTNVTU') {
      return result += "../../../assets/icon/billspayments/mtn.png";
    } else if (val === 'ETISALATVTU') {
      return result += "../../../assets/icon/billspayments/9inemobile.png";
    } else if (val === '13') {
      return result += "../../../assets/icon/billspayments/dstv.png";
    } else if (val === '14') {
      return result += "../../../assets/icon/billspayments/gotv.png";
    } else if (val === '101') {
      return result += "../../../assets/icon/billspayments/star.png";
    } else if (val === '100') {
      return result += "../../../assets/icon/billspayments/star.png";
    } else if (val === 'bet9ja') {
      return result += "../../../assets/icon/billspayments/bet9ja.png";
    } else if (val === '202') {
      return result += "../../../assets/icon/billspayments/mtn.png";
    } else if (val === '201') {
      return result += "../../../assets/icon/billspayments/airtel.png";
    } else if (val === '204') {
      return result += "../../../assets/icon/billspayments/glo.png";
    } else if (val === '203') {
      return result += "../../../assets/icon/billspayments/9mobile.png";
    } else if (val === '200') {
      return result += "../../../assets/icon/billspayments/smile.png";
    } else if (val === '7') {
      return result += "../../../assets/icon/billspayments/bedc.png";
    } else if (val === '1') {
      return result += "../../../assets/icon/billspayments/ekedc.png";
    } else if (val === '3') {
      return result += "../../../assets/icon/billspayments/eedc.png";
    } else if (val === '4') {
      return result += "../../../assets/icon/billspayments/ibedc.png";
    } else if (val === '10') {
      return result += "../../../assets/icon/billspayments/ice.png";
    } else if (val === '2') {
      return result += "../../../assets/icon/billspayments/ikee.png";
    } else if (val === '11') {
      return result += "../../../assets/icon/billspayments/jos.png";
    } else if (val === '5') {
      return result += "../../../assets/icon/billspayments/adun.png";
    } else if (val === '9') {
      return result += "../../../assets/icon/billspayments/kedco.png";
    } else if (val === '8') {
      return result += "../../../assets/icon/billspayments/phed.png";
    } else if (val === '6') {
      return result += "../../../assets/icon/billspayments/yedc.png";
    } else {
      return result += "../../../assets/icon/billspayments/dstv.png";
    }
  }

}
