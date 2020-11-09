import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneraterefPage } from './generateref.page';

const routes: Routes = [
  {
    path: '',
    component: GeneraterefPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneraterefPageRoutingModule {}
