import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { CreateNewsModule } from "./create-news/create-news.module";
import { UpdateNewsModule } from "./update-news/update-news.module";
import { NewsExchangeComponent } from './news-exchange.component';
import { BreadcrumbsComponent } from "../../shared/shared/breadcrumbs/breadcrumbs.component";


@NgModule({
  declarations: [
    NewsExchangeComponent,
    BreadcrumbsComponent
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
                .then(m => m.CreateNewsModule),
            },
            {
              path: 'updateNews',
              loadChildren: (): Promise<UpdateNewsModule> => import('./update-news/update-news.module')
                .then(m => m.UpdateNewsModule),
            }
          ]
        }
      ]
    )
  ]
})
export class NewsExchangeModule {
}
