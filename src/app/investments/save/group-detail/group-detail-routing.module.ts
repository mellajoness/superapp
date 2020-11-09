import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GroupDetailPage } from './group-detail.page';

const routes: Routes = [
  {
    path: '',
    component: GroupDetailPage
  },
  {
    path: 'leaderboard',
    loadChildren: () => import('./leaderboard/leaderboard.module').then( m => m.LeaderboardPageModule)
  },
  {
    path: 'group-history',
    loadChildren: () => import('./group-history/group-history.module').then( m => m.GroupHistoryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupDetailPageRoutingModule {}
