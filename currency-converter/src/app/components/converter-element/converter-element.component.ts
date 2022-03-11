import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-converter-element',
  templateUrl: './converter-element.component.html',
  styleUrls: ['./converter-element.component.scss']
})
export class ConverterElementComponent implements OnInit {

  @Input()
  public title!: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
