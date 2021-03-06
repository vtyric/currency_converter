import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterModule } from '../shared/converter/converter.module';
import { MapModule } from '../shared/map/map.module';
import { NewsModule } from '../shared/news/news.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CreateNewsModule } from './news-exchange/create-news/create-news.module';
import { NewsExchangeModule } from './news-exchange/news-exchange.module';

const routes: Routes = [
    {
        path: '',
        component: AdminLayoutComponent,
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
            }, {
                path: 'newsExchange',
                loadChildren: (): Promise<NewsExchangeModule> => import('./news-exchange/news-exchange.module')
                    .then((m: any) => m.NewsExchangeModule),
            },
            {
                path: 'userList',
                loadChildren: (): Promise<CreateNewsModule> => import('./user-list/user-list.module')
                    .then((m: any) => m.UserListModule),
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'converter'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {
}
