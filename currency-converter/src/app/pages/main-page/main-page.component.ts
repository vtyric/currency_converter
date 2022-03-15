import {Component, OnInit} from '@angular/core';
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

  constructor(private currencyService: CurrencyService) {
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
