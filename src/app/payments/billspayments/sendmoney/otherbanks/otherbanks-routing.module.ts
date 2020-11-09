import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherbanksPage } from './otherbanks.page';

const routes: Routes = [
  {
    path: '',
    component: OtherbanksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherbanksPageRoutingModule {}
