import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'converter-buttons',
  templateUrl: './converter-buttons.component.html',
})
export class ConverterButtonsComponent implements OnInit, OnDestroy {
  @Input()
  public allCurrencies!: string[];
  @Input()
  public currencySubject!: Subject<string>;
  @Input()
  public mainCurrencies!: string[];
  @Input()
  public currentCurrency!: string;
  public currencies!: [string, boolean][];

  @ViewChild('dropdownMenu')
  private _dropdownMenu!: ElementRef;
  private _isDropdownMenuOpen: boolean = false;
  private _unsubscriber: Subject<void> = new Subject<void>()

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.currencies = this.mainCurrencies.map(currency => [currency, currency === this.currentCurrency]);

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

  /**
   * Метод нажатия на кнопку, выбирает валюты.
   * @param {string} targetCurrency
   */
  public onButtonClick(targetCurrency: string): void {
    this.renderer.removeClass(this._dropdownMenu.nativeElement, 'show');
    this._isDropdownMenuOpen = false;
    this.currencySubject.next(targetCurrency);
  }

  /**
   * Метод нажатия на открывающую панель, открывает или закрывает её.
   */
  public onToggleButtonClick(): void {
    if (!this._isDropdownMenuOpen) {
      this.renderer.addClass(this._dropdownMenu.nativeElement, 'show');
    } else {
      this.renderer.removeClass(this._dropdownMenu.nativeElement, 'show');
    }
    this._isDropdownMenuOpen = !this._isDropdownMenuOpen;
  }

  /**
   * Добавляет валюту в список, делая её текущей.
   * @param {string} targetCurrency
   * @private
   */
  private updateCurrency(targetCurrency: string): void {
    if (!this.currencies.some(([currency, _]) => currency === targetCurrency)) {
      this.currencies[this.currencies.length - 1][0] = targetCurrency;
    }
    this.currencies.forEach(([currency, _], index) => {
      this.currencies[index][1] = currency === targetCurrency;
    })
  }
}
