import {
  AfterViewInit,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Output,
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
export class ConverterButtonsComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  @Input()
  public allCurrencies!: string[];
  @Input()
  public currencySubject!: Subject<string>;
  @Input()
  public mainCurrencies!: string[];
  @Input()
  public currentCurrency!: string;
  @Input()
  public currencyDescriptions!: ICurrencyDescription[];
  @Input()
  public isToggleOpen!: Subject<boolean>;
  @Input()
  public hiddenCurrenciesSubject!: Subject<string>;
  @Output()
  public dropDownMenu: EventEmitter<ElementRef<HTMLDivElement>> = new EventEmitter<ElementRef<HTMLDivElement>>();

  public currencies!: ICurrencyButton[];
  public descriptions: { [index: string]: string } = {};

  @ViewChild('dropdownMenu')
  private _dropdownMenu!: ElementRef;
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
    this.currencyDescriptions = changes['currencyDescriptions']?.currentValue;

    this.currencyDescriptions?.forEach((d) => {
      this.descriptions[d.currency] = d.description;
    })

    this.currencies = this.mainCurrencies.map(currency =>
      ({
        selected: currency === this.currentCurrency,
        name: currency,
        description: this.descriptions[currency],
      }));
  }

  ngAfterViewInit(): void {
    this.dropDownMenu.emit(this._dropdownMenu);
  }

  /**
   * Метод нажатия на кнопку, выбирает валюты.
   * @param {string} targetCurrency приходящая валюта
   * @param {'hidden' | 'main'} type вид кнопки
   */
  public onButtonClick(targetCurrency: string, type: 'hidden' | 'main'): void {
    this.isToggleOpen.next(false);
    if (type === 'main') {
      this.currencySubject.next(targetCurrency);
    } else {
      this.hiddenCurrenciesSubject.next(targetCurrency);
    }
  }

  /**
   * Метод нажатия на открывающую панель, открывает или закрывает её.
   */
  public onToggleButtonClick(): void {
    this.isToggleOpen.next(true);
  }

  /**
   * Добавляет валюту в список, делая её текущей.
   * @param {string} targetCurrency
   * @private
   */
  private updateCurrency(targetCurrency: string): void {
    if (!this.currencies.some((currency) => currency.name === targetCurrency)) {
      this.currencies[this.currencies.length - 1].name = targetCurrency;
      this.currencies[this.currencies.length - 1].description = this.descriptions[targetCurrency];
    }
    this.currencies.forEach((currency, index) => {
      this.currencies[index].selected = currency.name === targetCurrency;
    })
  }
}
