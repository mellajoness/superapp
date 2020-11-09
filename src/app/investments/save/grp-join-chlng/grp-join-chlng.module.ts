import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GrpJoinChlngPageRoutingModule } from './grp-join-chlng-routing.module';

import { GrpJoinChlngPage } from './grp-join-chlng.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GrpJoinChlngPageRoutingModule
  ],
  declarations: [GrpJoinChlngPage]
})
export class GrpJoinChlngPageModule {}
