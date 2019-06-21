import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { UserManager } from 'oidc-client';
import { ConnectableObservable, interval, Observable, of } from 'rxjs';
import { catchError, exhaustMap, map, publishReplay, refCount, repeatWhen, retryWhen, switchMap, takeWhile } from 'rxjs/operators';
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

  @Select(AuthState.token)
  token$: Observable<string>;

  constructor(
    private store: Store,
    private userService: UserService,
    private jwt: JwtHelperService
  ) {
    interval(60_000).pipe(
      switchMap(() => this.token$),
      takeWhile(t => !!t),
      retryWhen(() => this.token$),
      exhaustMap(t =>
        this.userService.refreshToken({ token: t }).pipe(
          catchError(() => of(null))
        )
      )
    ).subscribe(v => {
      if (v) {
        this.store.dispatch(new Login(v.token));
      }
    });
  }


  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  logout() {
    return this.store.dispatch(new Logout());
  }

  login(loginModel: LoginModel) {
    const obs$ = this.userService.login(loginModel).pipe(
      switchMap(({ token: t }) => this.store.dispatch(new Login(t))),
      publishReplay(),
    );
    (obs$ as ConnectableObservable<any>).connect();
    return obs$.pipe(refCount());
  }


  isLoggedIn(): Observable<boolean> {
    return this.token$.pipe(
      map(t => t && !this.jwt.isTokenExpired(t))
    );
  }

  getAuthorizationHeaderValue(): string | null {
    const tokenValue = this.store.selectSnapshot(AuthState.token);
    return tokenValue ? `Bearer ${tokenValue}` : null;
  }
}
