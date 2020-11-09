import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MigoschangemindPageRoutingModule } from './migoschangemind-routing.module';

import { MigoschangemindPage } from './migoschangemind.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MigoschangemindPageRoutingModule
  ],
  declarations: [MigoschangemindPage]
})
export class MigoschangemindPageModule {}
