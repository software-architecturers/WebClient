import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home/home-page.component';
import { DeclarativePreloadingStrategyService } from './declarative-preloading-strategy.service';
import { NotAuthGuard } from './auth/not-auth.guard';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: './events/events.module#EventsModule',
    data: {
      preload: true
    }
  },
  { path: 'home', component: HomePageComponent },
  { path: 'u/:id', component: UserComponent },
  {
    path: 'login',
    loadChildren: './auth/login/login.module#LoginModule',
    canLoad: [NotAuthGuard]
  },
  {
    path: 'register',
    loadChildren: './auth/register/register.module#RegisterModule',
    canLoad: [NotAuthGuard]
  },
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
