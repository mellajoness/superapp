import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupHistoryPage } from './group-history.page';

const routes: Routes = [
  {
    path: '',
    component: GroupHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupHistoryPageRoutingModule {}
