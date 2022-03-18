import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LatestCurrenciesResponse} from "../interfaces";

@Injectable()
export class CurrencyService {

  constructor(private httpClient: HttpClient) {
  }

  public getLatestCurrencyExchangeRates = (): Observable<LatestCurrenciesResponse> =>
    this.httpClient.get<LatestCurrenciesResponse>('https://api.exchangerate.host/latest');
}
