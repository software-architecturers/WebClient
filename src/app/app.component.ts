import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn$ = this.auth.isLoggedIn();

  constructor(private auth: AuthService) { }


  logout() {
    this.auth.logout();
  }
}
