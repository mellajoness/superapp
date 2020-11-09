import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoantopupPageRoutingModule } from './loantopup-routing.module';
import {LoantopupmodalComponent} from '../../loans/modals/loantopupmodal/loantopupmodal.component'
import { LoantopupPage } from './loantopup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoantopupPageRoutingModule
  ],
  declarations: [LoantopupPage,LoantopupmodalComponent],
  entryComponents: [LoantopupmodalComponent]
})
export class LoantopupPageModule {}
