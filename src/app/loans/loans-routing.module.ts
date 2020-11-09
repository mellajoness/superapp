import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoansPage } from './loans.page';

const routes: Routes = [
  {
    path: '',
    component: LoansPage,
    children: [
      {
        path: '',
        loadChildren: () => import('./landing/landing.module').then( m => m.LandingPageModule)
      }
    ]
  },
  {
    path: 'all-loan-offers',
    loadChildren: () => import('./landing/all-loan-offers/all-loan-offers.module').then( m => m.AllLoanOffersPageModule)
  },
  {
    path: 'payloan',
    loadChildren: () => import('./payloan/payloan.module').then( m => m.PayloanPageModule)
  },
  {
    path: 'loan-rejection-reason',
    loadChildren: () => import('./shared/loan-rejection-reason/loan-rejection-reason.module').then( m => m.LoanRejectionReasonPageModule)
  },
  {
    path: 'loan-terms-conditions',
    loadChildren: () => import('./shared/loan-terms-conditions/loan-terms-conditions.module').then( m => m.LoanTermsConditionsPageModule)
    
  },
  {
    path: 'loanpaymenttype',
    loadChildren: () => import('./loanpaymenttype/loanpaymenttype.module').then( m => m.LoanpaymenttypePageModule)
  },
  {
    path: 'loanpaymentwithfidelity',
    loadChildren: () => import('./loanpaymentwithfidelity/loanpaymentwithfidelity.module').then( m => m.LoanpaymentwithfidelityPageModule)
  },
  {
    path: 'successorfailure',
    loadChildren: () => import('./successorfailure/successorfailure.module').then( m => m.SuccessorfailurePageModule)
  },
  {
    path: 'personalloanhistory',
    loadChildren: () => import('./personalloanhistory/personalloanhistory.module').then( m => m.PersonalloanhistoryPageModule)
  },
  {
    path: 'loanhistory',
    loadChildren: () => import('./loanhistory/loanhistory.module').then( m => m.LoanhistoryPageModule)
  },
  {
    path: 'loantopup',
    loadChildren: () => import('./loantopup/loantopup.module').then( m => m.LoantopupPageModule)
  },
  {
    path: 'loanofferlistfirst',
    loadChildren: () => import('./loanofferlistfirst/loanofferlistfirst.module').then( m => m.LoanofferlistfirstPageModule)
  },
  {
    path: 'loanofferlistsecond',
    loadChildren: () => import('./loanofferlistsecond/loanofferlistsecond.module').then( m => m.LoanofferlistsecondPageModule)
  },
  {
    path: 'loanofferlistsuccess',
    loadChildren: () => import('./loanofferlistsuccess/loanofferlistsuccess.module').then( m => m.LoanofferlistsuccessPageModule)
  },
  {
    path: 'extendloan',
    loadChildren: () => import('./extendloan/extendloan.module').then( m => m.ExtendloanPageModule)
  },
  {
    path: 'extendloandetails',
    loadChildren: () => import('./extendloandetails/extendloandetails.module').then( m => m.ExtendloandetailsPageModule)
  },
  {
    path: 'extendloansuccess',
    loadChildren: () => import('./extendloansuccess/extendloansuccess.module').then( m => m.ExtendloansuccessPageModule)
  },
  {
    path: 'extendloanchangemind',
    loadChildren: () => import('./extendloanchangemind/extendloanchangemind.module').then( m => m.ExtendloanchangemindPageModule)
  },
  {
    path: 'extendloanchangeminddetails',
    loadChildren: () => import('./extendloanchangeminddetails/extendloanchangeminddetails.module').then( m => m.ExtendloanchangeminddetailsPageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'loanbalance',
    loadChildren: () => import('./landing/loanbalance/loanbalance.module').then( m => m.LoanbalancePageModule)
  },
  {
    path: 'disclaimer',
    loadChildren: () => import('./disclaimer/disclaimer.module').then( m => m.DisclaimerPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'checkbalance',
    loadChildren: () => import('./landing/checkbalance/checkbalance.module').then( m => m.CheckbalancePageModule)
  },
  {
    path: 'loanhistorydetails',
    loadChildren: () => import('./loanhistorydetails/loanhistorydetails.module').then( m => m.LoanhistorydetailsPageModule)
  },
  {
    path: 'payday-disbursement-status-payday',
    loadChildren: () => import('./landing/all-loan-offers/payday/payday-disbursement-status-payday/payday-disbursement-status-payday.module').then( m => m.PaydayDisbursementStatusPaydayPageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
  },  {
    path: 'laptop-loan',
    loadChildren: () => import('./laptop-loan/laptop-loan.module').then( m => m.LaptopLoanPageModule)
  },
  {
    path: 'laptop-confirm-application',
    loadChildren: () => import('./laptop-confirm-application/laptop-confirm-application.module').then( m => m.LaptopConfirmApplicationPageModule)
  },

 




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoansPageRoutingModule {}
