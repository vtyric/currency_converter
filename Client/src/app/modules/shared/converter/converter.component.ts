import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { CurrencyService } from '../shared/services/currency.service';
import { ICurrencyDescription, ILatestCurrenciesResponse } from '../shared/interfaces';
import { ConverterFormService, ConverterToggleService, CurrencyExchangeService } from './services';


@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit, OnDestroy {

    public currencies!: string[];
    public currenciesDescription!: ICurrencyDescription;
    public date!: Date;
    public rates!: Array<[string, number]>;

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _currencyService: CurrencyService,
        private _converterToggleService: ConverterToggleService,
        private _currencyExchangeService: CurrencyExchangeService,
        private _converterFormService: ConverterFormService,
    ) {
    }

    public ngOnInit(): void {
        this._currencyService.getLatestCurrencyExchangeRates()
            .pipe(
                tap(({ date, rates }: ILatestCurrenciesResponse) => {
                    this.date = date;
                    this.updateLatestCurrencyExchangeRates(rates);
                }),
                takeUntil(this._unsubscriber)
            )
            .subscribe();

        this._currencyService.getCurrenciesDescription()
            .pipe(
                tap((value: ICurrencyDescription) => {
                    this.currenciesDescription = value;
                }),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    /**
     * Получает елемент меню из output.
     * @param {ElementRef<HTMLDivElement>} dropdownMenu
     */
    public getDropdownMenu(dropdownMenu: ElementRef<HTMLDivElement>): void {
        this._converterToggleService.updateDropdownMenu(dropdownMenu);
    }

    /**
     * Меняет местами левые и правые валюты и их значения.
     */
    public onArrowsClick(): void {
        this._currencyExchangeService.swapCurrencies();
    }

    /**
     * Метод обновляющий поля компоенты, когда приходят последние изменения валют.
     * @param {{string: number}} rates
     * @private
     */
    private updateLatestCurrencyExchangeRates(rates: { string: number }): void {
        this.rates = Object.entries(rates);
        this.currencies = this.rates.map(([currency]: [string, number]) => currency);
        this._converterFormService.updateFormControllers(this.rates);
    }
}
