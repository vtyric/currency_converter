import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';

import { CurrencyService } from '../../services/currency.service';
import { ILatestCurrenciesResponse } from '../../interfaces';


@Component({
  selector: 'converter',
  templateUrl: './converter.component.html',
})
export class ConverterComponent implements OnInit, OnDestroy {
  public currencies!: string[];
  public date!: Date;
  public rates!: [string, number][];
  public leftCurrencies: string[] = ['RUB', 'USD', 'GBP', 'CNY'];
  public rightCurrencies: string[] = ['USD', 'RUB', 'GBP', 'CNY'];
  public currentRightCurrency: string = this.rightCurrencies[0];
  public currentLeftCurrency: string = this.leftCurrencies[0];
  public leftCurrency: Subject<string> = new Subject<string>();
  public rightCurrency: Subject<string> = new Subject<string>();
  public leftInput: FormControl = new FormControl('');
  public rightInput: FormControl = new FormControl('');

  private _unsubscriber: Subject<void> = new Subject<void>()

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.currencyService
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

    this.leftCurrency
      .pipe(
        tap(currency => {
          if (!this.leftCurrencies.includes(currency)) {
            this.leftCurrencies[this.leftCurrencies.length - 1] = currency;
          }
          this.currentLeftCurrency = currency;
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe(_ => this.leftInput.setValue(this.leftInput.value));

    this.rightCurrency
      .pipe(
        tap(currency => {
          if (!this.rightCurrencies.includes(currency)) {
            this.rightCurrencies[this.rightCurrencies.length - 1] = currency;
          }
          this.currentRightCurrency = currency;
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe(_ => this.leftInput.setValue(this.leftInput.value))

    this.leftInput.valueChanges
      .pipe(
        takeUntil(this._unsubscriber)
      )
      .subscribe(value => this.updateInputValue(Number.parseFloat(value), this.rightInput));

    this.rightInput.valueChanges
      .pipe(
        takeUntil(this._unsubscriber)
      )
      .subscribe(value => this.updateInputValue(Number.parseFloat(value), this.leftInput))
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  /**
   * Меняет местами левые и правые валюты и их значения.
   */
  public OnArrowsClick(): void {
    let tempCurrencies = this.leftCurrencies;
    this.leftCurrencies = this.rightCurrencies;
    this.rightCurrencies = tempCurrencies;
    const tempValue = this.leftInput.value;
    this.leftInput.patchValue(this.rightInput.value, {emitEvent: false});
    this.rightInput.patchValue(tempValue, {emitEvent: false});
    const tempCurrency = this.currentLeftCurrency;
    this.leftCurrency.next(this.currentRightCurrency);
    this.rightCurrency.next(tempCurrency);
  }

  /**
   * Обновляет значение противоположного инпута по заданной формуле в методе.
   * @param {number} value значение инпута
   * @param {FormControl} control контрол, который нужно обновить
   * @private
   */
  private updateInputValue(value: number, control: FormControl) {
    const leftRate: number = (this.rates
      ?.find(([key, _]) => key === this.currentLeftCurrency) ?? [])[1] ?? 0;
    const rightRate: number = (this.rates
      ?.find(([key, _]) => key === this.currentRightCurrency) ?? [])[1] ?? 0;

    if (control === this.leftInput) {
      control.patchValue(this.getRes(value, leftRate, rightRate).toString());
    } else {
      control.patchValue(this.getRes(value, rightRate, leftRate).toString(), {emitEvent: false});
    }
  }


  /**
   * Переводит валюту из firstRate в secondRate.
   * @param {number} value значение инпута, которое изменилось
   * @param {number} firstRate цена противоположной валюты к евро
   * @param {number} secondRate цена текущей валюты к евро
   * @returns {number} измененное значение другого инпута
   * @private
   */
  private getRes(value: number, firstRate: number, secondRate: number): number {
    return !value ? 0 : +(value * firstRate / secondRate).toFixed(4);
  }
}
