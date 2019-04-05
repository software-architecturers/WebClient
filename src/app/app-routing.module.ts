import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home/home-page.component';
import { DeclarativePreloadingStrategyService } from './declarative-preloading-strategy.service';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: './events/events.module#EventsModule',
    data: {
      preload: true
    }
  },
  { path: 'home', component: HomePageComponent },
  { path: 'login', loadChildren: './auth/login/login.module#LoginModule'},
  { path: 'register', loadChildren: './auth/register/register.module#RegisterModule'},
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
