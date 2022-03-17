import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

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
  @Output()
  public cash: FormControl = new FormControl('');
  @Output()
  public isDropdownToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public selectedCurrency: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public dropDownMenuOutput: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  public isInputSelected: boolean = false;

  constructor() {
  }

  public onCurrencyChange(currency: string): void {
    this.selectedCurrency.emit(currency);
  }

  public dropDownToggle(dropDownToggle: boolean): void {
    this.isDropdownToggle.emit(dropDownToggle);
  }

  public dropdownMenu(dropDownMenu: ElementRef) {
    this.dropDownMenuOutput.emit(dropDownMenu);
  }

  ngOnInit(): void {
    this.selectedCurrency.emit(this.mainCurrencies[0]);

    this.cash.valueChanges
      .subscribe((value: string) => {
        let res = value.replace(',', '.').replace(/[^.\d]/g, '');

        if (res.includes('.')) {
          let temp = res[0] === '.' ? ("0" + res).split('.') : res.split('.');
          res = temp.shift() + '.' + temp.join("");
        }

        this.cash.patchValue(res, {emitEvent: false});
      });
  }
}
