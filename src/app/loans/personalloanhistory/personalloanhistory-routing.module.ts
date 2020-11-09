import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PersonalloanhistoryPage } from './personalloanhistory.page';

const routes: Routes = [
  {
    path: '',
    component: PersonalloanhistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonalloanhistoryPageRoutingModule {}
