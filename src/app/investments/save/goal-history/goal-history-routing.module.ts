import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GoalHistoryPage } from './goal-history.page';

const routes: Routes = [
  {
    path: '',
    component: GoalHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GoalHistoryPageRoutingModule {}
