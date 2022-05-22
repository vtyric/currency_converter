import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateNewsListComponent } from './update-news-list.component';
import { RouterModule } from '@angular/router';
import { NewsPreviewComponent } from './components/news-preview/news-preview.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PipesModule } from '../../../shared/pipes/pipes.module';
import { UpdateNewsModule } from '../update-news/update-news.module';


@NgModule({
    declarations: [
        UpdateNewsListComponent,
        NewsPreviewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: '',
                component: UpdateNewsListComponent
            },
            {
                path: ':id',
                loadChildren: (): Promise<UpdateNewsModule> => import('../update-news/update-news.module')
                    .then((m: any) => m.UpdateNewsModule),
                data: { place: ['Главная', 'Биржа новостей', 'Обновить новость', 'новость'] }
            }
        ]),
        ReactiveFormsModule,
        PipesModule,
    ]
})
export class UpdateNewsListModule {
}
