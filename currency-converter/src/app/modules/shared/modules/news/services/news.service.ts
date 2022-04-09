import { Injectable } from '@angular/core';
import { INews, INewsMenuItem } from '../interfaces';
import { FilterType } from '../types';

@Injectable()
export class NewsService {

  private _news: INews[] = [
    {
      id: 1,
      title: 'Заголовок первой новости',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Autem, quae!',
      type: 'news',
      postCreationDate: new Date(Date.now()),
      preview: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQrhmgXe8zn0htM-sLnsM3QpL-FVpMoVTX2ss7lIyb4skSN75B3'
    },
    {
      id: 2,
      title: 'Заголовок второй новости',
      description: 'Lorem ipsum dolor sit amet, consectetur.',
      type: 'news',
      postCreationDate: new Date(Date.now()),
      preview: 'https://ranobehub.org/img/media/102868/ezgif.com-gif-maker-3.gif'
    },
    {
      id: 3,
      title: 'Заголовок третьей новости',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius molestias officiis ut?',
      type: 'news',
      postCreationDate: new Date(Date.now()),
      preview: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/xw/210/625/3.jpg'
    },
    {
      id: 4,
      title: 'мой пост',
      description: 'Просто какой то текст для поста',
      type: 'post',
      postCreationDate: new Date(Date.now()),
    },
  ];

  public newsMenuItems: INewsMenuItem[] = [
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

  /**
   * Возвращает все новости с каким то фильтром.
   * @param { FilterType } filter без филтра null, только посты 'post', толко новости 'news'
   * @return { INews[] }
   */
  public getNews(filter: FilterType): INews[] {
    return filter ? this._news.filter(n => n.type === filter) : this._news;
  }

  constructor() {
  }

}
