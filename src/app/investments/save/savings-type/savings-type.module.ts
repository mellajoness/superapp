import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SavingsTypePageRoutingModule } from './savings-type-routing.module';

import { SavingsTypePage } from './savings-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SavingsTypePageRoutingModule
  ],
  declarations: [SavingsTypePage]
})
export class SavingsTypePageModule {}
