import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GoalHistoryPageRoutingModule } from './goal-history-routing.module';

import { GoalHistoryPage } from './goal-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GoalHistoryPageRoutingModule
  ],
  declarations: [GoalHistoryPage]
})
export class GoalHistoryPageModule {}
