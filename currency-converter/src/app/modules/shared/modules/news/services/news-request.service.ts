import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { INews, INewsRequest } from '../interfaces';
import { newsType } from '../types';

@Injectable()
export class NewsRequestService {

  private _id: number = 100;

  constructor(private _httpClient: HttpClient) {
  }

  /**
   * Получает новости из какого-то индусского ресурса)))
   * @param type вид получаемых новостей
   */
  public getNews(type: newsType): Observable<INews[]> {
    return this._httpClient
      .get<INewsRequest>(`https://inshortsapi.vercel.app/news?category=${type}`)
      .pipe(
        map(value => value.data
          .map(d => ({
            id: this._id++,
            type: 'news',
            title: d.title,
            description: `By ${d.author}`,
            content: d.content,
            postCreationDate: new Date(`${value.data[0].date.split(' ').slice(0, -1).join(' ')} 2022, ${d.time.split(',').join(' ')}`),
            preview: d.imageUrl,
            source: d.url,
          }))
        ),
      );
  }

}
