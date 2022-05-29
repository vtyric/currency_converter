import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NotificationService } from './services/notification.service';
import { ErrorService } from './services/error.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private _notificationService: NotificationService,
        private _errorService: ErrorService,
    ) {
    }

    /**
     * В зависимости от ошибки создает всплывающее окно.
     * @param {Error | HttpErrorResponse} error
     */
    public handleError(error: Error | HttpErrorResponse): void {
        if (error instanceof HttpErrorResponse) {
            this._notificationService.showError(this._errorService.getServerErrorMessage(error));

            return;
        }
        this._notificationService.showError(this._errorService.getClientErrorMessage(error));
    }

}