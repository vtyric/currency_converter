import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {CurrencyService} from "../../services/currency.service";
import {LatestCurrenciesResponse} from "../../interfaces";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  public currencies!: string[];
  public date!: Date;
  public mainCurrencies: string[] = ['RUB', 'USD', 'GBP', 'CNY', 'BYN'];

  private dropdownMenu!: ElementRef;

  constructor(private currencyService: CurrencyService, private renderer: Renderer2) {
  }

  public getDropdownMenu(dropdownMenu: ElementRef): void {
    this.dropdownMenu = dropdownMenu;
  }

  public OnArrowsClick(): void {
    console.log('click');
  }

  public dropdownUpdate(toggle: boolean): void {
    if (toggle) {
      this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
    } else {
      this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
    }
  }

  ngOnInit(): void {
    this.currencyService
      .getLatestCurrencyExchangeRates()
      .subscribe((value: LatestCurrenciesResponse) => {
        this.date = value.date;
        this.currencies = Object.keys(value.rates);
      })
  }

}
