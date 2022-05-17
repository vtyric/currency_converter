import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { INews, INewsRequest } from '../interfaces';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class NewsRequestService {

    private _limit: number = 10;
    private _start: number = 0;

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Получает новсти про космос.
     * @return {Observable<INews[]>}
     */
    public getNews(): Observable<INews[]> {
        return this._httpClient
            .get<INewsRequest[]>(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${ this._limit }&_start=${ this._start }`)
            .pipe(
                map((value: INewsRequest[]) => value
                    .map((d: INewsRequest) => ({
                        id: d.id,
                        type: 'news',
                        title: d.title,
                        description: `By ${ d.newsSite }`,
                        content: d.summary,
                        postCreationDate: new Date(d.publishedAt),
                        commentsCount: Math.floor(Math.random() * 300),
                        preview: d.imageUrl,
                        source: d.url,
                    })),
                ),
            );
    }

    /**
     * Создает пост, добавляет его в базу данных.
     * @param {string} title
     * @param {string} description
     * @param {string} content
     * @param {string} preview
     * @param {string} source
     */
    public createPost(title: string, description: string, content: string, preview: string | undefined, source: string | undefined): Observable<Object> {
        return this._httpClient
            .post(`${ environment.apiUrl }api/News`, {
                title,
                description,
                content,
                preview: preview ?? null,
                source: source ?? null
            });
    }

    /**
     * Поулчает все посты.
     * @return {Observable<INews[]>}
     */
    public getPosts(): Observable<INews[]> {
        return this._httpClient
            .get<INews[]>(`${ environment.apiUrl }api/News`)
            .pipe(
                map((posts: INews[]) => posts
                    .map((post: INews) => ({
                        id: post.id,
                        type: 'post',
                        title: post.title,
                        description: post.description,
                        content: post.content,
                        postCreationDate: new Date(post.postCreationDate),
                        preview: post.preview,
                        commentsCount: post.commentsCount,
                    }))
                ),
            );
    }

}
