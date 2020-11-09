import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanofferlistsecondPageRoutingModule } from './loanofferlistsecond-routing.module';

import { LoanofferlistsecondPage } from './loanofferlistsecond.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanofferlistsecondPageRoutingModule
  ],
  declarations: [LoanofferlistsecondPage]
})
export class LoanofferlistsecondPageModule {}
