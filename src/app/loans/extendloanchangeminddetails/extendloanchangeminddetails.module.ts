import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExtendloanchangeminddetailsPageRoutingModule } from './extendloanchangeminddetails-routing.module';

import { ExtendloanchangeminddetailsPage } from './extendloanchangeminddetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExtendloanchangeminddetailsPageRoutingModule
  ],
  declarations: [ExtendloanchangeminddetailsPage]
})
export class ExtendloanchangeminddetailsPageModule {}
