import { Component, OnInit } from '@angular/core';
import { ILayoutButtons } from "../../shared/shared/interfaces";

@Component({
  selector: 'unauthorized-layout',
  templateUrl: './unauthorized-layout.component.html',
  styleUrls: ['./styles/unauthorized-layout.component.scss']
})
export class UnauthorizedLayoutComponent implements OnInit {

  public mainButtonsId: string[] = ['converter', 'map', 'news'];
  public buttons: { [index: string]: ILayoutButtons } =
    {
      ['converter']: {label: 'Главная', routerLink: '/converter', selected: true},
      ['map']: {label: 'Где обменять', routerLink: '/map', selected: false},
      ['news']: {label: 'Новости', routerLink: '/news', selected: false},
      ['login']: {label: 'Войти', routerLink: '/login', selected: false},
    };

  constructor() {
  }

  ngOnInit(): void {
  }

  /**
   * Делает кнопку активной при нажатии на неё.
   * @param {string} id
   */
  public onButtonClick(id: string): void {
    Object.keys(this.buttons).forEach(buttonId => {
      this.buttons[buttonId].selected = buttonId === id;
    });
  }

}
