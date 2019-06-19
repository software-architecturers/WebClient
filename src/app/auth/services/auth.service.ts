import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { UserManager } from 'oidc-client';
import { interval, Observable } from 'rxjs';
import { exhaustMap, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import LoginModel from '../models/login.model';
import { Login, Logout } from '../store/auth.actions';
import { AuthState } from '../store/auth.store';
import { UserService } from './user.service';
import { JwtHelperService } from '@auth0/angular-jwt';
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


  constructor(private store: Store,
    private userService: UserService,
    private jwt: JwtHelperService) {
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
    return this.store.select(AuthState.token).pipe(
      map(token => !!token)
    );
  }

  getAuthorizationHeaderValue(): string | null {
    const token = this.store.selectSnapshot(AuthState.token);
    if (!token) { return null; }
    return `Bearer ${this.store.selectSnapshot(AuthState.token)}`;
  }
}
