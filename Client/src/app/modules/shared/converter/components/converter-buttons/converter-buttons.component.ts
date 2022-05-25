import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges,
    ViewChild
} from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { ICurrencyButton } from '../../interfaces';
import { ICurrencyDescription } from '../../../shared/interfaces';
import { ConverterToggleService, CurrencyExchangeService } from '../../services';

@Component({
    selector: 'app-converter-buttons',
    templateUrl: './converter-buttons.component.html',
})
export class ConverterButtonsComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
    @Input()
    public currencies!: string[];
    @Input()
    public currencyDescriptions!: ICurrencyDescription;
    @Input()
    public position!: 'left' | 'right';
    @Output()
    public dropdownMenu: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    public currenciesButtons!: ICurrencyButton[];
    public descriptions: Map<string, string> = new Map<string, string>();

    @ViewChild('dropdownMenu')
    private _dropdownMenu!: ElementRef;
    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _converterToggleService: ConverterToggleService,
        private _currencyExchangeService: CurrencyExchangeService,
    ) {
    }

    public ngOnInit(): void {
        this._currencyExchangeService.getSubjectByPosition(this.position)
            .pipe(
                tap((currency: string) => this.updateCurrencyButtons(currency)),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    public ngAfterViewInit(): void {
        this.dropdownMenu.emit(this._dropdownMenu);
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes['currencyDescriptions']?.currentValue) {
            this.currencyDescriptions = changes['currencyDescriptions']?.currentValue;

            Object.entries(this.currencyDescriptions)?.forEach(([currency, description]: [string, string]) => {
                this.descriptions.set(currency, description);
            });

            this.currenciesButtons = this._currencyExchangeService.getCurrenciesByPosition(this.position)
                .map((currency: string) =>
                    ({
                        selected: currency === this._currencyExchangeService.getCurrencyByPosition(this.position),
                        name: currency,
                        description: this.descriptions.get(currency) ?? '',
                    }));
        }
    }

    /**
     * Метод нажатия на кнопку, выбирает валюты.
     * @param {string} targetCurrency приходящая валюта
     * @param {'hidden' | 'main'} type вид кнопки
     */
    public onButtonClick(targetCurrency: string, type: 'hidden' | 'main'): void {
        this.updateToggle(false);

        if (type === 'main') {
            this._currencyExchangeService.getSubjectByPosition(this.position).next(targetCurrency);
        } else {
            this._currencyExchangeService.getHiddenCurrenciesSubject().next(targetCurrency);
        }
    }

    /**
     * Метод нажатия на открывающую панель, открывает или закрывает её.
     */
    public onToggleButtonClick(): void {
        this.updateToggle(true);
    }

    /**
     * Обновляет состояние переключателя в зависимости от его позиции.
     * @param {boolean} state
     * @private
     */
    private updateToggle(state: boolean): void {
        if (this.position === 'left') {
            this._converterToggleService.isLeftToggleOpen.next(state);
        } else {
            this._converterToggleService.isRightToggleOpen.next(state);
        }
    }

    /**
     * Добавляет валюту в список, делая её текущей.
     * @param {string} targetCurrency
     * @private
     */
    private updateCurrencyButtons(targetCurrency: string): void {
        if (!this.currenciesButtons.some((currencyButton: ICurrencyButton) => currencyButton.name === targetCurrency)) {
            this.currenciesButtons[this.currenciesButtons.length - 1].name = targetCurrency;
            this.currenciesButtons[this.currenciesButtons.length - 1].description = this.descriptions.get(targetCurrency) ?? '';
        }
        this.currenciesButtons.forEach((currency: ICurrencyButton, index: number) => {
            this.currenciesButtons[index].selected = currency.name === targetCurrency;
        });
    }
}
