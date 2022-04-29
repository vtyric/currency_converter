import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable, tap } from "rxjs";
import { IAuthToken, IDecodedToken } from "../interfaces";
import { environment } from "../../../../../environments/environment";
import { Role } from "../enums";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from "@angular/router";
import jwtDecode from "jwt-decode";

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

  /**
   * Метод лоигна пользователя.
   * @param login
   * @param password
   * @return {Observable<IAuthToken>} в токене login, id, role
   */
  public login(login: string, password: string): Observable<IDecodedToken> {
    return this._http.post<IAuthToken>(`${environment.apiUrl}${this._authApiUrl}/login`, {login, password})
      .pipe(
        tap(value => {
          this.setToken(value);
        }),
        map(token => jwtDecode(token.access_token)),
      );
  }

  /**
   * Метод регистрации пользователя.
   * @param login
   * @param password
   * @param role
   * @return {Observable<IAuthToken>} в токене login, id, role
   */
  public register(login: string, password: string, role: Role): Observable<IDecodedToken> {
    return this._http.post<IAuthToken>(`${environment.apiUrl}${this._authApiUrl}/register`, {login, password, role})
      .pipe(
        tap(value => {
          this.setToken(value);
        }),
        map(token => jwtDecode(token.access_token)),
      );
  }

  /**
   * Проверяет аутентифицирован ли пользователь.
   * @return{boolean}
   */
  public isAuthenticated(): boolean {
    let token = localStorage.getItem(this._accessTokenKey);

    return !!token && !this._jwtHelper.isTokenExpired(token);
  }

  /**
   * Совершает выход из системы.
   */
  public logout(): void {
    localStorage.removeItem(this._accessTokenKey);
    this._router.navigate(['']);
  }

  /**
   * Устанавливает токен в локал сторедж.
   * @param token
   * @private
   */
  private setToken(token: IAuthToken): void {
    localStorage.setItem(this._accessTokenKey, token.access_token);
  }
}
