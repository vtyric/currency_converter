import {Component, ElementRef, EventEmitter, OnInit, Renderer2} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {LatestCurrenciesResponse} from "../../interfaces";
import {ConverterTogglePosition, DropdownToggle} from "../../types";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public currencies!: string[];
  public date!: Date;
  public rates!: [string, number][];
  public mainCurrencies: string[] = ['RUB', 'USD', 'GBP', 'CNY', 'BYN'];
  public rightCurrency: string = this.mainCurrencies[0];
  public leftCurrency: string = this.mainCurrencies[1];

  public leftInput: FormControl = new FormControl('');
  public isLeftInputSelected!: boolean;

  public rightInput: FormControl = new FormControl('');
  public isRightInputSelected!: boolean;

  private dropdownMenu!: ElementRef;
  private dropDownToggle: DropdownToggle = '';

  constructor(private currencyService: CurrencyService, private renderer: Renderer2) {
  }

  private getRes = (value: number, firstRate: number, secondRate: number): number =>
    !value ? 0 : +(value * firstRate / secondRate).toFixed(4);

  public getDropdownMenu(dropdownMenu: ElementRef): void {
    this.dropdownMenu = dropdownMenu;
  }

  onCurrencyChange(currency: string, position: ConverterTogglePosition) {
    if (position === "left") {
      this.leftCurrency = currency;
    } else {
      this.rightCurrency = currency;
    }

    this.leftInput.setValue(this.leftInput.value);
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

  ngOnInit(): void {
    this.currencyService
      .getLatestCurrencyExchangeRates()
      .subscribe((value: LatestCurrenciesResponse) => {
        this.date = value.date;
        this.rates = Object.entries(value.rates);
        this.currencies = this.rates.map(x => x[0]);
      });

    this.leftInput.valueChanges.subscribe(value => {
      if (!this.isRightInputSelected) {
        const leftRate: number = (this.rates
          ?.find(([key, _]) => key === this.leftCurrency) ?? [])[1] ?? 0;
        const rightRate: number = (this.rates
          ?.find(([key, _]) => key === this.rightCurrency) ?? [])[1] ?? 0;
        this.rightInput.patchValue(this.getRes(Number.parseFloat(value), rightRate, leftRate).toString());
      }
    });

    this.rightInput.valueChanges.subscribe(value => {
      if (!this.isLeftInputSelected) {
        const leftRate: number = (this.rates
          ?.find(([key, _]) => key === this.leftCurrency) ?? [])[1] ?? 0;
        const rightRate: number = (this.rates
          ?.find(([key, _]) => key === this.rightCurrency) ?? [])[1] ?? 0;
        this.leftInput.patchValue(this.getRes(Number.parseFloat(value), leftRate, rightRate).toString());
      }
    });
  }

}
