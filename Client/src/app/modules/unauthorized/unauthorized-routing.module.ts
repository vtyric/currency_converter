import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedLayoutComponent } from './unauthorized-layout/unauthorized-layout.component';
import { ConverterModule } from '../shared/converter/converter.module';
import { MapModule } from '../shared/map/map.module';
import { NewsModule } from '../shared/news/news.module';
import { LoginModule } from './login/login.module';
import { RegistrationModule } from './registration/registration.module';


const routes: Routes = [
    {
        path: '',
        component: UnauthorizedLayoutComponent,
        children: [
            {
                path: 'converter',
                loadChildren: (): Promise<ConverterModule> => import('../shared/converter/converter.module')
                    .then((m: any) => m.ConverterModule),
            },
            {
                path: 'map',
                loadChildren: (): Promise<MapModule> => import('../shared/map/map.module')
                    .then((m: any) => m.MapModule),
            },
            {
                path: 'news',
                loadChildren: (): Promise<NewsModule> => import('../shared/news/news.module')
                    .then((m: any) => m.NewsModule),
            },
            {
                path: 'login',
                loadChildren: (): Promise<LoginModule> => import('./login/login.module')
                    .then((m: any) => m.LoginModule),
            },
            {
                path: 'register',
                loadChildren: (): Promise<RegistrationModule> => import('./registration/registration.module')
                    .then((m: any) => m.RegistrationModule),
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UnauthorizedRoutingModule {
}
