import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchFlightsPage } from './search-flights.page';

const routes: Routes = [
  {
    path: '',
    component: SearchFlightsPage
  },  {
    path: 'available-flights',
    loadChildren: () => import('./available-flights/available-flights.module').then( m => m.AvailableFlightsPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchFlightsPageRoutingModule {}
