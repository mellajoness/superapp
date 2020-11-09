import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanofferlistfirstPageRoutingModule } from './loanofferlistfirst-routing.module';

import { LoanofferlistfirstPage } from './loanofferlistfirst.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanofferlistfirstPageRoutingModule
  ],
  declarations: [LoanofferlistfirstPage]
})
export class LoanofferlistfirstPageModule {}
