import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPageComponent } from './news-page.component';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';
import { NewsService } from './services/news.service';
import '@angular/common/locales/global/ru';
import { NewsDescriptionModule } from '../news-description/news-description.module';
import { InfinityScrollDirective } from './directives/infinity-scroll.directive';
import { PipesModule } from '../pipes/pipes.module';
import { CommentsModule } from '../comments/comments.module';


@NgModule({
    declarations: [
        NewsPageComponent,
        NewsComponent,
        InfinityScrollDirective,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: NewsPageComponent,
            },
            {
                path: ':id',
                loadChildren: (): Promise<NewsDescriptionModule> => import('../news-description/news-description.module')
                    .then((m: any) => m.NewsDescriptionModule),
            }
        ]),
        PipesModule,
        CommentsModule,
    ],
    providers: [
        NewsService,
        { provide: LOCALE_ID, useValue: 'ru' }
    ]
})
export class NewsModule {
}
