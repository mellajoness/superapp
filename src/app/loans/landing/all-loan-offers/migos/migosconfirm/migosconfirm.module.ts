import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MigosconfirmPageRoutingModule } from './migosconfirm-routing.module';

import { MigosconfirmPage } from './migosconfirm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MigosconfirmPageRoutingModule
  ],
  declarations: [MigosconfirmPage]
})
export class MigosconfirmPageModule {}
