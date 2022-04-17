import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { ICurrencyButton } from "../../interfaces";
import { ICurrencyDescription } from "../../../shared/interfaces";

@Component({
  selector: 'converter-buttons',
  templateUrl: './converter-buttons.component.html',
})
export class ConverterButtonsComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public allCurrencies!: string[];
  @Input()
  public currencySubject!: Subject<string>;
  @Input()
  public mainCurrencies!: string[];
  @Input()
  public currentCurrency!: string;
  @Input()
  public currencyDescription!: ICurrencyDescription[];
  public currencies!: ICurrencyButton[];

  @ViewChild('dropdownMenu')
  private _dropdownMenu!: ElementRef;
  private _isDropdownMenuOpen: boolean = false;
  private _unsubscriber: Subject<void> = new Subject<void>()

  constructor(private _renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.currencySubject
      .pipe(
        tap(value => this.updateCurrency(value)),
        takeUntil(this._unsubscriber)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.currencyDescription = changes['currencyDescription']?.currentValue;

    this.currencies = this.mainCurrencies.map(currency =>
      ({
        selected: currency === this.currentCurrency,
        name: currency,
        description: this.getCurrencyDescription(currency),
      }));
  }

  /**
   * Метод нажатия на кнопку, выбирает валюты.
   * @param {string} targetCurrency
   */
  public onButtonClick(targetCurrency: string): void {
    this._renderer.removeClass(this._dropdownMenu.nativeElement, 'show');
    this._isDropdownMenuOpen = false;
    this.currencySubject.next(targetCurrency);
  }

  /**
   * Метод нажатия на открывающую панель, открывает или закрывает её.
   */
  public onToggleButtonClick(): void {
    if (!this._isDropdownMenuOpen) {
      this._renderer.addClass(this._dropdownMenu.nativeElement, 'show');
    } else {
      this._renderer.removeClass(this._dropdownMenu.nativeElement, 'show');
    }
    this._isDropdownMenuOpen = !this._isDropdownMenuOpen;
  }

  /**
   * Добавляет валюту в список, делая её текущей.
   * @param {string} targetCurrency
   * @private
   */
  private updateCurrency(targetCurrency: string): void {
    if (!this.currencies.some((currency) => currency.name === targetCurrency)) {
      this.currencies[this.currencies.length - 1].name = targetCurrency;
      this.currencies[this.currencies.length - 1].description = this.getCurrencyDescription(targetCurrency);
    }
    this.currencies.forEach((currency, index) => {
      this.currencies[index].selected = currency.name === targetCurrency;
    })
  }

  /**
   * Возвращает описание валюты по её названию.
   * @param currency название валюты
   * @returns {string}
   * @private
   */
  private getCurrencyDescription(currency: string): string {
    return this.currencyDescription?.filter(value => value.currency === currency)[0]?.description ?? "";
  }
}
