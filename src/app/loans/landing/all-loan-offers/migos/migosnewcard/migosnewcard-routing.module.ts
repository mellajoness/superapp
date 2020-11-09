import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MigosnewcardPage } from './migosnewcard.page';

const routes: Routes = [
  {
    path: '',
    component: MigosnewcardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MigosnewcardPageRoutingModule {}
