import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../shared/authentification/services/auth.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IDecodedToken } from '../../shared/authentification/interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {

    public form: FormGroup = new FormGroup({
        login: new FormControl(null, [
            Validators.required,
            Validators.minLength(4),
        ]),
        password: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
        ]),
    });

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _authService: AuthService,
        private _router: Router,
    ) {
    }

    /**
     * Возвращает control password из формы.
     * @returns {AbstractControl | null}
     */
    public get password(): AbstractControl | null {
        return this.form.get('password');
    }

    /**
     * Возвращет control login из формы.
     * @returns {AbstractControl | null}
     */
    public get login(): AbstractControl | null {
        return this.form.get('login');
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    /**
     * Метод отправляющий форму логина.
     * @param {Event} event
     */
    public onSubmitButtonClick(event: Event): void {
        event.preventDefault();
        this._authService
            .login(this.form.value.login, this.form.value.password)
            .pipe(
                tap((value: IDecodedToken) => {
                    this.form.reset();
                    this._router.navigate([value.role.toLowerCase()]);
                }),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }
}
