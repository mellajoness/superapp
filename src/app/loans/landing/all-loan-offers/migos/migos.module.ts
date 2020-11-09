import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MigosPageRoutingModule } from './migos-routing.module';

import { MigosPage } from './migos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MigosPageRoutingModule
  ],
  declarations: [MigosPage]
})
export class MigosPageModule {}
