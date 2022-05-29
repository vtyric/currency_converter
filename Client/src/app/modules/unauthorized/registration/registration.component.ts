import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/authentification/services/auth.service';
import { Router } from '@angular/router';
import { Subject, takeUntil, tap } from 'rxjs';
import { IDecodedToken } from '../../shared/authentification/interfaces';
import { Role } from '../../shared/authentification/enums';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnDestroy {

    public form: FormGroup = new FormGroup({
        login: new FormControl(null, [
            Validators.required,
            Validators.minLength(4),
        ]),
        password: new FormControl(null, [
            Validators.required,
            Validators.minLength(6),
        ]),
        repeatPassword: new FormControl(null, [
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
     * Возвращает repeatPassword password из формы.
     * @returns {AbstractControl | null}
     */
    public get repeatPassword(): AbstractControl | null {
        return this.form.get('repeatPassword');
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
     * Метод отправляющий форму регистрации.
     * @param {Event} event
     */
    public onSubmitButtonClick(event: Event): void {
        event.preventDefault();

        this._authService
            .register(this.form.value.login, this.form.value.password, Role.user)
            .pipe(
                tap((value: IDecodedToken) => {
                    this._router.navigate([value.role.toLowerCase()]);
                    this.form.reset();
                }),
                takeUntil(this._unsubscriber)
            )
            .subscribe();

        this.form.reset();
    }

}
