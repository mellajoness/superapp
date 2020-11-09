import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountscardsPageRoutingModule } from './accountscards-routing.module';

import { AccountscardsPage } from './accountscards.page';
import { AccountsPipe } from 'src/app/pipes/accounts/accounts.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountscardsPageRoutingModule,
  ],
  declarations: [AccountscardsPage, AccountsPipe]
})
export class AccountscardsPageModule {}
