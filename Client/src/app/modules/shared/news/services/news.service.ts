import { Injectable } from '@angular/core';
import { INews, INewsMenuItem } from '../interfaces';
import { BlogNewsType } from '../types';
import { NewsRequestService } from './news-request.service';
import { tap } from 'rxjs';

@Injectable()
export class NewsService {

    public readonly newsMenuItems: INewsMenuItem[] = [
        {
            label: 'Новости',
            filter: 'news',
        },
        {
            label: 'Посты',
            filter: 'post',
        },
        {
            label: 'Всё подряд',
            filter: null,
        },
    ];
    public filter: BlogNewsType = 'news';

    private readonly _news: INews[] = [];
    private readonly _newsRequestStep: number = 5;

    constructor(private _newsRequestService: NewsRequestService) {
        this._newsRequestService.getAllNews()
            .pipe(
                tap((news: INews[]) => {
                    this.addNews(news);
                }),
            )
            .subscribe();
    }

    /**
     * Загружает новые новости, когда filter='news', добавляет их в коллекцию.
     */
    public getNewsByRequest(): void {
        if (this.filter === 'news') {
            this._newsRequestService.start = this._newsRequestService.limit;
            this._newsRequestService.limit += this._newsRequestStep;

            this._newsRequestService.getNews()
                .pipe(
                    tap((news: INews[]) => this.addNews(news))
                )
                .subscribe();
        }
    }

    /**
     * Возвращает все новости с каким то фильтром.
     * @return { INews[] }
     */
    public getNews(): INews[] {
        return this.filter ? this._news.filter((n: INews) => n.type === this.filter) : this._news;
    }

    /**
     * Добавляет новые новости.
     * @param {INews[]} news
     * @private
     */
    private addNews(news: INews[]): void {
        this._news.push(...news);
        this._news.sort((a: INews, b: INews) => b.postCreationDate.getTime() - a.postCreationDate.getTime());
    }
}
