import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage
  },
  {
    path: 'bvn',
    loadChildren: () => import('./bvn/bvn.module').then( m => m.BvnPageModule)
  },
  {
    path: 'update-profile',
    loadChildren: () => import('./update-profile/update-profile.module').then( m => m.UpdateProfilePageModule)
  },
  {
    path: 'upload-doc',
    loadChildren: () => import('./upload-doc/upload-doc.module').then( m => m.UploadDocPageModule)
  },
  {
    path: 'passwordpin',
    loadChildren: () => import('./passwordpin/passwordpin.module').then( m => m.PasswordpinPageModule)
  },
  {
    path: 'nextofkin',
    loadChildren: () => import('./nextofkin/nextofkin.module').then( m => m.NextofkinPageModule)
  },
  {
    path: 'security-questions',
    loadChildren: () => import('../../auth/security-questions/security-questions.module').then( m => m.SecurityQuestionsPageModule)
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
