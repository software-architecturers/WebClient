import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  static TEST_EMAIL = 't@1';
  static TEST_PASSWORD = '123';

  private subject = new BehaviorSubject<boolean>(!!localStorage.getItem('token'));

  constructor() { }


  login(email: string, password: string) {
    if (email === AuthService.TEST_EMAIL
      && password === AuthService.TEST_PASSWORD) {
      localStorage.setItem('token', 'TOKEN');
      this.subject.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.subject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.subject.asObservable();
  }
}
