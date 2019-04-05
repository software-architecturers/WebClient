import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  const testStorage = {};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      return testStorage[key] || null;
    });
    spyOn(localStorage, 'removeItem').and.callFake((key: string) => {
      delete testStorage[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      return testStorage[key] = value.toString();
    });
  });

  it('should log the mock user in', (done: DoneFn) => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
    service.login(AuthService.TEST_EMAIL, AuthService.TEST_PASSWORD);
    service.isLoggedIn().subscribe(v => {
      expect(v).toBeTruthy();
      done();
    });
  });

  it('should log the user out', (done: DoneFn) => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
    let callCount = 0;
    service.login(AuthService.TEST_EMAIL, AuthService.TEST_PASSWORD);
    service.logout();
    service.isLoggedIn().subscribe(v => {
      callCount++;
      if (callCount === 1) {
        expect(v).toBe(true);
      } else if (callCount === 2) {
        expect(v).toBe(false);
        done();
      }

    });
  });
});
