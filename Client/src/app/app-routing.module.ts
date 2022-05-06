import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedModule } from './modules/unauthorized/unauthorized.module';
import { AuthorizedModule } from './modules/authorized/authorized.module';
import { AdminModule } from './modules/admin/admin.module';
import { AuthGuard } from "./modules/shared/authentification/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/converter',
  },
  {
    path: '',
    loadChildren: (): Promise<UnauthorizedModule> => import('./modules/unauthorized/unauthorized-routing.module')
      .then(m => m.UnauthorizedRoutingModule),
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    data: {role: 'User'},
    loadChildren: (): Promise<AuthorizedModule> => import('./modules/authorized/authorized-routing.module')
      .then(m => m.AuthorizedRoutingModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    data: {role: 'Admin'},
    loadChildren: (): Promise<AdminModule> => import('./modules/admin/admin-routing.module')
      .then(m => m.AdminRoutingModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
