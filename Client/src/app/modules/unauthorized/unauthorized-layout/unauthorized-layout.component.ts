import { Component, OnDestroy } from '@angular/core';
import { ILayoutButtons } from '../../shared/shared/interfaces';
import { AbstractLayoutComponent } from '../../shared/shared/layout/abstract-layout.component';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/authentification/services/auth.service';

@Component({
    selector: 'app-unauthorized-layout',
    templateUrl: './unauthorized-layout.component.html',
})
export class UnauthorizedLayoutComponent extends AbstractLayoutComponent implements OnDestroy {

    public override mainButtonsId: string[] = ['converter', 'map', 'news'];
    public override buttons: Map<string, ILayoutButtons> = new Map<string, ILayoutButtons>([
        ['converter', { label: 'Главная', routerLink: '/converter', selected: true }],
        ['map', { label: 'Где обменять', routerLink: '/map', selected: false }],
        ['news', { label: 'Новости', routerLink: '/news', selected: false }],
        ['login', { label: 'Войти', routerLink: '/login', selected: false }],
    ]);

    constructor(router: Router, authService: AuthService) {
        super(router, authService);
    }

    public ngOnDestroy(): void {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
