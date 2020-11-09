import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecurityQuestionsPage } from './security-questions.page';

const routes: Routes = [
  {
    path: '',
    component: SecurityQuestionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecurityQuestionsPageRoutingModule {}
