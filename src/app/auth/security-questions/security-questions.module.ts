import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecurityQuestionsPageRoutingModule } from './security-questions-routing.module';

import { SecurityQuestionsPage } from './security-questions.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecurityQuestionsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [SecurityQuestionsPage]
})
export class SecurityQuestionsPageModule {}
