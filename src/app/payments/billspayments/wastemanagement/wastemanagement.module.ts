import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WastemanagementPageRoutingModule } from './wastemanagement-routing.module';

import { WastemanagementPage } from './wastemanagement.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WastemanagementPageRoutingModule
  ],
  declarations: [WastemanagementPage]
})
export class WastemanagementPageModule {}
