import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ConverterTogglePosition, DropdownToggle} from "../../types";
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
  public mainCurrencies!: string[];
  @Input()
  public elementPosition!: ConverterTogglePosition;
  @Input()
  public cash!: FormControl;
  @Input()
  public currencySubject!: Subject<string>;
  @Input()
  public currency!: string;

  @Output()
  public isDropdownToggle: EventEmitter<DropdownToggle> = new EventEmitter<DropdownToggle>();
  @Output()
  public dropDownMenuOutput: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  public isInputSelected: boolean = true;

  constructor() {
  }

  public dropDownToggle(dropDownToggle: DropdownToggle): void {
    this.isDropdownToggle.emit(dropDownToggle);
  }

  public dropdownMenu(dropDownMenu: ElementRef) {
    this.dropDownMenuOutput.emit(dropDownMenu);
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
