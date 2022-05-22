import { ILayoutButtons } from '../interfaces';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../../authentification/services/auth.service';
import { Role } from '../../authentification/enums';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';

export abstract class AbstractLayoutComponent {
    protected mainButtonsId!: string[];
    protected buttons!: Map<string, ILayoutButtons>;
    protected unsubscriber: Subject<void> = new Subject<void>();

    protected constructor(
        private _router: Router,
        private _authService: AuthService) {
        this._router.events
            .pipe(
                filter((event: any) => event instanceof NavigationEnd),
                map((event: NavigationEnd) => this.getButtonIdByUrl(event.urlAfterRedirects)),
                tap((id: string | null) => {
                    if (id !== null) {
                        this.updateCurrentButtons(id);
                    }
                }),
                takeUntil(this.unsubscriber)
            )
            .subscribe();
    }

    /**
     * Делает кнопку активной при нажатии на неё, совершает переход на нужный маршрут.
     * @param {string} id
     */
    public onButtonClick(id: string): void {
        if (id === 'logout') {
            this._authService.logout();

            return;
        }
        const userRole: Role | null = this._authService.getCurrentUserRole();

        this._router.navigate(userRole !== null
            ? [`${ userRole.toLowerCase() }/${ this.buttons.get(id)?.routerLink }`]
            : [this.buttons.get(id)?.routerLink]
        );
    }

    /**
     * Возвращет buttonId по текущему маршруту.
     * @param {string} url
     * @returns {string | null}
     * @private
     */
    private getButtonIdByUrl(url: string): string | null {
        const splitUrl: string[] = url.split('/');

        if (Array(...this.buttons.keys()).some((key: string) => key === splitUrl[splitUrl.length - 1])) {
            return splitUrl[splitUrl.length - 1];
        }

        return null;
    }

    /**
     * Обновляет selected у всех кнопок.
     * @param {string} selectedButtonId
     * @private
     */
    private updateCurrentButtons(selectedButtonId: string): void {
        Array(...this.buttons.entries()).forEach(([buttonId, button]: [string, ILayoutButtons]) => {
            this.buttons.set(buttonId, {
                label: button.label,
                routerLink: button.routerLink,
                selected: buttonId === selectedButtonId
            });
        });
    }
}
