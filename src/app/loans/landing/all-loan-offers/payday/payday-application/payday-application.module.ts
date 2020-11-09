import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaydayApplicationPageRoutingModule } from './payday-application-routing.module';

import { PaydayApplicationPage } from './payday-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PaydayApplicationPageRoutingModule
  ],
  declarations: [PaydayApplicationPage]
})
export class PaydayApplicationPageModule {}
