import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import jwt_decode from 'jwt-decode';

import { Router } from '@angular/router';
import { LoggedInUser, User } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  AuthURL = environment.apiURL + 'auth';
  constructor(private _http: HttpClient, private router: Router) {}

  user = new BehaviorSubject<LoggedInUser | null>(null);
  private expirySub: any;
  refreshSub: any;

  register(user: User) {
    return this._http.post(`${this.AuthURL}/register`, user);
  }

  RefreshToken() {
    return this._http
      .post(`${this.AuthURL}/refresh-token`, {}, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          let decoded = jwt_decode<{ exp: number; iss: string; iat: number }>(
            res.jwtToken
          );
          let expiry = new Date(decoded.exp * 1000);
          let expiresIn = expiry.getTime() - new Date().getTime();
          this.startRefreshTokenTimer(expiresIn);
        })
      );
  }

  login(user: User) {
    return this._http
      .post(`${this.AuthURL}/login`, user, { withCredentials: true })
      .pipe(
        tap((res: any) => {
          this.Authenticate(res.jwtToken, res.username, res._id);
        })
      );
  }
  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData || !userData._token) {
      this.logout();
      return of(1);
    }

    this.user.next(
      new LoggedInUser(
        'Temp - User',
        'Temp - ID',
        userData._token,
        new Date(userData._tokenExpirationDate)
      )
    );

    return this._http.get(`${this.AuthURL}/tokenProfile`).pipe(
      tap((res: any) => {
        this.Authenticate(res.jwtToken, res.username, res._id);
      })
    );
  }

  Authenticate(token: string, username: string, _id: string) {
    let decoded = jwt_decode<{ exp: number; iss: string; iat: number }>(token);
    let expiry = new Date(decoded.exp * 1000);
    let expiresIn = expiry.getTime() - new Date().getTime();
    let user = new LoggedInUser(username, _id, token, expiry);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);

    this.startRefreshTokenTimer(expiresIn);
  }

  startRefreshTokenTimer(expiresIn: number) {
    //refreshTimer to get new token 1 min (60 * 1000 miliseconds) before expiry
    let refreshTimer = expiresIn - 110 * 1000;
    this.refreshSub = setTimeout(() => {
      this.RefreshToken().subscribe(console.log);
    }, refreshTimer);
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth/login']);
    localStorage.removeItem('userData');
    if (this.expirySub) {
      clearTimeout(this.expirySub);
    }
    this.expirySub = null;
  }
}
