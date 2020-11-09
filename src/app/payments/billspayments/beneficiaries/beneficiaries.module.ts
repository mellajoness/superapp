import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiariesPageRoutingModule } from './beneficiaries-routing.module';

import { BeneficiariesPage } from './beneficiaries.page';
import { IconModule } from 'src/app/pipes/icon/icon.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiariesPageRoutingModule,
    IconModule,
  ],
  declarations: [BeneficiariesPage]
})
export class BeneficiariesPageModule {}
