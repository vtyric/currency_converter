import { Component, OnDestroy, OnInit } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Subject, takeUntil, tap } from 'rxjs';
import { CurrencyService } from '../shared/services/currency.service';
import { IConverter } from '../shared/interfaces';
import { ConverterMapService } from './services/converter-map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./styles/map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

    public converters!: IConverter[];
    public mapInitialCoordinates: [number, number] = [29.676936, 17.706003];

    private _map!: ymaps.Map;
    private _objectManagerTarget!: ymaps.ObjectManager;
    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _currencyService: CurrencyService,
        private _mapService: ConverterMapService,
    ) {
    }

    public ngOnInit(): void {
        const temp: string | null = localStorage.getItem('converters');

        if (temp) {
            this.converters = JSON.parse(temp);

            return;
        }

        this._currencyService.getConvertersGeoData()
            .pipe(
                tap((converters: IConverter[]) => this.addConverters(converters)),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    /**
     * Метод вызываемый при загрузки карты.
     * @param {YaReadyEvent<ymaps.Map>} event
     */
    public onMapReady({ target }: YaReadyEvent<ymaps.Map>,): void {
        this._map = target;
        this._map.controls.remove('searchControl');
        this._map.controls.remove('geolocationControl');
        this._map.controls.remove('trafficControl');
    }

    /**
     * Метод вызываемый при загрузке оъектов карты
     * @param {ymaps.ObjectManager} target
     */
    public onObjectManagerReady({ target }: YaReadyEvent<ymaps.ObjectManager>): void {
        this._objectManagerTarget = target;
        this._mapService.addAllConvertersToMap(this.converters, target);
    }

    /**
     * Метод, при нажатие на который карта центруется по выбранной компании.
     * @param {[number, number]} coordinates координаты компании
     */
    public onConverterClick(coordinates: [number, number]): void {
        this._map.setCenter(coordinates);
    }

    /**
     * При получение конвертеров добавляет их на карту и в localSorage
     * @param {IConverter[]} converters
     * @private
     */
    private addConverters(converters: IConverter[]): void {
        this.converters = converters.slice(0, 7);
        localStorage.setItem('converters', JSON.stringify(this.converters));
        this._mapService.addAllConvertersToMap(this.converters, this._objectManagerTarget);
    }
}
