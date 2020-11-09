import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { CheckbalancePageRoutingModule } from './checkbalance-routing.module';

import { CheckbalancePage } from './checkbalance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoundProgressModule,
    CheckbalancePageRoutingModule
  ],
  declarations: [CheckbalancePage]
})
export class CheckbalancePageModule {}
