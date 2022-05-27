import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NewsService } from './services/news.service';
import { BlogNewsType } from './types';
import { Router } from '@angular/router';
import { INews, INewsMenuItem } from './interfaces';

@Component({
    selector: 'app-news-page',
    templateUrl: './news-page.component.html',
    styleUrls: ['./styles/news-page.component.scss']
})
export class NewsPageComponent {

    public newsMenuItems!: INewsMenuItem[];

    private _selectedMenuItem!: EventTarget | null;
    @ViewChild('menu')
    private _menu!: ElementRef;

    constructor(
        private _newsService: NewsService,
        private _renderer: Renderer2,
        private _router: Router,
    ) {
        this.newsMenuItems = this._newsService.newsMenuItems;
    }

    /**
     * Отдает новости, которые есть в NewsService.
     * @returns {INews[]}
     */
    public getNews(): INews[] {
        return this._newsService.getNews();
    }

    /**
     * События происходящее при нажатии на меню. Фильтрация по типу новости.
     * @param menuItem элемент на который нажали
     * @param filter фильтер, который выбирается при нажатии на кнопку
     */
    public onMenuButtonClick(menuItem: EventTarget | null, filter: BlogNewsType): void {
        this._newsService.filter = filter;
        this._renderer.removeClass(this._selectedMenuItem ?? this._menu.nativeElement.children[0], 'selected');
        this._renderer.addClass(menuItem, 'selected');
        this._selectedMenuItem = menuItem;
    }

    /**
     * Метод при нажатии на новость, переход к ее описанию.
     * @param id страницы
     */
    public onNewsClick(id: number): void {
        this._router.navigate([this._router.url, id]);
    }

}
