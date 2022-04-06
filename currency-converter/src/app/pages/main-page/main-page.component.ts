import {Component, OnDestroy, OnInit} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {LatestCurrenciesResponse} from "../../interfaces";
import {FormControl} from "@angular/forms";
import {Subject, Subscription, tap} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {

  /** Нужно декомпозировать компоненту, хранение данных и сложная логика в компоненте - это очень плохо, для этого у нас есть сервисы.
   * Я бы подумал над тем, чтобы добавить компонету конвертора и отдельный модуль для него, и аккумулировать всю логику по обмену там.
   */
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

  private subscriptions: Subscription[] = [];

  constructor(private currencyService: CurrencyService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.currencyService
        .getLatestCurrencyExchangeRates()
        .pipe(tap((value: LatestCurrenciesResponse) => {
          this.date = value.date;
          this.rates = Object.entries(value.rates);
          this.currencies = this.rates.map(x => x[0]);
        }))
        .subscribe()
    );

    this.subscriptions.push(
      this.leftCurrency
        .pipe(tap(currency => {
          if (!this.leftCurrencies.includes(currency)) {
            this.leftCurrencies[this.leftCurrencies.length - 1] = currency;
          }
          this.currentLeftCurrency = currency;
        }))
        .subscribe(_ => this.leftInput.setValue(this.leftInput.value))
    );

    this.subscriptions.push(
      this.rightCurrency
        .pipe(tap(currency => {
          if (!this.rightCurrencies.includes(currency)) {
            this.rightCurrencies[this.rightCurrencies.length - 1] = currency;
          }
          this.currentRightCurrency = currency;
        }))
        .subscribe(_ => this.leftInput.setValue(this.leftInput.value))
    );

    this.subscriptions.push(
      this.leftInput.valueChanges
        .subscribe(value => this.updateInputValue(Number.parseFloat(value), this.rightInput))
    );

    this.subscriptions.push(
      this.rightInput.valueChanges
        .subscribe(value => this.updateInputValue(Number.parseFloat(value), this.leftInput))
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

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

  private getRes = (value: number, firstRate: number, secondRate: number): number =>
    !value ? 0 : +(value * firstRate / secondRate).toFixed(4);

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
}
