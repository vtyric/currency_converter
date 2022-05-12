import { Component } from '@angular/core';
import { AbstractLayoutComponent } from '../../shared/shared/layout/abstract-layout.component';
import { Router } from '@angular/router';
import { ILayoutButtons } from '../../shared/shared/interfaces';
import { AuthService } from '../../shared/authentification/services/auth.service';

@Component({
    selector: 'app-admin-layout',
    templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent extends AbstractLayoutComponent {

    public override mainButtonsId: string[] = ['converter', 'map', 'news', 'createNews', 'userList'];
    public override buttons: { [index: string]: ILayoutButtons } =
        {
            ['converter']: { label: 'Главная', routerLink: '/converter', selected: true },
            ['map']: { label: 'Где обменять', routerLink: '/map', selected: false },
            ['news']: { label: 'Новости', routerLink: '/news', selected: false },
            ['createNews']: { label: 'Биржа новостей', routerLink: '/newsExchange', selected: false },
            ['userList']: { label: 'Биржа пользователей', routerLink: '/userList', selected: false },
            ['logout']: { label: 'Выйти', routerLink: '/', selected: false },
        };

    constructor(router: Router, authService: AuthService) {
        super(router, authService);
    }

}
