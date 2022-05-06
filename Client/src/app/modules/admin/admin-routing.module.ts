import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterModule } from "../shared/converter/converter.module";
import { MapModule } from "../shared/map/map.module";
import { NewsModule } from "../shared/news/news.module";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { CreateNewsModule } from "./create-news/create-news.module";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'converter',
        loadChildren: (): Promise<ConverterModule> => import('../shared/converter/converter.module')
          .then(m => m.ConverterModule),
      },
      {
        path: 'map',
        loadChildren: (): Promise<MapModule> => import('../shared/map/map.module')
          .then(m => m.MapModule),
      },
      {
        path: 'news',
        loadChildren: (): Promise<NewsModule> => import('../shared/news/news.module')
          .then(m => m.NewsModule),
      },
      {
        path: 'createNews',
        loadChildren: (): Promise<CreateNewsModule> => import('./create-news/create-news.module')
          .then(m => m.CreateNewsModule),
      },
      {
        path: 'userList',
        loadChildren: (): Promise<CreateNewsModule> => import('./user-list/user-list.module')
          .then(m => m.UserListModule),
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
