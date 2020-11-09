import { Encryption } from './../../../services/encryption/encryption';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormsPageRoutingModule } from './book-flight-forms-routing.module';

import { FormsPage } from './book-flight-forms.page';
import { TravelMethodsModule } from 'src/app/pipes/travelMethods/travel-methods.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsPageRoutingModule,
    TravelMethodsModule
  ],
  declarations: [FormsPage],
  providers: [Encryption]
})
export class FormsPageModule {}
