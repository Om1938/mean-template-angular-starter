import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const user = this.authService.user.value;
    const isLoggedIn = user && user.token;
    const isApiUrl = request.url.startsWith(environment.apiURL);
    if (isApiUrl) {
      if (isLoggedIn) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${user?.token}` },
        });
      } else {
        if(user?.isTokenExpired())
        this.authService.logout();
      }
    }
    return next.handle(request);
  }
}
