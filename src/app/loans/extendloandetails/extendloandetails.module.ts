import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtendloandetailsPageRoutingModule } from './extendloandetails-routing.module';

import { ExtendloandetailsPage } from './extendloandetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtendloandetailsPageRoutingModule
  ],
  declarations: [ExtendloandetailsPage]
})
export class ExtendloandetailsPageModule {}
