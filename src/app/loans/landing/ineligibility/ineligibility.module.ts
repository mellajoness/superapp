import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IneligibilityPageRoutingModule } from './ineligibility-routing.module';

import { IneligibilityPage } from './ineligibility.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IneligibilityPageRoutingModule
  ],
  declarations: [IneligibilityPage]
})
export class IneligibilityPageModule {}
