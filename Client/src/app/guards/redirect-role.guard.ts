import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../modules/shared/authentification/services/auth.service";

@Injectable()
export class RedirectRoleGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this._authService.isAuthenticated('User')) {
      this._router.navigate(['auth/converter']);
      return false;
    }
    if (this._authService.isAuthenticated('Admin')) {
      this._router.navigate(['admin/converter']);
      return false;
    }
    this._router.navigate(['converter']);
    return true;
  }

}
