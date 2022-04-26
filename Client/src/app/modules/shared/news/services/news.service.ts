import { Injectable } from '@angular/core';
import { INews, INewsMenuItem } from '../interfaces';
import { BlogNewsType } from '../types';
import { NewsRequestService } from './news-request.service';
import { tap } from 'rxjs';

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

  private readonly _news: INews[] = [
    {
      id: 1,
      title: 'Мой пост',
      description: 'Просто какой то текст для поста',
      content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab eveniet excepturi nemo recusandae, sed voluptates!',
      preview: 'https://ranobehub.org/img/media/114558/b06216ed4a4d8fc4d93507d01a120070.jpeg',
      type: 'post',
      postCreationDate: new Date(Date.now()),
    },
  ];
  private readonly _newsAppendStep: number = 2;
  private _currentNewsCount: number = 2;

  constructor(private _newsRequestService: NewsRequestService) {
    this._newsRequestService.getNews('technology')
      .pipe(
        tap((news: INews[]) => {
          this.addNews(news);
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
