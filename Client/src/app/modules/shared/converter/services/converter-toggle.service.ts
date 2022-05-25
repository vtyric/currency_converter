import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable()
export class ConverterToggleService {

    public isLeftToggleOpen: Subject<boolean> = new Subject<boolean>();
    public isRightToggleOpen: Subject<boolean> = new Subject<boolean>();
    public lastTogglePosition!: 'left' | 'right';

    private _dropdownMenu!: ElementRef<HTMLDivElement>;
    private _renderer!: Renderer2;
    private _isLeftToggleOpen: boolean = false;
    private _isRightToggleOpen: boolean = false;

    constructor(
        rendererFactory: RendererFactory2,
    ) {
        this._renderer = rendererFactory.createRenderer(null, null);

        this.isRightToggleOpen
            .pipe(
                tap((isRightToggleOpen: boolean) => {
                    this.isToggleOpen(isRightToggleOpen, 'right');
                }),
            )
            .subscribe();

        this.isLeftToggleOpen
            .pipe(
                tap((isLeftToggleOpen: boolean) => {
                    this.isToggleOpen(isLeftToggleOpen, 'left');
                }),
            )
            .subscribe();
    }

    /**
     * Обновляет текущее меню.
     * @param {ElementRef<HTMLDivElement>} dropdownMenu
     */
    public updateDropdownMenu(dropdownMenu: ElementRef<HTMLDivElement>): void {
        this._dropdownMenu = dropdownMenu;
    }

    /**
     * В зависимости от расположения переключателя, изменяет его текущее состояние.
     * @param {boolean} isToggleOpen
     * @param {"left" | "right"} togglePosition
     * @private
     */
    private isToggleOpen(isToggleOpen: boolean, togglePosition: 'left' | 'right'): void {
        if (togglePosition === 'left') {
            this._isLeftToggleOpen = isToggleOpen && this._isLeftToggleOpen !== isToggleOpen;
            this._isRightToggleOpen = false;
            isToggleOpen = this._isLeftToggleOpen;
        } else {
            this._isRightToggleOpen = isToggleOpen && this._isRightToggleOpen !== isToggleOpen;
            this._isLeftToggleOpen = false;
            isToggleOpen = this._isRightToggleOpen;
        }
        this.lastTogglePosition = isToggleOpen ? togglePosition : this.lastTogglePosition;
        this.changeDropDownState(isToggleOpen);
    }

    /**
     * Открывает или закрывает окно со скрытыми валютами.
     * @param isOpen открыто или закрыто дополнительное окно
     * @private
     */
    private changeDropDownState(isOpen: boolean): void {
        if (isOpen) {
            this._renderer.addClass(this._dropdownMenu.nativeElement, 'show');
        } else {
            this._renderer.removeClass(this._dropdownMenu.nativeElement, 'show');
        }
    }
}