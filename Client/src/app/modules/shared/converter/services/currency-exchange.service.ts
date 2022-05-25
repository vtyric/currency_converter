import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';
import { ConverterToggleService } from './converter-toggle.service';
import { ConverterFormService } from './converter-form.service';

@Injectable()
export class CurrencyExchangeService {

    private _leftCurrencies: string[] = ['RUB', 'USD', 'GBP', 'CNY'];
    private _rightCurrencies: string[] = ['USD', 'RUB', 'GBP', 'CNY'];
    private _leftCurrency: string = this._leftCurrencies[0];
    private _rightCurrency: string = this._rightCurrencies[0];
    private _leftCurrencySubject: Subject<string> = new Subject<string>();
    private _rightCurrencySubject: Subject<string> = new Subject<string>();
    private _hiddenCurrenciesSubject: Subject<string> = new Subject<string>();

    constructor(
        private _converterToggleService: ConverterToggleService,
        private _converterFormService: ConverterFormService,
    ) {
        this._converterFormService.leftCurrency = this._leftCurrency;
        this._converterFormService.rightCurrency = this._rightCurrency;

        this._leftCurrencySubject
            .pipe(
                tap((currency: string) => {
                    this._converterFormService.leftCurrency = currency;
                    this.updateCurrency(currency, 'left');
                }),
                tap(() => this.updateInputValue(this._converterFormService.getInputByPosition('left').value)),
            )
            .subscribe();

        this._rightCurrencySubject
            .pipe(
                tap((currency: string) => {
                    this._converterFormService.rightCurrency = currency;
                    this.updateCurrency(currency, 'right');
                }),
                tap(() => this.updateInputValue(this._converterFormService.getInputByPosition('left').value))
            )
            .subscribe();

        this._hiddenCurrenciesSubject
            .pipe(
                tap((currency: string) => this.updateHiddenCurrencies(currency)),
            )
            .subscribe();
    }

    /**
     * Возвращает subject в зависимости от позиции.
     * @param {"left" | "right"} position
     * @returns {Subject<string>}
     */
    public getSubjectByPosition(position: 'left' | 'right'): Subject<string> {
        return position === 'left' ? this._leftCurrencySubject : this._rightCurrencySubject;
    }

    /**
     * Возвращает subject скрытых валют
     * @returns {Subject<string>}
     */
    public getHiddenCurrenciesSubject(): Subject<string> {
        return this._hiddenCurrenciesSubject;
    }

    /**
     * Возвращает валюты в зависимости от позиции.
     * @param {"left" | "right"} position
     * @returns {string[]}
     */
    public getCurrenciesByPosition(position: 'left' | 'right'): string[] {
        return position === 'left' ? this._leftCurrencies : this._rightCurrencies;
    }

    /**
     * Возвращвет валюту в зависимости от позиции.
     * @param {"left" | "right"} position
     * @returns {string}
     */
    public getCurrencyByPosition(position: 'left' | 'right'): string {
        return position === 'left' ? this._leftCurrency : this._rightCurrency;
    }

    /**
     * Меняет местами currency и currencies.
     */
    public swapCurrencies(): void {
        const tempCurrencies: string[] = this._leftCurrencies;
        this._leftCurrencies = this._rightCurrencies;
        this._rightCurrencies = tempCurrencies;
        const tempCurrency: string = this._leftCurrency;
        this._leftCurrencySubject.next(this._rightCurrency);
        this._rightCurrencySubject.next(tempCurrency);
    }

    /**
     * Обновляет значение одного из currency.
     * @param {string} currency новое значение валюты
     * @param {'left' | 'right'} currencyPosition левая или правая валюта
     * @private
     */
    private updateCurrency(currency: string, currencyPosition: 'left' | 'right'): void {
        if (currencyPosition === 'left' && !this._leftCurrencies.includes(currency)) {
            this._leftCurrencies[this._leftCurrencies.length - 1] = currency;
        } else if (currencyPosition === 'right' && !this._rightCurrencies.includes(currency)) {
            this._rightCurrencies[this._rightCurrencies.length - 1] = currency;
        }
        if (currencyPosition === 'left') {
            this._leftCurrency = currency;
        } else {
            this._rightCurrency = currency;
        }
    }

    /**
     * Обновляет значение контролла.
     * @param {string} value
     * @private
     */
    private updateInputValue(value: string): void {
        if (value) {
            this._converterFormService.getInputByPosition('left').setValue(value);
        }
    }

    /**
     * Обновляет выьранную в dropdownMenu валюту.
     * @param {string} currency
     * @private
     */
    private updateHiddenCurrencies(currency: string): void {
        if (this._converterToggleService.lastTogglePosition === 'right') {
            this._converterFormService.rightCurrency = currency;
            this._rightCurrencySubject.next(currency);
        } else {
            this._converterFormService.leftCurrency = currency;
            this._leftCurrencySubject.next(currency);
        }
    }
}
