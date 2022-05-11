import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConverterModule } from "../shared/converter/converter.module";
import { MapModule } from "../shared/map/map.module";
import { NewsModule } from "../shared/news/news.module";
import { AuthorizedLayoutComponent } from "./authorized-layout/authorized-layout.component";

const routes: Routes = [
  {
    path: '',
    component: AuthorizedLayoutComponent,
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
export class AuthorizedRoutingModule {
}
