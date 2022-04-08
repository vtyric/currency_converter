import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';


@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: MapComponent}]),
    AngularYandexMapsModule,
  ]
})
export class MapModule {}
