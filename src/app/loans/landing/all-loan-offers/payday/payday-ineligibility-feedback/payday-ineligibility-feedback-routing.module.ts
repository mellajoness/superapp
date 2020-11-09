import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaydayIneligibilityFeedbackPage } from './payday-ineligibility-feedback.page';

const routes: Routes = [
  {
    path: '',
    component: PaydayIneligibilityFeedbackPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaydayIneligibilityFeedbackPageRoutingModule {}
