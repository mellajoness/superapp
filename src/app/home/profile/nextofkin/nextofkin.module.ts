import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NextofkinPageRoutingModule } from './nextofkin-routing.module';

import { NextofkinPage } from './nextofkin.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NextofkinPageRoutingModule
  ],
  declarations: [NextofkinPage]
})
export class NextofkinPageModule {}
