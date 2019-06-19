import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';
import { ActivatedRoute } from '@angular/router';
import Token from '../models/token';
import { Login } from '../store/auth.actions';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {

  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const token = this.activatedRoute.snapshot.paramMap.get('token');
    this.store.dispatch(new Login(token)).subscribe(() =>
      this.store.dispatch(new Navigate([''])));
  }
}
