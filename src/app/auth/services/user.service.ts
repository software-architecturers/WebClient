import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import ExternalProviderModel from '../models/external-provider.model';
import LoginModel from '../models/login.model';
import RegisterModel from '../models/register.model';
import Token from '../models/token';


const AUTH_URL = environment.authUrl + '/api';
const HOST_URL = environment.hostUrl;
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getExternalProviders(): Observable<ExternalProviderModel[]> {
    return this.http
      .get<ExternalProviderModel[]>(AUTH_URL + '/user/getExternalProviders');
  }

  register(registerModel: RegisterModel) {
    return this.http
      .post(HOST_URL + '/auth/register', registerModel);
  }

  login(loginModel: LoginModel): Observable<Token> {
    return this.http
      .post<Token>(HOST_URL + '/auth/login', loginModel);
  }

  refreshToken(token: Token): Observable<Token> {
    return this.http.post<Token>(HOST_URL + '/auth/token', token);
  }
}
