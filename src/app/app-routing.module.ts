import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent  } from './events/events-page.component';
import { HomePageComponent } from './home/home-page.component';

const routes: Routes = [
  {
    path: 'events',
    component: EventsPageComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
