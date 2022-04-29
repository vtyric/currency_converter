import { ILayoutButtons } from "../interfaces";
import { Router } from "@angular/router";
import { AuthService } from "../../authentification/services/auth.service";

export abstract class AbstractLayoutComponent {
  protected mainButtonsId!: string[];
  protected buttons!: { [index: string]: ILayoutButtons };

  private currentPath!: string;

  protected constructor(
    private _router: Router,
    private _authService: AuthService) {
  }

  /**
   * Делает кнопку активной при нажатии на неё, сохраняя при этом текущий layout.
   * @param {string} id
   */
  public onButtonClick(id: string): void {
    if (id === 'logout') {
      this._authService.logout();
      return;
    }
    const splitedUrl = this._router.url.split('/').filter(s => s !== '');
    if (splitedUrl.includes('auth') || splitedUrl.includes('admin')) {
      this.currentPath = splitedUrl[0];
    }
    this._router.navigate(this.currentPath ? [`${this.currentPath}/${this.buttons[id].routerLink}`] : [this.buttons[id].routerLink]);
    Object.keys(this.buttons).forEach(buttonId => {
      this.buttons[buttonId].selected = buttonId === id;
    });
  }
}
