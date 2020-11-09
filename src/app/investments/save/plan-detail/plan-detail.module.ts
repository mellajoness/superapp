import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanDetailPageRoutingModule } from './plan-detail-routing.module';

import { PlanDetailPage } from './plan-detail.page';
import { LiquidateGoalComponent } from 'src/app/components/liquidate-goal/liquidate-goal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanDetailPageRoutingModule
  ],
  entryComponents: [],
  declarations: [PlanDetailPage],
})
export class PlanDetailPageModule {}
