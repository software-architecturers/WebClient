import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import ExternalProviderModel from '../models/external-provider.model';
import LoginModel from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  externalProviders$: Observable<ExternalProviderModel[]>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private location: Location
  ) {
    this.externalProviders$ = userService.getExternalProviders()
      .pipe(map(v => v.length === 0 ? null : v));
  }


  get isDev() {
    return !environment.production;
  }
  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    // TODO: proper password regex
    password: ['', [Validators.required]],
  }
  );

  ngOnInit() { }

  onSubmit() {
    const value: LoginModel = {
      login: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(value);
  }

  getProviderUrl(provider: ExternalProviderModel) {
    const url = `${environment.authUrl}/external/challengeCore?` +
      `provider=${provider.name}&` +
      `clientId=spa&` +
      `returnUrl=${this.location.path.name}${encodeURI('/Fauth-callback')}`;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
