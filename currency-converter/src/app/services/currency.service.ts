import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Converter, GetConvertersGeoDataResponse, LatestCurrenciesResponse} from "../interfaces";

@Injectable()
export class CurrencyService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   *  Все методы классов должны быть объявлены в виде Function Declaration
   */
  public getLatestCurrencyExchangeRates = (): Observable<LatestCurrenciesResponse> =>
    this.httpClient.get<LatestCurrenciesResponse>('https://api.exchangerate.host/latest');

  public getConvertersGeoData = (size: number): Observable<Converter[]> =>
    this.httpClient.get<GetConvertersGeoDataResponse[]>(`https://random-data-api.com/api/company/random_company?size=${size}`)
      .pipe(
        map((data: GetConvertersGeoDataResponse[]) =>
          data
            .filter(d => d.latitude > -60 && d.latitude < 60 && d.longitude > -150 && d.longitude < 150)
            .map(d => ({
              title: `${d.suffix} ${d.business_name}`,
              longitude: d.longitude,
              latitude: d.latitude,
              id: d.id,
              description: `${d.suffix} ${d.business_name} ${d.industry} ${d.catch_phrase} ${d.phone_number} ${d.full_address}`
            })),
        ),
      );
}
