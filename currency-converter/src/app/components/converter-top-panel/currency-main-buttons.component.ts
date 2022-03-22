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
import {ConverterTogglePosition, DropdownToggle} from "../../types";
import {Subject} from "rxjs";

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
  @Input()
  public converterTogglePosition!: ConverterTogglePosition;
  @Input()
  public currentCurrencySubject!: Subject<string>;
  @Input()
  public currency!: string;
  @Input()
  public currencyChange!: EventEmitter<string>;

  @Output()
  public selectedCurrency: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  public isDropdownToggle: EventEmitter<DropdownToggle> = new EventEmitter<DropdownToggle>();
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
    this.dropdownMenuOutput.emit(this.dropdownMenu);

    Array(...this.mainButtonsPanel?.nativeElement.children)
      .forEach((b: HTMLButtonElement) => {
        if (b.innerText === this.currency) {
          this.changeClasses(b, 'btn-outline-secondary', 'btn-success');
          this.currentTargetButton = b;
        }
      });
  }

  ngOnInit(): void {
    this.currentCurrencySubject
      .subscribe(value => {
        Array(...this.mainButtonsPanel.nativeElement.children).forEach((button: HTMLButtonElement) => {
          if (button.innerText === value) {
            this.changeClasses(button, 'btn-outline-secondary', 'btn-success');
          } else {
            this.changeClasses(button, 'btn-success', 'btn-outline-secondary');
          }
        })
      })
  }

  public onMainButtonClick(target: EventTarget | null, currency: string): void {
    this.currentCurrencySubject.next(currency);
    this.isDropdownToggle.emit('');
    this.currentTargetButton = target;
  }

  public onToggleButtonClick(target: EventTarget | null): void {
    // this.isDropdownToggle.emit(this.converterTogglePosition);
    // if (this.currentTargetButton === target) {
    //   target = this.mainButtonsPanel.nativeElement.children[0];
    //   this.isDropdownToggle.emit('');
    // }
    // this.changeClasses(this.currentTargetButton, 'btn-success', 'btn-outline-secondary');
    // this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    // this.currentTargetButton = target;
  }

  public onDropdownButtonClick(currency: string): void {
    // this.isDropdownToggle.emit('');
    // let target = this.mainButtonsPanel.nativeElement.children[this.mainButtonsPanel.nativeElement.children.length - 1];
    // target.innerText = currency;
    // this.currentTargetButton = target;
    // this.changeClasses(this.dropdownButton.nativeElement, 'btn-success', 'btn-outline-secondary');
    // this.changeClasses(target, 'btn-outline-secondary', 'btn-success');
    // this.currentCurrency.next(currency);
  }

  private changeClasses(target: EventTarget | null, removeClass: string, addClass: string): void {
    this.renderer.removeClass(target, removeClass);
    this.renderer.addClass(target, addClass);
  }
}
