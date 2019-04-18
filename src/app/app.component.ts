import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location} from '@angular/common';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment';
import { Select, Store } from '@ngxs/store';
import { Subscription, from } from 'rxjs';
import { UserModel } from './auth/user.model';
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
  route: string = location.href;
  currentUser: UserModel;

  private subs: Subscription[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store) {
    this.subs.push(
      this.store.select(store => store.auth.currentUser).subscribe(cu => {
      this.currentUser = cu;
    }),
    router.events.pipe(
      filter((e): e is NavigationEnd => e instanceof NavigationEnd)
      ).subscribe(e => {
        this.route = location.href;
    })
    );
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
