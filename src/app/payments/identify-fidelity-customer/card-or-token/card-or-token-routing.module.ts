import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardOrTokenPage } from './card-or-token.page';

const routes: Routes = [
  {
    path: '',
    component: CardOrTokenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardOrTokenPageRoutingModule {}
