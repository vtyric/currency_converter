import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { map, Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: 'app-converter-element',
  templateUrl: './converter-element.component.html',
  styleUrls: ['../../styles/converter-element.component.scss']
})
export class ConverterElementComponent implements OnInit, OnDestroy {

  @Input()
  public title!: string;
  @Input()
  public allCurrencies!: string[];
  @Input()
  public cashInput!: FormControl;
  @Input()
  public currencySubject!: Subject<string>;
  @Input()
  public mainCurrencies!: string[];
  @Input()
  public currentCurrency!: string;
  public isInputSelected: boolean = true;

  private _unsubscriber: Subject<void> = new Subject<void>()

  constructor() {
  }

  ngOnInit(): void {
    this.cashInput.valueChanges
      .pipe(
        map(value => value.replace(',', '.').replace(/[^.\d]/g, '')),
        map((value: string) => {
          if (value.includes('.')) {
            let temp = value[0] === '.' ? ('0' + value).split('.') : value.split('.');

            return temp.shift() + '.' + temp.join('');
          }
          return value;
        }),
        tap(value => this.cashInput.patchValue(value, { emitEvent: false })),
        takeUntil(this._unsubscriber)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }
}
