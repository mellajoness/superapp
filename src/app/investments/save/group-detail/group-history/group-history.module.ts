import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GroupHistoryPageRoutingModule } from './group-history-routing.module';

import { GroupHistoryPage } from './group-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GroupHistoryPageRoutingModule
  ],
  declarations: [GroupHistoryPage]
})
export class GroupHistoryPageModule {}
