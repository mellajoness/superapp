import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherbanksPageRoutingModule } from './otherbanks-routing.module';

import { OtherbanksPage } from './otherbanks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OtherbanksPageRoutingModule
  ],
  declarations: [OtherbanksPage]
})
export class OtherbanksPageModule {}
