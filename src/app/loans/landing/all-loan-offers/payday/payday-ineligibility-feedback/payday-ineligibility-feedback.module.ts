import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaydayIneligibilityFeedbackPageRoutingModule } from './payday-ineligibility-feedback-routing.module';

import { PaydayIneligibilityFeedbackPage } from './payday-ineligibility-feedback.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaydayIneligibilityFeedbackPageRoutingModule
  ],
  declarations: [PaydayIneligibilityFeedbackPage]
})
export class PaydayIneligibilityFeedbackPageModule {}
