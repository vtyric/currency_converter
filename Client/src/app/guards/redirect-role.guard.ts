import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../modules/shared/authentification/services/auth.service';
import { Role } from '../modules/shared/authentification/enums';

@Injectable()
export class RedirectRoleGuard implements CanActivate {
    constructor(
        private _router: Router,
        private _authService: AuthService,
    ) {
    }

    /**
     * Метод определяющий, какую страницу показывать при запуске приложения.
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {boolean}
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const currentUserRole: Role | null = this._authService.getCurrentUserRole();

        if (currentUserRole === Role.user) {
            this._router.navigate(['user/converter']);

            return false;
        }
        if (currentUserRole === Role.admin) {
            this._router.navigate(['admin/converter']);

            return false;
        }
        this._router.navigate(['converter']);

        return true;
    }

}
