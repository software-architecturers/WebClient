import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import UserModel from './auth/models/user.model';
import { AuthState } from './auth/store/auth.store';

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

  currentUser: UserModel;

  private subs: Subscription[] = [];

  constructor(
    private auth: AuthService,
    private store: Store) {
    this.subs.push(
      this.store.select(AuthState.currentUser).subscribe(cu => {
        this.currentUser = cu;
      }));
  }


  ngOnInit() { }
  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }


  logout() {
    this.logoutModalActive = false;
    this.auth.logout();
  }
}
