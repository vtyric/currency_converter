import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, tap } from "rxjs";
import { IAuthToken } from "../interfaces";
import { environment } from "../../../../../environments/environment";
import { Role } from "../enums";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

  private readonly _accessTokenKey: string = 'access_token';
  private readonly _authApiUrl: string = 'api/auth';

  constructor(
    private _http: HttpClient,
    private _jwtHelper: JwtHelperService,
    private _router: Router,
  ) {
  }

  public login(login: string, password: string): Observable<IAuthToken> {
    return this._http.post<IAuthToken>(`${environment.apiUrl}${this._authApiUrl}/login`, {login, password})
      .pipe(
        tap(value => {
          this.setToken(value);
        }),
      );
  }

  public register(login: string, password: string, role: Role): Observable<IAuthToken> {
    return this._http.post<IAuthToken>(`${environment.apiUrl}${this._authApiUrl}/register`, {login, password, role})
      .pipe(
        tap(value => {
          this.setToken(value);
        }),
      );
  }

  public isAuthenticated(): boolean {
    let token = localStorage.getItem(this._accessTokenKey);

    return !!token && !this._jwtHelper.isTokenExpired(token);
  }

  public logout(): void {
    localStorage.removeItem(this._accessTokenKey);
    this._router.navigate(['']);
  }

  private setToken(token: IAuthToken): void {
    localStorage.setItem(this._accessTokenKey, token.access_token);
  }
}
