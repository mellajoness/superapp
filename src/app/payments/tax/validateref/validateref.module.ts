import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ValidaterefPageRoutingModule } from './validateref-routing.module';

import { ValidaterefPage } from './validateref.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ValidaterefPageRoutingModule
  ],
  declarations: [ValidaterefPage]
})
export class ValidaterefPageModule {}
