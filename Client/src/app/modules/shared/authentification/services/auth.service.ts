import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';
import { IAuthToken, IDecodedToken } from '../interfaces';
import { environment } from '../../../../../environments/environment';
import { Role } from '../enums';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {

    private readonly _accessTokenKey: string = 'accessToken';
    private readonly _authApiUrl: string = 'api/Auth';

    private _token!: string | null;

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
        return this._http.post<IAuthToken>(`${ environment.apiUrl }${ this._authApiUrl }/Login`, { login, password })
            .pipe(
                tap((value: IAuthToken) => {
                    this.setToken(value);
                }),
                map((token: IAuthToken) => jwtDecode(token.accessToken)),
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
        return this._http.post<IAuthToken>(`${ environment.apiUrl }${ this._authApiUrl }/Register`, {
            login,
            password,
            role
        })
            .pipe(
                tap((value: IAuthToken) => {
                    this.setToken(value);
                }),
                map((token: IAuthToken) => jwtDecode(token.accessToken)),
            );
    }

    /**
     * Проверяет аутентифицирован ли пользователь.
     * @param {Role} role
     * @returns {boolean}
     */
    public isAuthenticatedByRole(role: Role = Role.user): boolean {
        return this.getCurrentUserRole() === role;
    }

    /**
     * Возвращает текущую роль полььзователя, null если он не авторизован.
     * @returns {"User" | "Admin" | null}
     */
    public getCurrentUserRole(): Role | null {
        return this.isTokenValid() && !!this._token ? jwtDecode<IDecodedToken>(this._token)?.role : null;
    }

    /**
     * Возвращает id текущего пользователя, null если он не авторизован.
     * @returns {"User" | "Admin" | null}
     */
    public getCurrentUserId(): string | null {
        return this.isTokenValid() && !!this._token ? jwtDecode<IDecodedToken>(this._token)?.id : null;
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
     * @param {IAuthToken} token
     * @private
     */
    private setToken(token: IAuthToken): void {
        localStorage.setItem(this._accessTokenKey, token.accessToken);
    }

    /**
     * Проверяет валиден ли токен, сохраняет его в поле.
     * @returns {boolean}
     * @private
     */
    private isTokenValid(): boolean {
        this._token = localStorage.getItem(this._accessTokenKey);

        return !!this._token && !this._jwtHelper.isTokenExpired(this._token);
    }
}
