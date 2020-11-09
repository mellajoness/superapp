import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanTopupPageRoutingModule } from './loan-topup-routing.module';

import { LoanTopupPage } from './loan-topup.page';
//  import { LoantopupmodalComponent } from '../../modals/loantopupmodal/loantopupmodal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanTopupPageRoutingModule
  ],
  declarations: [LoanTopupPage,],
  entryComponents: []
})
export class LoanTopupPageModule {}
