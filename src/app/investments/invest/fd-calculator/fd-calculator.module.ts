import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FdCalculatorPageRoutingModule } from './fd-calculator-routing.module';

import { FdCalculatorPage } from './fd-calculator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FdCalculatorPageRoutingModule
  ],
  declarations: [FdCalculatorPage]
})
export class FdCalculatorPageModule {}
