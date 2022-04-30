import { Component, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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
  public leftInput: FormControl = new FormControl(null);
  public rightInput: FormControl = new FormControl(null);
  public leftCurrencies!: string[];
  public rightCurrencies!: string[];
  public leftCurrency!: string;
  public rightCurrency!: string;
  public leftCurrencySubject!: Subject<string>;
  public rightCurrencySubject!: Subject<string>;
  public hiddenCurrenciesSubject: Subject<string> = new Subject<string>();
  public isLeftToggleOpen: Subject<boolean> = new Subject<boolean>();
  public isRightToggleOpen: Subject<boolean> = new Subject<boolean>();
  public dropdownMenu!: ElementRef<HTMLDivElement>;

  private _lastTogglePosition!: 'left' | 'right';
  private _isLeftToggleOpen: boolean = false;
  private _isRightToggleOpen: boolean = false;
  private _unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _currencyService: CurrencyService,
    private _currencyExchangeService: CurrencyExchangeService,
    private _renderer: Renderer2
  ) {
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
          this._isLeftToggleOpen = false;
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe(_ => {
        if (this.leftInput.value) {
          this.leftInput.setValue(this.leftInput.value);
        }
      });

    this._currencyExchangeService.rightCurrencySubject
      .pipe(
        tap(currency => {
          this._currencyExchangeService.updateCurrency(currency, 'right');
          this._isRightToggleOpen = false;
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe(_ => {
        if (this.leftInput.value) {
          this.leftInput.setValue(this.leftInput.value);
        }
      });

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

    this.isRightToggleOpen
      .pipe(
        tap(isRightToggleOpen => {
          this._isRightToggleOpen = isRightToggleOpen && this._isRightToggleOpen !== isRightToggleOpen;
          this._isLeftToggleOpen = false;
          this._lastTogglePosition = this._isRightToggleOpen ? 'right' : this._lastTogglePosition;
          this.changeDropDownState(this._isRightToggleOpen);
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe();

    this.isLeftToggleOpen
      .pipe(
        tap((isLeftToggleOpen) => {
          this._isLeftToggleOpen = isLeftToggleOpen && this._isLeftToggleOpen !== isLeftToggleOpen;
          this._isRightToggleOpen = false;
          this._lastTogglePosition = this._isLeftToggleOpen ? 'left' : this._lastTogglePosition;
          this.changeDropDownState(this._isLeftToggleOpen);
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe();

    this.hiddenCurrenciesSubject
      .pipe(
        tap(currency => {
          if (this._lastTogglePosition === 'right') {
            this.rightCurrencySubject.next(currency);
          } else {
            this.leftCurrencySubject.next(currency);
          }
        }),
        takeUntil(this._unsubscriber)
      )
      .subscribe();
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

  /**
   * Открывает или закрывает окно со скрытыми валютами.
   * @param isOpen открыто или закрыто дополнительное окно
   * @private
   */
  private changeDropDownState(isOpen: boolean): void {
    if (isOpen) {
      this._renderer.addClass(this.dropdownMenu.nativeElement, 'show');
    } else {
      this._renderer.removeClass(this.dropdownMenu.nativeElement, 'show')
    }
  }
}
