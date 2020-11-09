import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountscardsPage } from './accountscards.page';

const routes: Routes = [
  {
    path: '',
    component: AccountscardsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountscardsPageRoutingModule {}
