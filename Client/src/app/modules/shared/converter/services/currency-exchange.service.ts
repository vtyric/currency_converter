import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable()
export class CurrencyExchangeService {

  public leftCurrencies: string[] = ['RUB', 'USD', 'GBP', 'CNY'];
  public rightCurrencies: string[] = ['USD', 'RUB', 'GBP', 'CNY'];
  public leftCurrency: string = this.leftCurrencies[0];
  public rightCurrency: string = this.rightCurrencies[0];
  public leftCurrencySubject: Subject<string> = new Subject<string>();
  public rightCurrencySubject: Subject<string> = new Subject<string>();

  constructor() {
  }

  /**
   * Обновляет значение противоположного инпута по заданной формуле в методе.
   * @param {number} value значение инпута
   * @param {[string, number][]} rates массив валют
   * @param {FormControl} control контрол, который нужно обновить
   * @param {'left' | 'right'} controlPosition положение передаваемого контрола
   * @private
   */
  public updateInputValue(value: number, rates: [string, number][], control: FormControl, controlPosition: 'left' | 'right'): void {
    const leftRate: number = (rates
      ?.find(([key, _]) => key === this.leftCurrency) ?? [])[1] ?? 0;
    const rightRate: number = (rates
      ?.find(([key, _]) => key === this.rightCurrency) ?? [])[1] ?? 0;

    if (controlPosition === 'left') {
      control.patchValue(this.getExchangeResult(value, leftRate, rightRate));
    } else {
      control.patchValue(this.getExchangeResult(value, rightRate, leftRate), {emitEvent: false});
    }
  }

  /**
   * Обновляет значение одного из currency.
   * @param {string} currency новое значение валюты
   * @param {'left' | 'right'} currencyPosition левая или правая валюта
   */
  public updateCurrency(currency: string, currencyPosition: 'left' | 'right'): void {
    if (currencyPosition === 'left' && !this.leftCurrencies.includes(currency)) {
      this.leftCurrencies[this.leftCurrencies.length - 1] = currency;
    } else if (currencyPosition === 'right' && !this.rightCurrencies.includes(currency)) {
      this.rightCurrencies[this.rightCurrencies.length - 1] = currency;
    }
    if (currencyPosition === 'left') {
      this.leftCurrency = currency;
    } else {
      this.rightCurrency = currency;
    }
  }

  /**
   * Меняет местами currency и currencies.
   */
  public swapCurrencies(): void {
    let tempCurrencies = this.leftCurrencies;
    this.leftCurrencies = this.rightCurrencies;
    this.rightCurrencies = tempCurrencies;
    const tempCurrency = this.leftCurrency;
    this.leftCurrencySubject.next(this.rightCurrency);
    this.rightCurrencySubject.next(tempCurrency);
  }

  /**
   * Переводит валюту из firstRate в secondRate.
   * @param {number} value значение инпута, которое изменилось
   * @param {number} firstRate цена противоположной валюты к евро
   * @param {number} secondRate цена текущей валюты к евро
   * @returns {string} измененное значение другого инпута
   * @private
   */
  private getExchangeResult(value: number, firstRate: number, secondRate: number): string {
    return !value ? "" : (value * firstRate / secondRate).toFixed(4);
  }
}
