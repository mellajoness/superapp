import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BettingPage } from './betting.page';

const routes: Routes = [
  {
    path: '',
    component: BettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BettingPageRoutingModule {}
