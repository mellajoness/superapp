import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WalletcreationPageRoutingModule } from './walletcreation-routing.module';

import { WalletcreationPage } from './walletcreation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WalletcreationPageRoutingModule
  ],
  declarations: [WalletcreationPage]
})
export class WalletcreationPageModule {}
