import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoanhistorydetailsPageRoutingModule } from './loanhistorydetails-routing.module';

import { LoanhistorydetailsPage } from './loanhistorydetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoanhistorydetailsPageRoutingModule
  ],
  declarations: [LoanhistorydetailsPage]
})
export class LoanhistorydetailsPageModule {}
