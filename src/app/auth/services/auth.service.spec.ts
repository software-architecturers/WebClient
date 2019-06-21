import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxsModule, Store } from '@ngxs/store';
import { AuthState, AuthStateModel } from '../store/auth.store';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Logout } from '../store/auth.actions';

describe('AuthService', () => {
  let service: AuthService;
  let store: Store;
  beforeEach(() => {
    const userService = jasmine.createSpyObj<UserService>('UserService', ['login']);
    const jwtHelper = jasmine.createSpyObj<JwtHelperService>('JwtHelperService', ['isTokenExpired', 'decodeToken']);
    jwtHelper.decodeToken.and.callFake(v => v);
    jwtHelper.isTokenExpired.and.returnValue(false);
    userService.login.and.returnValue(of({
      token: {
        sub: '1',
        name: 'John'
      }
    }));
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([AuthState], { developmentMode: true })
      ],
      providers: [
        AuthService,
        { provide: JwtHelperService, useValue: jwtHelper },
        { provide: UserService, useValue: userService }
      ]
    });
    store = TestBed.get(Store);
    service = TestBed.get(AuthService);
  });

  it('should log the mock user in', (done: DoneFn) => {
    service.login({ login: 'test', password: '123' }).pipe(
      switchMap(() => service.isLoggedIn())
    ).subscribe(v => {
      expect(v).toBeTruthy();
      done();
    });
  });

  it('should log the mock user in event without subscribe', (done: DoneFn) => {
    service.login({ login: 'test', password: '123' });
    service.isLoggedIn().subscribe(v => {
      expect(v).toBeTruthy();
      done();
    });
  });


  it('should log the user out', (done: DoneFn) => {
    const authState: AuthStateModel = {
      currentUser: undefined,
      token: 'not empty'
    };
    store.reset(authState);
    service.logout();
    service.isLoggedIn().subscribe(v => {
      expect(v).toBeFalsy();
      done();
    });
  });
});
