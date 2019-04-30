import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import RegisterModel from '../models/register.model';

const HOST_URL = environment.oidcClientConfig.authority + '/api';
@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }


  register(registerModel: RegisterModel) {
    return this.http.post<RegisterModel>(`${HOST_URL}/user/register`, registerModel, {
      observe: 'response'
    });
  }
}
