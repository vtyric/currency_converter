import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

import { CurrencyService } from '../../services/currency.service';
import { ILatestCurrenciesResponse } from '../../interfaces';
import { CurrencyExchangeService } from './services/currency-exchange.service';


@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit, OnDestroy {

  public currencies!: string[];
  public date!: Date;
  public rates!: [string, number][];
  public leftInput: FormControl = new FormControl('');
  public rightInput: FormControl = new FormControl('');

  private _unsubscriber: Subject<void> = new Subject<void>()

  constructor(private _currencyService: CurrencyService, public currencyExchangeService: CurrencyExchangeService) {
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

    this.currencyExchangeService.leftCurrencySubject
      .pipe(
        tap(currency => {
          this.currencyExchangeService.updateCurrency(currency, 'left');
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe(_ => this.leftInput.setValue(this.leftInput.value));

    this.currencyExchangeService.rightCurrencySubject
      .pipe(
        tap(currency => {
          this.currencyExchangeService.updateCurrency(currency, 'right');
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe(_ => this.leftInput.setValue(this.leftInput.value))

    this.leftInput.valueChanges
      .pipe(
        takeUntil(this._unsubscriber)
      )
      .subscribe(value => this.currencyExchangeService
        .updateInputValue(Number.parseFloat(value), this.rates, this.rightInput, 'right'));

    this.rightInput.valueChanges
      .pipe(
        takeUntil(this._unsubscriber)
      )
      .subscribe(value => this.currencyExchangeService
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
    this.currencyExchangeService.swapCurrencies();
    const tempValue = this.leftInput.value;
    this.leftInput.patchValue(this.rightInput.value, {emitEvent: false});
    this.rightInput.patchValue(tempValue, {emitEvent: false});
  }

}
