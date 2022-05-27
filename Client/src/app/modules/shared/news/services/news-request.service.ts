import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, merge, Observable } from 'rxjs';
import { INews, INewsRequest } from '../interfaces';
import { environment } from '../../../../../environments/environment';

@Injectable()
export class NewsRequestService {

    public start: number = 0;
    public limit: number = 5;

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Получает новсти про космос.
     * @param {number} start
     * @param {number} limit
     * @returns {Observable<INews[]>}
     */
    public getNews(start: number = this.start, limit: number = this.limit): Observable<INews[]> {
        return this._httpClient
            .get<INewsRequest[]>(`https://api.spaceflightnewsapi.net/v3/articles?_limit=${ limit }&_start=${ start }`)
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

    /**
     * Получает все новости и посты.
     * @param {number} start
     * @param {number} limit
     * @returns {Observable<INews[]>}
     */
    public getAllNews(start: number = this.start, limit: number = this.limit): Observable<INews[]> {
        return merge(this.getNews(start, limit), this.getPosts());
    }

    /**
     * Находит новость по id среди всех постов и новостей.
     * @param {number} id
     * @returns {Observable<INews>}
     */
    public getNewsById(id: number): Observable<INews> {
        return this.getAllNews(0, this.limit * 50)
            .pipe(
                map((news: INews[]) => news.filter((n: INews) => n.id === id)[0]),
            );
    }

}
