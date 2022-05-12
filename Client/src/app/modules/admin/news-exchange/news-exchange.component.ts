import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-news-exchange',
    templateUrl: './news-exchange.component.html',
    styleUrls: ['./styles/news-exchange.component.scss']
})
export class NewsExchangeComponent implements OnInit {

    public selectedItemId!: string;
    public items: Array<{ id: 'createNews' | 'updateNews', label: string }> = [
        {
            id: 'createNews',
            label: 'Добавить новость'
        },
        {
            id: 'updateNews',
            label: 'Обновить новость'
        }
    ];

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _router: Router) {
        this.updateCurrentElement(_router.url);
    }

    public ngOnInit(): void {
        this._router.events
            .pipe(
                filter((event: any) => event instanceof NavigationEnd),
                tap(
                    (event: NavigationEnd) => {
                        this.updateCurrentElement((event as NavigationEnd).url);
                    },
                ),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    /**
     * Обновляет элемент, делает его текущим при нажатии на кнопку.
     * @param {"createNews" | "updateNews"} current
     */
    public onButtonClick(current: 'createNews' | 'updateNews'): void {
        this.selectedItemId = current;
    }

    /**
     * Обновляет текущий элемент, в зависимости от изменения текущего маршрута.
     * @param {string} url
     * @private
     */
    private updateCurrentElement(url: string): void {
        const splitUrl: string[] = url.split('/');

        this.selectedItemId = splitUrl[splitUrl.length - 1] === 'createNews' || splitUrl[splitUrl.length - 1] === 'updateNews'
            ? splitUrl[splitUrl.length - 1]
            : 'createNews';
    }

}
