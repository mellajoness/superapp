import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StandinginstructionPageRoutingModule } from './standinginstruction-routing.module';

import { StandinginstructionPage } from './standinginstruction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StandinginstructionPageRoutingModule
  ],
  declarations: [StandinginstructionPage]
})
export class StandinginstructionPageModule {}
