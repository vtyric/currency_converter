import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateNewsModule } from './create-news/create-news.module';
import { UpdateNewsListModule } from './update-news-list/update-news-list.module';
import { NewsExchangeComponent } from './news-exchange.component';
import { BreadcrumbsModule } from '../../shared/breadcrumbs/breadcrumbs.module';


@NgModule({
    declarations: [
        NewsExchangeComponent,

    ],
    imports: [
        CommonModule,
        RouterModule.forChild(
            [
                {
                    path: '',
                    redirectTo: 'createNews',
                },
                {
                    path: '',
                    component: NewsExchangeComponent,
                    children: [
                        {
                            path: 'createNews',
                            loadChildren: (): Promise<CreateNewsModule> => import('./create-news/create-news.module')
                                .then((m: any) => m.CreateNewsModule),
                        },
                        {
                            path: 'updateNews',
                            loadChildren: (): Promise<UpdateNewsListModule> => import('./update-news-list/update-news-list.module')
                                .then((m: any) => m.UpdateNewsListModule),
                        },
                    ]
                }
            ]
        ),
        BreadcrumbsModule
    ],
})
export class NewsExchangeModule {
}
