import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  navbarBurgerActive = false;

  extraMobileVisible = false;

  logoutModalActive = false;

  isLoggedIn$ = this.auth.isLoggedIn();

  constructor(public auth: AuthService) { }


  logout() {
    this.logoutModalActive = false;
    this.auth.logout();
  }
}
