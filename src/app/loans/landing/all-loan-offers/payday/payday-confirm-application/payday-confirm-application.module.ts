import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaydayConfirmApplicationPageRoutingModule } from './payday-confirm-application-routing.module';

import { PaydayConfirmApplicationPage } from './payday-confirm-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaydayConfirmApplicationPageRoutingModule
  ],
  declarations: [PaydayConfirmApplicationPage]
})
export class PaydayConfirmApplicationPageModule {}
