import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardOrTokenPageRoutingModule } from './card-or-token-routing.module';

import { CardOrTokenPage } from './card-or-token.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardOrTokenPageRoutingModule,
  ],
  declarations: [CardOrTokenPage],
  exports: [CardOrTokenPage]
})
export class CardOrTokenPageModule {}
