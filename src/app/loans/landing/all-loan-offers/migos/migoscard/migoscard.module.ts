import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MigoscardPageRoutingModule } from './migoscard-routing.module';

import { MigoscardPage } from './migoscard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MigoscardPageRoutingModule
  ],
  declarations: [MigoscardPage]
})
export class MigoscardPageModule {}
