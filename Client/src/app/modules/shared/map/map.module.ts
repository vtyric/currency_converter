import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { RouterModule } from '@angular/router';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { ConverterMapService } from './services/converter-map.service';


@NgModule({
    declarations: [
        MapComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([{ path: '', component: MapComponent }]),
        AngularYandexMapsModule,
    ],
    providers: [
        ConverterMapService,
    ]
})
export class MapModule {
}
