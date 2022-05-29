import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalErrorHandler } from './global-error-handler';
import { ErrorService } from './services/error.service';
import { NotificationService } from './services/notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports: [
        CommonModule,
        MatSnackBarModule
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: GlobalErrorHandler,
        },
        ErrorService,
        NotificationService,
    ]
})
export class GlobalErrorHandlerModule {

}