import {Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-converter-top-panel',
  templateUrl: './currency-main-buttons.component.html',
  styleUrls: ['./currency-main-buttons.component.scss']
})
export class CurrencyMainButtonsComponent implements OnInit {

  @Input()
  public mainCurrencies!: string[];
  @Input()
  public allCurrencies!: string[];
  @Output()
  public selectCurrency: EventEmitter<string> = new EventEmitter<string>();

  @ViewChild('mainButtons')
  private mainButtonsPanel!: ElementRef;
  @ViewChild('dropdown')
  private dropdownButton!: ElementRef;
  private currentTargetButton!: EventTarget | null;

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  public onMainButtonClick(target: EventTarget | null, currency: string): void {
    if (!this.currentTargetButton) {
      this.currentTargetButton = this.mainButtonsPanel.nativeElement.children[0];
    }
    if (currency === '' && this.currentTargetButton === target) {
      target = this.mainButtonsPanel.nativeElement.children[0];
    }
    this.changeClasses(this.currentTargetButton, 'btn-success', 'btn-outline-secondary');
    this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    if (currency !== '') {
      this.selectCurrency.emit(currency);
    }
    this.currentTargetButton = target;
  }

  public onDropdownButtonClick(currency: string): void {
    let target = this.mainButtonsPanel.nativeElement.children[this.mainButtonsPanel.nativeElement.children.length - 1];
    target.innerText = currency;
    this.currentTargetButton = target;
    this.changeClasses(this.dropdownButton.nativeElement, 'btn-success', 'btn-outline-secondary');
    this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    this.selectCurrency.emit(currency);
  }

  private changeClasses(target: EventTarget | null, removeClass: string, addClass: string): void {
    this.renderer.removeClass(target, removeClass);
    this.renderer?.addClass(target, addClass);
  }
}
