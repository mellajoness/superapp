import { NgModule } from '@angular/core';
import { TravelMethodsPipe } from './travel-methods.pipe';

@NgModule({
  exports: [TravelMethodsPipe],
  declarations: [TravelMethodsPipe],
})
export class TravelMethodsModule {}
