import {Component, Input, OnInit, Output} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-converter-element',
  templateUrl: './converter-element.component.html',
  styleUrls: ['./converter-element.component.scss']
})
export class ConverterElementComponent implements OnInit {

  @Input()
  public title!: string;
  @Output()
  public cash: FormControl = new FormControl('');

  public isInputSelected: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
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
