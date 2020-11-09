import { Encryption } from './../../services/encryption/encryption';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ValidatePage } from './validate.page';

const routes: Routes = [
  {
    path: '',
    component: ValidatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [Encryption]
})
export class ValidatePageRoutingModule {}
