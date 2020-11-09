import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MigosnewcardPageRoutingModule } from './migosnewcard-routing.module';

import { MigosnewcardPage } from './migosnewcard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MigosnewcardPageRoutingModule
  ],
  declarations: [MigosnewcardPage]
})
export class MigosnewcardPageModule {}
