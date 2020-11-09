import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupTypePage } from './group-type.page';

const routes: Routes = [
  {
    path: '',
    component: GroupTypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupTypePageRoutingModule {}
