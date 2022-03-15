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
  public allCurrencies!: string[];
  @Output()
  public cash: FormControl = new FormControl('');
  @Output()
  public selectedCurrency!: string | null;
  public isInputSelected: boolean = false;
  public mainCurrencies: string[] = ['RUB', 'USD', 'GBP', 'CNY'];

  @ViewChild('mainButtons')
  private mainButtons!: ElementRef;
  private currentTargetButton!: EventTarget | null;

  constructor(private renderer: Renderer2) {
  }

  public onMainButtonClick(target: EventTarget | null, currency: string): void {
    if (!this.currentTargetButton) {
      this.currentTargetButton = this.mainButtons.nativeElement.children[0];
    }
    this.changeClasses(this.currentTargetButton, 'btn-success', 'btn-outline-secondary');
    this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    this.selectedCurrency = currency;
    this.currentTargetButton = target;
  }

  public onAdditionalButtonClick(currency: string): void {
    console.log(currency);
  }

  private changeClasses(target: EventTarget | null, removeClass: string, addClass: string): void {
    this.renderer.removeClass(target, removeClass);
    this.renderer?.addClass(target, addClass);
  }

  ngOnInit(): void {
    this.selectedCurrency = this.mainCurrencies[0];

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
