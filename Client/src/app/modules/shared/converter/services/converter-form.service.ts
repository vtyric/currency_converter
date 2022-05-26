import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tap } from 'rxjs';

@Injectable()
export class ConverterFormService {

    public leftCurrency!: string;
    public rightCurrency!: string;

    private _leftInput: FormControl = new FormControl(null);
    private _rightInput: FormControl = new FormControl(null);

    constructor() {
    }

    /**
     * Получает нужный контрол в зависимости от позиции.
     * @param {"left" | "right"} position
     * @returns {FormControl}
     */
    public getInputByPosition(position: 'left' | 'right'): FormControl {
        return position === 'left' ? this._leftInput : this._rightInput;
    }

    /**
     * Совершает подписку на события контроллов.
     * @param {Array<[string, number]>} rates
     */
    public updateFormControllers(rates: Array<[string, number]>): void {
        this._leftInput.valueChanges
            .pipe(
                tap((value: string) => {
                    this.updateInputValue(+value, rates, this._rightInput, 'right');
                })
            )
            .subscribe();

        this._rightInput.valueChanges
            .pipe(
                tap((value: string) => {
                    this.updateInputValue(+value, rates, this._leftInput, 'left');
                })
            )
            .subscribe();
    }

    /**
     * Удаляет все запятые, заменяя их на точки. Оставляет только одну точку.
     * @param {string} value
     * @returns {string}
     */
    public removeCommas(value: string): string {
        return value.replace(',', '.').replace(/[^.\d]/g, '');
    }

    /**
     * Когда вводится точка, вначале числа пишется ноль.
     * @param {string} value
     * @returns {string}
     */
    public makeValueStartWithZero(value: string): string {
        if (value.includes('.')) {
            const temp: string[] = value[0] === '.' ? ('0' + value).split('.') : value.split('.');

            return temp.shift() + '.' + temp.join('');
        }

        return value;
    }

    /**
     * Обновляет значение противоположного инпута по заданной формуле в методе.
     * @param {number} value значение инпута
     * @param {[string, number][]} rates массив валют
     * @param {FormControl} control контрол, который нужно обновить
     * @param {'left' | 'right'} controlPosition положение передаваемого контрола
     * @private
     */
    private updateInputValue(value: number, rates: Array<[string, number]>, control: FormControl, controlPosition: 'left' | 'right'): void {
        const leftRate: number = (rates
            ?.find(([currency]: [string, number]) => currency === this.leftCurrency) ?? [])[1] ?? 0;
        const rightRate: number = (rates
            ?.find(([currency]: [string, number]) => currency === this.rightCurrency) ?? [])[1] ?? 0;

        if (controlPosition === 'left') {
            control.patchValue(this.getExchangeResult(value, leftRate, rightRate), { emitEvent: false });
        } else {
            control.patchValue(this.getExchangeResult(value, rightRate, leftRate), { emitEvent: false });
        }
    }

    /**
     * Переводит валюту из firstRate в secondRate.
     * @param {number} value значение инпута, которое изменилось
     * @param {number} firstRate цена противоположной валюты к евро
     * @param {number} secondRate цена текущей валюты к евро
     * @returns {string} измененное значение другого инпута
     * @private
     */
    private getExchangeResult(value: number, firstRate: number, secondRate: number): string {
        return !value ? '' : (value * firstRate / secondRate).toFixed(4);
    }
}