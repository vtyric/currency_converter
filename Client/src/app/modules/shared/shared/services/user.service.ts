import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../../environments/environment";
import { Observable } from "rxjs";
import { IUser } from "../interfaces";

@Injectable()
export class UserService {
  private _apiUrl: string = 'api/Users';

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Получает список всех пользователей.
   * @return {Observable<IUser[]>}
   */
  public getAllUsers(): Observable<IUser[]> {
    return this._httpClient.get<IUser[]>(`${environment.apiUrl}${this._apiUrl}`);
  }

  /**
   * Получает пользователя по id.
   * @param {number} id
   * @return {Observable<IUser>}
   */
  public getUserById(id: number): Observable<IUser> {
    return this._httpClient.get<IUser>(`${environment.apiUrl}${this._apiUrl}${id}`);
  }
}
