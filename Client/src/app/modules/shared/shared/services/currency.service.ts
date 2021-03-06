import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
    IConverter,
    IConvertersGeoDataResponse,
    ICurrenciesDescriptionResponse,
    ICurrencyDescription,
    ILatestCurrenciesResponse
} from '../interfaces';

@Injectable()
export class CurrencyService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Получает последние изменения валют в евро.
     * @returns {Observable<ILatestCurrenciesResponse>}
     */
    public getLatestCurrencyExchangeRates(): Observable<ILatestCurrenciesResponse> {
        return this._httpClient.get<ILatestCurrenciesResponse>('https://api.exchangerate.host/latest');
    }

    /**
     * Получает список конвертеров.
     * @returns {Observable<IConverter[]>}
     */
    public getConvertersGeoData(): Observable<IConverter[]> {
        return this._httpClient.get<IConvertersGeoDataResponse[]>(`https://random-data-api.com/api/company/random_company?size=${ 20 }`)
            .pipe(
                map((data: IConvertersGeoDataResponse[]) =>
                    data
                        .filter((d: IConvertersGeoDataResponse) => d.latitude > -60 && d.latitude < 60 && d.longitude > -150 && d.longitude < 150)
                        .map((d: IConvertersGeoDataResponse) => ({
                            title: `${ d.suffix } ${ d.business_name }`,
                            longitude: d.longitude,
                            latitude: d.latitude,
                            id: d.id,
                            description: `${ d.suffix } ${ d.business_name } ${ d.industry } ${ d.catch_phrase } ${ d.phone_number } ${ d.full_address }`
                        })),
                ),
            );
    }

    /**
     * Получает массив валют с их описанием.
     * @returns {Observable<ICurrencyDescription[]>}
     */
    public getCurrenciesDescription(): Observable<ICurrencyDescription> {
        return this._httpClient.get<ICurrenciesDescriptionResponse>('https://api.currencyfreaks.com/currency-symbols');
    }
}
