import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomGoalPage } from './custom-goal.page';

const routes: Routes = [
  {
    path: '',
    component: CustomGoalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomGoalPageRoutingModule {}
