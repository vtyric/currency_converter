import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../modules/shared/authentification/services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(
        private _authService: AuthService,
        private _router: Router,
    ) {
    }

    /**
     * Метод разрашающий переход по маршруту
     * @param route ActivatedRouteSnapshot
     * @param state RouterStateSnapshot
     * @returns boolean
     */
    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._authService.isAuthenticatedByRole(route.data['role'])) {
            return true;
        }
        this._authService.logout();
        this._router.navigate(['login']);

        return false;
    }

    /** Описание метода в формате JSDoc */
    public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(childRoute, state);
    }

}
