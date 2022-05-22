import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsDescriptionComponent } from './news-description.component';
import { CommentsModule } from '../comments/comments.module';
import { BreadcrumbsModule } from '../breadcrumbs/breadcrumbs.module';


@NgModule({
    declarations: [
        NewsDescriptionComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: '',
            component: NewsDescriptionComponent,
            data: { place: ['Главная', 'Новости', 'новость'] }
        }]),
        CommentsModule,
        BreadcrumbsModule,
    ],

})
export class NewsDescriptionModule {
}
