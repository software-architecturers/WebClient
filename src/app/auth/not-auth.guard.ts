import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad, Route, Router} from '@angular/router';
import { AuthService } from './services/auth.service';
import { map, tap, take } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Injectable({
  providedIn: 'root',
})
export class NotAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private auth: AuthService, private store: Store) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLogin(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

  canLoad(route: Route) {
    return this.checkLogin(route.path).pipe(take(1));
  }

  private checkLogin(url: string) {
    return this.auth.isLoggedIn().pipe(
      map(v => {
        return !v;
      }),
      tap(v => {
        if (!v) {
         this.store.dispatch(new Navigate(['/home']));
        }
      })
    );
  }
}
