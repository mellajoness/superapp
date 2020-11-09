import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidaterefPage } from './validateref.page';

const routes: Routes = [
  {
    path: '',
    component: ValidaterefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ValidaterefPageRoutingModule {}
