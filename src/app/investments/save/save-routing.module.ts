import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavePage } from './save.page';

const routes: Routes = [
  {
    path: '',
    component: SavePage
  },
  { path: 'plan-detail', loadChildren: () => import('./plan-detail/plan-detail.module').then( m => m.PlanDetailPageModule) },
  { path: 'custom-goal', loadChildren: () => import('./custom-goal/custom-goal.module').then( m => m.CustomGoalPageModule)},
  { path: 'savings-type', loadChildren: () => import('./savings-type/savings-type.module').then( m => m.SavingsTypePageModule)},
  { path: 'preset-goal', loadChildren: () => import('./preset-goal/preset-goal.module').then( m => m.PresetGoalPageModule)},  {
    path: 'goal-history',
    loadChildren: () => import('./goal-history/goal-history.module').then( m => m.GoalHistoryPageModule)
  },
  {
    path: 'group-type',
    loadChildren: () => import('./group-type/group-type.module').then( m => m.GroupTypePageModule)
  },
  {
    path: 'groupsavings-chlng',
    loadChildren: () => import('./groupsavings-chlng/groupsavings-chlng.module').then( m => m.GroupsavingsChlngPageModule)
  },
  {
    path: 'grp-create-chlng',
    loadChildren: () => import('./grp-create-chlng/grp-create-chlng.module').then( m => m.GrpCreateChlngPageModule)
  },
  {
    path: 'grp-join-chlng',
    loadChildren: () => import('./grp-join-chlng/grp-join-chlng.module').then( m => m.GrpJoinChlngPageModule)
  },
  {
    path: 'group-detail',
    loadChildren: () => import('./group-detail/group-detail.module').then( m => m.GroupDetailPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavePageRoutingModule {}
