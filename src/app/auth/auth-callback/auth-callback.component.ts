import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private store: Store) { }

  ngOnInit() {
    this.authService.completeAuthentication().then(() => {
      this.store.dispatch(new Navigate(['']));
    }).catch(e => {
      console.error(e);
      this.store.dispatch(new Navigate(['']));
    });

  }

}
