import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-converter-top-panel',
  templateUrl: './currency-main-buttons.component.html',
  styleUrls: ['./currency-main-buttons.component.scss']
})
export class CurrencyMainButtonsComponent implements OnInit, AfterViewInit {

  @Input()
  public mainCurrencies!: string[];
  @Input()
  public allCurrencies!: string[];
  @Output()
  public selectedCurrency: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public isDropdownToggle: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  public dropdownMenuOutput: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  @ViewChild('mainButtons')
  private mainButtonsPanel!: ElementRef;
  @ViewChild('dropdown')
  private dropdownButton!: ElementRef;
  @ViewChild('dropdownMenu')
  private dropdownMenu!: ElementRef;
  private currentTargetButton!: EventTarget | null;

  constructor(private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.currentTargetButton = this.mainButtonsPanel.nativeElement.children[0];
    this.dropdownMenuOutput.emit(this.dropdownMenu);
  }

  ngOnInit(): void {
  }

  public onMainButtonClick(target: EventTarget | null, currency: string): void {
    this.changeClasses(this.currentTargetButton, 'btn-success', 'btn-outline-secondary');
    this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    this.selectedCurrency.emit(currency);
    this.isDropdownToggle.emit(false);
    this.currentTargetButton = target;
  }

  public onToggleButtonClick(target: EventTarget | null): void {
    this.isDropdownToggle.emit(true);
    if (this.currentTargetButton === target) {
      target = this.mainButtonsPanel.nativeElement.children[0];
      this.isDropdownToggle.emit(false);
    }
    this.changeClasses(this.currentTargetButton, 'btn-success', 'btn-outline-secondary');
    this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    this.currentTargetButton = target;
  }

  public onDropdownButtonClick(currency: string): void {
    this.isDropdownToggle.emit(false);
    let target = this.mainButtonsPanel.nativeElement.children[this.mainButtonsPanel.nativeElement.children.length - 1];
    target.innerText = currency;
    this.currentTargetButton = target;
    this.changeClasses(this.dropdownButton.nativeElement, 'btn-success', 'btn-outline-secondary');
    this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    this.selectedCurrency.emit(currency);
  }

  private changeClasses(target: EventTarget | null, removeClass: string, addClass: string): void {
    this.renderer.removeClass(target, removeClass);
    this.renderer.addClass(target, addClass);
  }
}
