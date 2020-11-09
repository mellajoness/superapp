import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PresetGoalPage } from './preset-goal.page';

const routes: Routes = [
  {
    path: '',
    component: PresetGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PresetGoalPageRoutingModule {}
