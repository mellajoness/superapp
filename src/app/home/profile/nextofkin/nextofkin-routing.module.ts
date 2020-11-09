import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NextofkinPage } from './nextofkin.page';

const routes: Routes = [
  {
    path: '',
    component: NextofkinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NextofkinPageRoutingModule {}
