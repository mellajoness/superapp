import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanofferlistsuccessPageRoutingModule } from './loanofferlistsuccess-routing.module';

import { LoanofferlistsuccessPage } from './loanofferlistsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanofferlistsuccessPageRoutingModule
  ],
  declarations: [LoanofferlistsuccessPage]
})
export class LoanofferlistsuccessPageModule {}
