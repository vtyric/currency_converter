import {Component, OnDestroy, OnInit} from '@angular/core';
import {YaReadyEvent} from "angular8-yandex-maps";
import {Converter} from "../../interfaces";
import {CurrencyService} from "../../services/currency.service";
import {Subscription, tap} from "rxjs";

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.scss']
})
export class MapPageComponent implements OnInit, OnDestroy {

  public converters!: Converter[];

  private map!: ymaps.Map;
  private objectManagerTarget!: ymaps.ObjectManager;
  private subscriptions: Subscription[] = [];

  constructor(private currencyServer: CurrencyService) {
  }

  ngOnInit() {
    let temp = localStorage.getItem('converters');

    if (temp) {
      this.converters = JSON.parse(temp);
    } else {
      this.subscriptions.push(
        this.currencyServer.getConvertersGeoData(20)
          .pipe(
            tap(value => {
              this.converters = value.slice(0, 7);
              localStorage.setItem('converters', JSON.stringify(this.converters));
            }))
          .subscribe()
      );
    }

    if (this.objectManagerTarget) {
      this.converters.forEach(c => this.addBalloons(c.id, c.title, c.description, [c.latitude, c.longitude]));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public onMapReady(event: YaReadyEvent<ymaps.Map>,): void {
    this.map = event.target;
    this.map.controls.remove('searchControl');
    this.map.controls.remove('geolocationControl');
    this.map.controls.remove('trafficControl');
  }

  public onObjectManagerReady({target}: YaReadyEvent<ymaps.ObjectManager>): void {
    this.objectManagerTarget = target;
    this.converters?.forEach(c => this.addBalloons(c.id, c.title, c.description, [c.latitude, c.longitude]));
  }

  public onConverterClick(coordinates: [number, number]): void {
    this.map.setCenter(coordinates);
  }

  private addBalloons(id: number, title: string, description: string, coordinates: [number, number]): void {
    this.objectManagerTarget.add({
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
