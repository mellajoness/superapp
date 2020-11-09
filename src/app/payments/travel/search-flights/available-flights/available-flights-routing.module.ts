import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvailableFlightsPage } from './available-flights.page';

const routes: Routes = [
  {
    path: '',
    component: AvailableFlightsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvailableFlightsPageRoutingModule {}
