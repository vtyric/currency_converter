import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

import { CurrencyService } from '../shared/services/currency.service';
import { ICurrencyDescription, ILatestCurrenciesResponse } from '../shared/interfaces';
import { CurrencyExchangeService } from './services/currency-exchange.service';


@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit, OnDestroy {

  public currencies!: string[];
  public currenciesDescription!: ICurrencyDescription[];
  public date!: Date;
  public rates!: [string, number][];
  public leftInput: FormControl = new FormControl('');
  public rightInput: FormControl = new FormControl('');
  public leftCurrencies!: string[];
  public rightCurrencies!: string[];
  public leftCurrency!: string;
  public rightCurrency!: string;
  public leftCurrencySubject!: Subject<string>;
  public rightCurrencySubject!: Subject<string>;

  private _unsubscriber: Subject<void> = new Subject<void>();

  constructor(private _currencyService: CurrencyService, private _currencyExchangeService: CurrencyExchangeService) {
    this.leftCurrencies = _currencyExchangeService.leftCurrencies;
    this.rightCurrencies = _currencyExchangeService.rightCurrencies;
    this.leftCurrency = _currencyExchangeService.leftCurrency;
    this.rightCurrency = _currencyExchangeService.rightCurrency;
    this.leftCurrencySubject = _currencyExchangeService.leftCurrencySubject;
    this.rightCurrencySubject = _currencyExchangeService.rightCurrencySubject;
  }

  ngOnInit(): void {
    this._currencyService
      .getLatestCurrencyExchangeRates()
      .pipe(
        tap((value: ILatestCurrenciesResponse) => {
          this.date = value.date;
          this.rates = Object.entries(value.rates);
          this.currencies = this.rates.map(x => x[0]);
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe();

    this._currencyService
      .getCurrenciesDescription()
      .pipe(
        tap((value: ICurrencyDescription[]) => {
          this.currenciesDescription = value;
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe();

    this._currencyExchangeService.leftCurrencySubject
      .pipe(
        tap(currency => {
          this._currencyExchangeService.updateCurrency(currency, 'left');
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe(_ => this.leftInput.setValue(this.leftInput.value));

    this._currencyExchangeService.rightCurrencySubject
      .pipe(
        tap(currency => {
          this._currencyExchangeService.updateCurrency(currency, 'right');
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe(_ => this.leftInput.setValue(this.leftInput.value))

    this.leftInput.valueChanges
      .pipe(
        takeUntil(this._unsubscriber)
      )
      .subscribe(value => this._currencyExchangeService
        .updateInputValue(Number.parseFloat(value), this.rates, this.rightInput, 'right'));

    this.rightInput.valueChanges
      .pipe(
        takeUntil(this._unsubscriber)
      )
      .subscribe(value => this._currencyExchangeService
        .updateInputValue(Number.parseFloat(value), this.rates, this.leftInput, 'left'));
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  /**
   * Меняет местами левые и правые валюты и их значения.
   */
  public OnArrowsClick(): void {
    this._currencyExchangeService.swapCurrencies();
  }

}
