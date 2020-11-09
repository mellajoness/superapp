import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PinPageRoutingModule } from './pin-routing.module';

import { PinPage } from './pin.page';
import { NgOtpInputModule } from 'ng-otp-input';
import { Encryption } from 'src/app/services/encryption/encryption';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinPageRoutingModule,
    NgOtpInputModule
  ],
  declarations: [PinPage],
  providers: [Encryption]
})
export class PinPageModule {}
