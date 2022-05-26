import { Injectable } from '@angular/core';
import { IConverter } from '../../shared/interfaces';

@Injectable()
export class ConverterMapService {

    constructor() {
    }

    public addAllConvertersToMap(converters: IConverter[], objectManager: ymaps.ObjectManager): void {
        converters.forEach((c: IConverter) => this.addBalloons(objectManager, c.id, c.title, c.description, [c.latitude, c.longitude]));
    }

    /**
     * Добавляет балун на яндекс карту.
     * @param {ymaps.ObjectManager} objectManager
     * @param {number} id
     * @param {string} title
     * @param {string} description
     * @param {[number, number]} coordinates
     * @private
     */
    private addBalloons(objectManager: ymaps.ObjectManager, id: number, title: string, description: string, coordinates: [number, number]): void {
        objectManager.add({
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