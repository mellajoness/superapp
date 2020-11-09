import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExchangeratePage } from './exchangerate.page';

const routes: Routes = [
  {
    path: '',
    component: ExchangeratePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExchangeratePageRoutingModule {}
