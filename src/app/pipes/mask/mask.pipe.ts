import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mask',
  pure: false
})
export class MaskPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return this.mask(value);
  }

  mask(val: number) {
    let result = '';
    if (val >= 0 && val <= 9)
    return result += "*";
  }
}
