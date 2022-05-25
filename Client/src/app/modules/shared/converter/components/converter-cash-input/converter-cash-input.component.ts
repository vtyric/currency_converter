import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { map, Subject, takeUntil, tap } from 'rxjs';
import { ICurrencyDescription } from '../../../shared/interfaces';
import { ConverterFormService } from '../../services';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-converter-cash-input',
    templateUrl: './converter-cash-input.component.html',
})
export class ConverterCashInputComponent implements OnInit, OnDestroy {

    @Input()
    public title!: string;
    @Input()
    public currencies!: string[];
    @Input()
    public currencyDescription!: ICurrencyDescription;
    @Input()
    public position!: 'left' | 'right';
    @Output()
    public dropdownMenu: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

    public isInputSelected: boolean = false;
    public formControl!: FormControl;

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _converterFormService: ConverterFormService,
    ) {
    }

    public ngOnInit(): void {
        this.formControl = this._converterFormService.getInputByPosition(this.position);

        this.formControl.valueChanges
            .pipe(
                map((value: string) => this._converterFormService.removeCommas(value)),
                map((value: string) => this._converterFormService.makeValueStartWithZero(value)),
                tap((value: string) => this._converterFormService
                    .getInputByPosition(this.position)
                    .patchValue(value, { emitEvent: false })
                ),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }
}
