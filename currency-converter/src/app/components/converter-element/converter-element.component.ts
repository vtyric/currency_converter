import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";
import {ConverterTogglePosition, DropdownToggle} from "../../types";
import {Subject} from "rxjs";

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
  public currency!: Subject<string>;

  @Output()
  public isDropdownToggle: EventEmitter<DropdownToggle> = new EventEmitter<DropdownToggle>();
  @Output()
  public dropDownMenuOutput: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();
  @Output()
  public isInputSelectedOutput: EventEmitter<boolean> = new EventEmitter<boolean>();

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
    this.currency.next(this.mainCurrencies[0]);

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
