import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Store } from '@ngxs/store';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb: FormBuilder, private auth: AuthService, private store: Store) { }


  get isDev() {
    return !environment.production;
  }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    // TODO: proper password regex
    password: ['', [Validators.required]],
  }
  );

  ngOnInit() {
  }

  onSubmit() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.auth.login(email, password);
    this.store.dispatch(new Navigate(['/home']));
  }

  fakeLogin() {
    this.auth.login(AuthService.TEST_EMAIL, AuthService.TEST_PASSWORD);
    this.store.dispatch(new Navigate(['/home']));
  }
}
