import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ConverterTogglePosition, DropdownToggle} from "../../types";

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
  public inputValue!: EventEmitter<number>;

  @Output()
  public isDropdownToggle: EventEmitter<DropdownToggle> = new EventEmitter<DropdownToggle>();
  @Output()
  public selectedCurrency: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public dropDownMenuOutput: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();
  @Output()
  public value: EventEmitter<string> = new EventEmitter<string>();

  public isInputSelected: boolean = false;
  public cash: FormControl = new FormControl('');

  constructor() {
  }

  public getValue(value: number): void {
    this.cash.setValue(value.toString());
  }

  public onCurrencyChange(currency: string): void {
    this.selectedCurrency.emit(currency);
  }

  public dropDownToggle(dropDownToggle: DropdownToggle): void {
    this.isDropdownToggle.emit(dropDownToggle);
  }

  public dropdownMenu(dropDownMenu: ElementRef) {
    this.dropDownMenuOutput.emit(dropDownMenu);
  }

  ngOnInit(): void {
    this.selectedCurrency.emit(this.mainCurrencies[0]);

    this.inputValue?.subscribe(value => {
      if (!this.isInputSelected) {
        this.cash.patchValue(!value ? "" : value.toString(), {emitEvent: false});
        this.value.emit(!value ? "" : value.toString());
      }
    })

    this.cash.valueChanges
      .subscribe((value: string) => {
        let res = value.replace(',', '.').replace(/[^.\d]/g, '');

        if (res.includes('.')) {
          let temp = res[0] === '.' ? ("0" + res).split('.') : res.split('.');
          res = temp.shift() + '.' + temp.join("");
        }

        this.cash.patchValue(res, {emitEvent: false});
        this.value.emit(res);
      });
  }
}
