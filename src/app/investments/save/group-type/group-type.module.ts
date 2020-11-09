import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupTypePageRoutingModule } from './group-type-routing.module';

import { GroupTypePage } from './group-type.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupTypePageRoutingModule
  ],
  declarations: [GroupTypePage]
})
export class GroupTypePageModule {}
