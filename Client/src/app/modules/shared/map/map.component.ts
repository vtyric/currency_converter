import { Component, OnDestroy, OnInit } from '@angular/core';
import { YaReadyEvent } from 'angular8-yandex-maps';
import { Subject, takeUntil, tap } from 'rxjs';
import { CurrencyService } from '../shared/services/currency.service';
import { IConverter } from '../shared/interfaces';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./styles/map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

    public converters!: IConverter[];

    private _map!: ymaps.Map;
    private _objectManagerTarget!: ymaps.ObjectManager;
    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(private _currencyServer: CurrencyService) {
    }

    public ngOnInit(): void {
        const temp: string | null = localStorage.getItem('converters');

        if (temp) {
            this.converters = JSON.parse(temp);
        } else {
            this._currencyServer.getConvertersGeoData(20)
                .pipe(
                    tap((value: IConverter[]) => {
                        this.converters = value.slice(0, 7);
                        localStorage.setItem('converters', JSON.stringify(this.converters));
                    }),
                    takeUntil(this._unsubscriber)
                )
                .subscribe();
        }

        if (this._objectManagerTarget) {
            this.converters.forEach((c: IConverter) => this.addBalloons(c.id, c.title, c.description, [c.latitude, c.longitude]));
        }
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }

    /**
     * Метод вызываемый при загрузки карты.
     * @param {YaReadyEvent<ymaps.Map>} event
     */
    public onMapReady(event: YaReadyEvent<ymaps.Map>,): void {
        this._map = event.target;
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
        this.converters?.forEach((c: IConverter) => this.addBalloons(c.id, c.title, c.description, [c.latitude, c.longitude]));
    }

    /**
     * Метод, при нажатие на который карта центруется по выбранной компании.
     * @param {[number, number]} coordinates координаты компании
     */
    public onConverterClick(coordinates: [number, number]): void {
        this._map.setCenter(coordinates);
    }

    /**
     * Добавляет балун на яндекс карту.
     * @param {number} id
     * @param {string} title hintContent
     * @param {string} description balloonContent
     * @param {[number, number]} coordinates
     * @private
     */
    private addBalloons(id: number, title: string, description: string, coordinates: [number, number]): void {
        this._objectManagerTarget.add({
            type: 'Feature',
            id: id,
            geometry: {
                type: 'Point',
                coordinates: coordinates
            },
            properties: {
                hintContent: title,
                balloonContent: description
            }
        });
    }
}
