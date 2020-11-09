import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PersonalloanhistoryPageRoutingModule } from './personalloanhistory-routing.module';

import { PersonalloanhistoryPage } from './personalloanhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PersonalloanhistoryPageRoutingModule
  ],
  declarations: [PersonalloanhistoryPage]
})
export class PersonalloanhistoryPageModule {}
