import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/route-guard/auth.guard';
import { HomeGuard } from './services/route-guard/home.guard';

const routes: Routes = [
  // { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '', redirectTo: 'loans', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate: [HomeGuard]},
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)},
  {
    path: 'loans',
    loadChildren: () => import('./loans/loans.module').then( m => m.LoansPageModule)
  },
  {
    path: 'payments',
    loadChildren: () => import('./payments/payments.module').then( m => m.PaymentsPageModule)
  },
  {
    path: 'investments',
    loadChildren: () => import('./investments/investments.module').then( m => m.InvestmentsPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./home/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'accountscards',
    loadChildren: () => import('./home/accountscards/accountscards.module').then( m => m.AccountscardsPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./home/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./home/history/history.module').then( m => m.HistoryPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./home/notifications/notifications.module').then( m => m.NotificationsPageModule)
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
