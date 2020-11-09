import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtmlocationsPageRoutingModule } from './atmlocations-routing.module';

import { AtmlocationsPage } from './atmlocations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtmlocationsPageRoutingModule
  ],
  declarations: [AtmlocationsPage]
})
export class AtmlocationsPageModule {}
