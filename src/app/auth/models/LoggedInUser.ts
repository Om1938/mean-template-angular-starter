import { throwError } from 'rxjs';

export class LoggedInUser {
  constructor(
    public username: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token() {
    if (this.isTokenExpired()) {
      return null;
    }
    return this._token;
  }

  isTokenExpired() {
    return !this._tokenExpirationDate || new Date() > this._tokenExpirationDate;
  }
}
