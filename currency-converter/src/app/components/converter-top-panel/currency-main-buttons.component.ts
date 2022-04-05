import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Subject, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-converter-top-panel',
  templateUrl: './currency-main-buttons.component.html',
  styleUrls: ['./currency-main-buttons.component.scss']
})
export class CurrencyMainButtonsComponent implements OnInit, OnDestroy {

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
  private dropdownMenu!: ElementRef;
  private isDropdownMenuOpen: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.currencies = this.mainCurrencies.map(currency => [currency, currency === this.currentCurrency]);

    this.subscriptions.push(
      this.currencySubject.pipe(
        tap(value => {
          this.updateCurrency(value);
        })
      )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  /** Порядо методов класса должен быть такой же, как и у полей:
   * Сначала public, затем protected и только потом private.
   * Код гайд вам должны были скинуть, нужно ознакомиться с ним и все оформить согласно описанию в нем.
   */
  private updateCurrency(targetCurrency: string): void {
    if (!this.currencies.some(([currency, _]) => currency === targetCurrency)) {
      this.currencies[this.currencies.length - 1][0] = targetCurrency;
    }
    this.currencies.forEach(([currency, _], index) => {
      this.currencies[index][1] = currency === targetCurrency;
    })
  }

  /**
   * Для всех методов добавить описание в формате jsdoc
   * Все поля и методы должны быть типизированы, если метод ничего не возвращает, типизируем, как void
   * @param targetCurrency описание параметра
   */
  public onButtonClick(targetCurrency: string): void {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
    this.isDropdownMenuOpen = false;
    this.currencySubject.next(targetCurrency);
  }

  public onToggleButtonClick() {
    if (!this.isDropdownMenuOpen) {
      this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
    } else {
      this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
    }
    this.isDropdownMenuOpen = !this.isDropdownMenuOpen;
  }
}
