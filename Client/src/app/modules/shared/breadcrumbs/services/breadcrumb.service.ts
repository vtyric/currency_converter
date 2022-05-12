import { Injectable } from '@angular/core';

@Injectable()
export class BreadcrumbService {

    private _dictionary: { [index: string]: string } = {
        '': 'Главная',
        '/auth': 'Главная',
        '/admin': 'Главная',
        '/admin/newsExchange': 'Биржа новостей',
        '/admin/newsExchange/createNews': 'Добавить новость',
        '/admin/newsExchange/updateNews': 'Обновить новость',
        '/admin/newsExchange/updateNews/': 'новость'
    };

    constructor() {
    }

    /**
   * Возвращает заранее заготовленное название для текущего маршрута.
   * @param {string} text
   * @return {string | null}
   */
    public getTranslation(text: string): string | null {
        return Object.keys(this._dictionary).includes(text) ? this._dictionary[text] : null;
    }
}
