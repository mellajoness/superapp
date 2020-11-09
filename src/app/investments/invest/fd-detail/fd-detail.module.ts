import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FdDetailPageRoutingModule } from './fd-detail-routing.module';

import { FdDetailPage } from './fd-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FdDetailPageRoutingModule
  ],
  declarations: [FdDetailPage]
})
export class FdDetailPageModule {}
