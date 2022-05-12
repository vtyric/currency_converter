import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { ICurrencyDescription } from '../../../shared/interfaces';

@Component({
    selector: 'app-converter-cash-input',
    templateUrl: './converter-cash-input.component.html',
})
export class ConverterCashInputComponent implements OnInit, OnDestroy {

    @Input()
    public title!: string;
    @Input()
    public allCurrencies!: string[];
    @Input()
    public currencyDescription!: ICurrencyDescription[];
    @Input()
    public cashInput!: FormControl;
    @Input()
    public currencySubject!: Subject<string>;
    @Input()
    public mainCurrencies!: string[];
    @Input()
    public currentCurrency!: string;
    @Input()
    public hiddenCurrenciesSubject!: Subject<string>;
    @Input()
    public isToggleOpen!: Subject<boolean>;
    @Output()
    public dropDownMenu: EventEmitter<ElementRef<HTMLDivElement>> = new EventEmitter<ElementRef<HTMLDivElement>>();
    public isInputSelected: boolean = false;

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor() {
    }

    public ngOnInit(): void {
        this.cashInput.valueChanges
            .pipe(
                map((value: string) => value.replace(',', '.').replace(/[^.\d]/g, '')),
                map((value: string) => {
                    if (value.includes('.')) {
                        const temp: string[] = value[0] === '.' ? ('0' + value).split('.') : value.split('.');

                        return temp.shift() + '.' + temp.join('');
                    }

                    return value;
                }),
                tap((value: string) => this.cashInput.patchValue(value, { emitEvent: false })),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }
}
