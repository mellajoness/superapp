import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaptopConfirmApplicationPageRoutingModule } from './laptop-confirm-application-routing.module';

import { LaptopConfirmApplicationPage } from './laptop-confirm-application.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaptopConfirmApplicationPageRoutingModule
  ],
  declarations: [LaptopConfirmApplicationPage]
})
export class LaptopConfirmApplicationPageModule {}
