import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';

import { IonicModule } from '@ionic/angular';

import { UploadDocPage } from './upload-doc.page';

const routes: Routes = [
  {
    path: '',
    component: UploadDocPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileUploadModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UploadDocPage]
})
export class UploadDocPageModule {}
