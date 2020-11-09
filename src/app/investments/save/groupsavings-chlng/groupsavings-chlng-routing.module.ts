import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupsavingsChlngPage } from './groupsavings-chlng.page';

const routes: Routes = [
  {
    path: '',
    component: GroupsavingsChlngPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsavingsChlngPageRoutingModule {}
