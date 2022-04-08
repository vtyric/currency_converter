import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthorizedLayoutComponent } from './shared/unauthorized-layout/unauthorized-layout.component';
import { ConverterModule } from '../shared/modules/converter/converter.module';
import { MapModule } from '../shared/modules/map/map.module';
import { NewsModule } from '../shared/modules/news/news.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';


const routes: Routes = [
  {
    path: '',
    component: UnauthorizedLayoutComponent,
    children: [
      {
        path: 'converter',
        loadChildren: (): Promise<ConverterModule> => import('../shared/modules/converter/converter.module')
          .then(m => m.ConverterModule),
      },
      {
        path: 'map',
        loadChildren: (): Promise<MapModule> => import('../shared/modules/map/map.module')
          .then(m => m.MapModule),
      },
      {
        path: 'news',
        loadChildren: (): Promise<NewsModule> => import('../shared/modules/news/news.module')
          .then(m => m.NewsModule),
      },
      {
        path: '',
        loadChildren: (): Promise<AuthenticationModule> => import('../unauthorized/modules/authentication/authentication.module')
          .then(m => m.AuthenticationModule),
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnauthorizedRoutingModule {
}
