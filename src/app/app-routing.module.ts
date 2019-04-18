import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home/home-page.component';
import { DeclarativePreloadingStrategyService } from './declarative-preloading-strategy.service';
import { NotAuthGuard } from './auth/not-auth.guard';
import { UserComponent } from './user/user.component';
import { AuthCallbackComponent } from './auth/auth-callback/auth-callback.component';

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
  { path: 'auth-callback', component: AuthCallbackComponent },
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
