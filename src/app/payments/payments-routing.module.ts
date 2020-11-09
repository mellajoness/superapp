import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentsPage } from './payments.page';

const routes: Routes = [
  {
    path: '',
    component: PaymentsPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
      }
    ]
  },
  {
    path: 'travel',
    loadChildren: () => import('./travel/travel.module').then( m => m.TravelPageModule)
  },
  {
    path: 'billspayments',
    loadChildren: () => import('./billspayments/billspayments.module').then( m => m.BillspaymentsPageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then( m => m.PaymentPageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'validate',
    loadChildren: () => import('./validate/validate.module').then( m => m.ValidatePageModule)
  },
  {
    path: 'comingsoon',
    loadChildren: () => import('./comingsoon/comingsoon.module').then( m => m.ComingsoonPageModule)
  },
  {
    path: 'addcard',
    loadChildren: () => import('./addcard/addcard.module').then( m => m.AddcardPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'wallet',
    loadChildren: () => import('./wallet/wallet.module').then( m => m.WalletPageModule)
  },
  {
    path: 'identify-fidelity-customer',
    loadChildren: () => import('./identify-fidelity-customer/identify-fidelity-customer.module').then( m => m.IdentifyFidelityCustomerPageModule)
  },
  {
    path: 'exchangerate',
    loadChildren: () => import('./exchangerate/exchangerate.module').then( m => m.ExchangeratePageModule)
  },
  {
    path: 'atmlocations',
    loadChildren: () => import('./atmlocations/atmlocations.module').then( m => m.AtmlocationsPageModule)
  },
  {
    path: 'tax',
    loadChildren: () => import('./tax/tax.module').then( m => m.TaxPageModule)
  },
  {
    path: '**',
    redirectTo: 'comingsoon',
    pathMatch: 'full'
  }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentsPageRoutingModule {}
