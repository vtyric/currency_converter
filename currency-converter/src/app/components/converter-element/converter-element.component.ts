import {Component, ElementRef, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';
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
  public currencies!: string[];
  @Output()
  public cash: FormControl = new FormControl('');
  @Output()
  public selectedCurrency!: string;
  public isInputSelected: boolean = false;

  @ViewChild('switcher')
  private switcher!: ElementRef;
  private currentTargetButton!: EventTarget | null;

  constructor(private renderer: Renderer2) {
  }

  public onButtonClick(target: EventTarget | null, currency: string): void {
    if (!this.currentTargetButton) {
      this.currentTargetButton = this.switcher.nativeElement.children[0];
    }
    this.changeClasses(this.currentTargetButton, 'btn-success', 'btn-outline-secondary');
    this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    this.selectedCurrency = currency;
    this.currentTargetButton = target;
  }

  private changeClasses(target: EventTarget | null, removeClass: string, addClass: string): void {
    this.renderer.removeClass(target, removeClass);
    this.renderer.addClass(target, addClass);
  }

  ngOnInit(): void {
    this.selectedCurrency = this.currencies[0];

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
