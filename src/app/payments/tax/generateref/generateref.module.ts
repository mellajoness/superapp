import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneraterefPageRoutingModule } from './generateref-routing.module';

import { GeneraterefPage } from './generateref.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GeneraterefPageRoutingModule
  ],
  declarations: [GeneraterefPage]
})
export class GeneraterefPageModule {}
