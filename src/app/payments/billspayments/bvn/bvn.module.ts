import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BvnPageRoutingModule } from './bvn-routing.module';

import { BvnPage } from './bvn.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BvnPageRoutingModule
  ],
  declarations: [BvnPage]
})
export class BvnPageModule {}
