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
          news.forEach(n => n.commentsCount = this.getRandomCommentsCount())
          this.addNews(news);
        }),
        mergeMap(() => this._newsRequestService.getPosts()),
        tap((posts: INews[]) => {
          posts.forEach(p => p.commentsCount = this.getRandomCommentsCount())
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
    this._news.sort((a, b) => b.postCreationDate.getTime() - a.postCreationDate.getTime());
    this.makeStep();
  }

  /**
   * Возвращает случайное количество комментариев для постов.
   * @return {number}
   */
  public getRandomCommentsCount(): number {
    return Math.floor(Math.random() * 300);
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
  public getNews(filter: BlogNewsType): INews[] {
    return (filter ? this._news.filter(n => n.type === filter) : this._news).slice(0, this._currentNewsCount);
  }

  /**
   * Получает новость по id.
   * @param { number } id новости
   * @return { INews | undefined }
   */
  public getNewsById(id: number): INews | undefined {
    return this._news.find(n => n.id === id);
  }

}
