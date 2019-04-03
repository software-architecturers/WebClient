import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsPageComponent } from './events/events-page.component';
import { HomePageComponent } from './home/home-page.component';
import { DeclarativePreloadingStrategyService } from './selective-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: './events/events.module#EventsModule',
    data: {
      preload: true
    }
  },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: DeclarativePreloadingStrategyService
  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
