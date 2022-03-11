import {Component, Input, OnInit, Output} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-converter-element',
  templateUrl: './converter-element.component.html',
  styleUrls: ['./converter-element.component.scss']
})
export class ConverterElementComponent implements OnInit {

  @Input()
  public title!: string;
  @Output()
  public value: FormControl = new FormControl('', [Validators.pattern(/\d/)]);

  constructor() {
  }

  ngOnInit(): void {
  }

}
