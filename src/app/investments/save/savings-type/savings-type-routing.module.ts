import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavingsTypePage } from './savings-type.page';

const routes: Routes = [
  {
    path: '',
    component: SavingsTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavingsTypePageRoutingModule {}
