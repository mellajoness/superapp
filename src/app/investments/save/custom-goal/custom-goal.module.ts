import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomGoalPageRoutingModule } from './custom-goal-routing.module';

import { CustomGoalPage } from './custom-goal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    CustomGoalPageRoutingModule
  ],
  declarations: [CustomGoalPage]
})
export class CustomGoalPageModule {}
