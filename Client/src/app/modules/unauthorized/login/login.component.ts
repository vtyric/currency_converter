import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../shared/authentification/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IDecodedToken } from '../../shared/authentification/interfaces';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {

    public form!: FormGroup;

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _authService: AuthService,
        private _router: Router,
    ) {
    }

    public ngOnInit(): void {
        this.form = new FormGroup({
            login: new FormControl(null, [
                Validators.required,
                Validators.minLength(4),
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
            ]),
        });
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    /**
     * Метод отправляющий форму логина.
     * @param event
     */
    public onSubmitButtonClick(event: Event): void {
        event.preventDefault();
        this._authService
            .login(this.form.value.login, this.form.value.password)
            .pipe(
                tap((value: IDecodedToken) => {
                    this.form.reset();
                    this._router.navigate([value.role === 'Admin' ? 'admin' : 'auth', 'converter']);
                }),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }
}
