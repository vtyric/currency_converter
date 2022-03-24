import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Subject, tap} from "rxjs";

@Component({
  selector: 'app-converter-element',
  templateUrl: './converter-element.component.html',
  styleUrls: ['./converter-element.component.scss']
})
export class ConverterElementComponent implements OnInit {

  @Input()
  public title!: string;
  @Input()
  public allCurrencies!: string[];
  @Input()
  public cash!: FormControl;
  @Input()
  public currencySubject!: Subject<string>;
  @Input()
  public mainCurrencies!: string[];
  @Input()
  public currentCurrency!: string;

  public isInputSelected: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
    this.cash.valueChanges
      .pipe(
        map(value => value.replace(',', '.').replace(/[^.\d]/g, '')),
        map((value: string) => {
          if (value.includes('.')) {
            let temp = value[0] === '.' ? ("0" + value).split('.') : value.split('.');

            return temp.shift() + '.' + temp.join("");
          }
          return value;
        }),
        tap(value => this.cash.patchValue(value, {emitEvent: false}))
      )
      .subscribe();
  }
}
