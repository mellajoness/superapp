import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PresetGoalPageRoutingModule } from './preset-goal-routing.module';

import { PresetGoalPage } from './preset-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PresetGoalPageRoutingModule
  ],
  declarations: [PresetGoalPage]
})
export class PresetGoalPageModule {}
