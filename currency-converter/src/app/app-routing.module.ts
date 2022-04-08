import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthorizedModule } from './modules/unauthorized/unauthorized.module';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
