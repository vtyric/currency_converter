import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {LatestCurrenciesResponse} from "../../interfaces";
import {DropdownToggle} from "../../types";
import {FormControl} from "@angular/forms";
import {filter, Subject, tap} from "rxjs";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public currencies!: string[];
  public date!: Date;
  public rates!: [string, number][];

  public leftCurrencies: string[] = ['RUB', 'USD', 'GBP', 'CNY'];
  public rightCurrencies: string[] = ['USD', 'GBP', 'CNY', 'BYN'];

  private currentRightCurrency: string = this.rightCurrencies[0];
  private currentLeftCurrency: string = this.leftCurrencies[0];

  public leftCurrency: Subject<string> = new Subject<string>();
  public rightCurrency: Subject<string> = new Subject<string>();

  public leftInput: FormControl = new FormControl('');
  public rightInput: FormControl = new FormControl('');

  private dropdownMenu!: ElementRef;
  private dropDownToggle: DropdownToggle = '';

  constructor(private currencyService: CurrencyService, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.currencyService
      .getLatestCurrencyExchangeRates()
      .pipe(tap((value: LatestCurrenciesResponse) => {
        this.date = value.date;
        this.rates = Object.entries(value.rates);
        this.currencies = this.rates.map(x => x[0]);
      }))
      .subscribe();

    this.leftCurrency
      .pipe(tap(value => this.currentLeftCurrency = value))
      .subscribe(_ => this.leftInput.setValue(this.leftInput.value));

    this.rightCurrency
      .pipe(tap(value => this.currentRightCurrency = value))
      .subscribe(_ => this.leftInput.setValue(this.leftInput.value));

    this.leftInput.valueChanges
      .subscribe(value => this.updateInputValue(Number.parseFloat(value), this.rightInput));

    this.rightInput.valueChanges.subscribe(value => this.updateInputValue(Number.parseFloat(value), this.leftInput))
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

  public getDropdownMenu(dropdownMenu: ElementRef): void {
    this.dropdownMenu = dropdownMenu;
  }

  public OnArrowsClick(): void {
    console.log('click');
  }

  public dropdownUpdate(toggle: DropdownToggle): void {
    if (toggle !== '') {
      this.dropDownToggle = toggle;
      this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
    } else {
      this.dropDownToggle = '';
      this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
    }
  }
}
