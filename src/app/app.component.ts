import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location} from '@angular/common';
import { AuthService } from './auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Select, Store } from '@ngxs/store';
import { Subscription, from } from 'rxjs';
import { UserModel } from './auth/models/user.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  navbarBurgerActive = false;

  extraMobileVisible = false;

  logoutModalActive = false;

  isLoggedIn$ = this.auth.isLoggedIn();

  authServerUrl = environment.oidcClientConfig.authority;
  currentUser: UserModel;

  private subs: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private store: Store) {
    this.subs.push(
      this.store.select(store => store.auth.currentUser).subscribe(cu => {
      this.currentUser = cu;
    }));
  }


  ngOnInit() { }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  login() {
    this.auth.startAuthentication();
  }

  logout() {
    this.logoutModalActive = false;
    this.auth.logout();
  }
}
