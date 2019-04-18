import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserManager, User } from 'oidc-client';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { SetUser, RemoveUser } from './store/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subject = new BehaviorSubject<boolean>(false);
  private manager = new UserManager(environment.oidcClientConfig);

  private user: User = null;


  constructor(private store: Store) {
    const onLoad = (user: User) => {
      this.user = user;
      store.dispatch(new SetUser(user.profile));
      this.subject.next(true);
    };
    const onUnload = () => {
      this.user = null;
      this.subject.next(false);
      this.store.dispatch(new RemoveUser());
    };
    this.manager.events.addUserLoaded(onLoad);
    this.manager.events.addUserUnloaded(onUnload);
    this.manager.events.addUserSignedOut(onUnload);
    this.initializeUser();
  }

  initializeUser() {
    this.manager.getUser().then(user => {
      if (user && !user.expired) {
        this.user = user;
        this.store.dispatch(new SetUser(user.profile));
        this.subject.next(true);
      }
    });
  }


  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
    });
  }

  logout() {
    this.manager.signoutRedirect();
  }


  isLoggedIn(): Observable<boolean> {
    return this.subject.asObservable();
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }
}
