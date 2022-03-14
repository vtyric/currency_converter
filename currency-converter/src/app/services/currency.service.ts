import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class CurrencyService {

  private readonly url: string = 'https://api.currencyfreaks.com/';

  constructor(private httpClient: HttpClient) {
  }

  public getSupportedCurrencies = (): Observable<any> =>
    this.httpClient.get(`${this.url}supported-currencies`);

  public getSupportedCurrencySymbols = (): Observable<any> =>
    this.httpClient.get(`${this.url}currency-symbols`);

  public getHistoricalDataLimits = (): Observable<any> =>
    this.httpClient.get(`${this.url}historical-data-limits`);

  public getLatestCurrencyExchangeRates = (): Observable<any> =>
    this.httpClient.get(`${this.url}latest?apikey=${environment.currencyFreaksApiKEy}`);

  public getRatesDesiredCurrencies = (symbols: string[]): Observable<any> =>
    this.httpClient
      .get(`${this.url}latest?apikey=${environment.currencyFreaksApiKEy}&symbols=${symbols
        .reduce((r, c) => r + c + ',', '')
        .slice(0, -1)}`);
}
