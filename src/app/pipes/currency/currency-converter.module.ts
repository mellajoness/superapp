import { NgModule } from '@angular/core';
import { CurrencyConverterPipe } from './currency-converter.pipe';

@NgModule({
  exports: [CurrencyConverterPipe],
  declarations: [CurrencyConverterPipe],
})
export class CurrencyConverterModule {}
