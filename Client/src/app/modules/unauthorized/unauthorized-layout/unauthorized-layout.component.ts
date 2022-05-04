import { Component } from '@angular/core';
import { ILayoutButtons } from "../../shared/shared/interfaces";
import { AbstractLayoutComponent } from "../../shared/shared/layout/abstract-layout.component";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/authentification/services/auth.service";

@Component({
  selector: 'unauthorized-layout',
  templateUrl: './unauthorized-layout.component.html',
})
export class UnauthorizedLayoutComponent extends AbstractLayoutComponent {

  public override mainButtonsId: string[] = ['converter', 'map', 'news'];
  public override buttons: { [index: string]: ILayoutButtons } =
    {
      ['converter']: {label: 'Главная', routerLink: '/converter', selected: true},
      ['map']: {label: 'Где обменять', routerLink: '/map', selected: false},
      ['news']: {label: 'Новости', routerLink: '/news', selected: false},
      ['login']: {label: 'Войти', routerLink: '/login', selected: false},
    };

  constructor(router: Router, authService: AuthService) {
    super(router, authService);
  }
}