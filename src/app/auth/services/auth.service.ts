import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import * as jwkDecode from 'jwt-decode';
import { UserManager } from 'oidc-client';
import { interval, Observable } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import LoginModel from '../models/login.model';
import { Login, Logout } from '../store/auth.actions';
import { AuthState } from '../store/auth.store';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private manager = new UserManager({
    authority: environment.authUrl,
    client_id: 'spa',
    redirect_uri: window.location.origin + '/auth-callback',

    response_type: 'id_token token',
    scope: 'openid profile email',

  });


  constructor(private store: Store, private userService: UserService) {
    interval(60_000).pipe(
      switchMap(() => this.store.select(AuthState.token)),
      exhaustMap(token => this.userService.refreshToken({ token }))
    ).subscribe(({ token }) => this.store.dispatch(new Login(token)));
  }


  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  logout() {
    return this.store.dispatch(new Logout());
  }

  login(loginModel: LoginModel) {
    return this.userService.login(loginModel).pipe(
      switchMap(({ token }) => this.store.dispatch(new Login(token)))
    );
  }


  isLoggedIn(): Observable<boolean> {
    return this.store.select(state => state.auth.token).pipe(
      map(token => {
        if (!token) {
          return false;
        }
        const { exp } = jwkDecode(token);
        return Date.now() < exp * 1000;
      })
    );
  }

  getAuthorizationHeaderValue(): string {
    return `Bearer ${this.store.selectSnapshot(AuthState.token)}`;
  }
}
