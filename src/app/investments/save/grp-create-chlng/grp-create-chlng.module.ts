import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrpCreateChlngPageRoutingModule } from './grp-create-chlng-routing.module';

import { GrpCreateChlngPage } from './grp-create-chlng.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GrpCreateChlngPageRoutingModule
  ],
  declarations: [GrpCreateChlngPage]
})
export class GrpCreateChlngPageModule {}
