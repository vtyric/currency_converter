import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class NotificationService {
    constructor(
        private _snackBar: MatSnackBar,
        private _ngZone: NgZone,
    ) {
    }

    /**
     * Показывает плашку с ошибкой, с каким-то текстом.
     * @param {string} message
     */
    public showError(message: string): void {
        this._ngZone.run(() => {
            this._snackBar.open(message, 'X', {
                panelClass: ['notification-error'],
                duration: 2500,
                verticalPosition: 'top',
            });
        });
    }
}