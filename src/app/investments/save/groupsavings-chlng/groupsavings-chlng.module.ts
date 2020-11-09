import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupsavingsChlngPageRoutingModule } from './groupsavings-chlng-routing.module';

import { GroupsavingsChlngPage } from './groupsavings-chlng.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupsavingsChlngPageRoutingModule
  ],
  declarations: [GroupsavingsChlngPage]
})
export class GroupsavingsChlngPageModule {}
