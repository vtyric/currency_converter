import { Injectable } from '@angular/core';
import { INews, INewsMenuItem } from '../interfaces';
import { BlogNewsType } from '../types';
import { NewsRequestService } from './news-request.service';
import { mergeMap, tap } from 'rxjs';

@Injectable()
export class NewsService {

    public readonly newsMenuItems: INewsMenuItem[] = [
        {
            label: 'Всё подряд',
            filter: null,
        },
        {
            label: 'Новости',
            filter: 'news',
        },
        {
            label: 'Посты',
            filter: 'post',
        },
    ];

    private readonly _news: INews[] = [];
    private readonly _newsAppendStep: number = 2;
    private _currentNewsCount: number = 2;

    constructor(private _newsRequestService: NewsRequestService) {
        this._newsRequestService.getNews()
            .pipe(
                tap((news: INews[]) => {
                    this.addNews(news);
                }),
                mergeMap(() => this._newsRequestService.getPosts()),
                tap((posts: INews[]) => {
                    this.addNews(posts);
                }),
            )
            .subscribe();
    }

    /**
     * Добавляет новые новости.
     * @param { INews[] } news массив новостей для добавления.
     */
    public addNews(news: INews[]): void {
        this._news.push(...news);
        this._news.sort((a: INews, b: INews) => b.postCreationDate.getTime() - a.postCreationDate.getTime());
        this.makeStep();
    }

    /**
     * Увеличивает количество показываемых новостей.
     */
    public makeStep(): void {
        this._currentNewsCount += this._newsAppendStep;
    }

    /**
     * Возвращает все новости с каким то фильтром.
     * @param { BlogNewsType } filter без филтра null, только посты 'post', толко новости 'news'
     * @return { INews[] }
     */
    public getNews(filter: BlogNewsType = null): INews[] {
        return (filter ? this._news.filter((n: INews) => n.type === filter) : this._news).slice(0, this._currentNewsCount);
    }

    /**
     * Получает новость по id.
     * @param { number } id новости
     * @return { INews | undefined }
     */
    public getNewsById(id: number): INews | undefined {
        console.log(this._news);

        return this._news.find((n: INews) => n.id === id);
    }

}
