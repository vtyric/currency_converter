import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedModule } from './modules/unauthorized/unauthorized.module';
import { AuthorizedModule } from './modules/authorized/authorized.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthGuard } from './guards/auth.guard';
import { RedirectRoleGuard } from './guards/redirect-role.guard';
import { Role } from './modules/shared/authentification/enums';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '',
        canActivate: [RedirectRoleGuard]
    },
    {
        path: '',
        loadChildren: (): Promise<UnauthorizedModule> => import('./modules/unauthorized/unauthorized-routing.module')
            .then((m: any) => m.UnauthorizedRoutingModule),
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        data: { role: Role.user },
        loadChildren: (): Promise<AuthorizedModule> => import('./modules/authorized/authorized-routing.module')
            .then((m: any) => m.AuthorizedRoutingModule),
    },
    {
        path: 'admin',
        canActivate: [AuthGuard],
        data: { role: Role.admin },
        loadChildren: (): Promise<AdminModule> => import('./modules/admin/admin-routing.module')
            .then((m: any) => m.AdminRoutingModule),
    },
    {
        path: '**',
        redirectTo: '',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
