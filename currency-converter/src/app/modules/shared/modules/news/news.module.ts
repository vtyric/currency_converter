import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsPageComponent } from './news-page.component';
import { RouterModule } from '@angular/router';
import { NewsComponent } from './components/news/news.component';


@NgModule({
  declarations: [
    NewsPageComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: NewsPageComponent}]),
  ]
})
export class NewsModule {}
