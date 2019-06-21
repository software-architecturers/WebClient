import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor');
    const authHeader = this.authService.getAuthorizationHeaderValue();
    if (req.url.startsWith(environment.hostUrl) && !req.url.startsWith(`${environment.hostUrl}/auth`) && authHeader) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: authHeader
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
