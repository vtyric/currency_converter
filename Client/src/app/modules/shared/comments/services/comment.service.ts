import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';
import { IComment } from '../interfaces';

@Injectable()
export class CommentService {

    constructor(private _httpClient: HttpClient) {
    }

    /**
     * Добавляет комментарий.
     * @param {number} userId
     * @param {number} newsId
     * @param {string} text
     */
    public addComment(userId: number, newsId: number, text: string): void {
        this._httpClient.post(`${ environment.apiUrl }api/Comment`, { userId, newsId, text })
            .subscribe();
    }

    /**
     * Получает комментарии у новости по её id.
     * @param {number} newsId
     * @returns {Observable<IComment[]>}
     */
    public getCommentByNewsId(newsId: number): Observable<IComment[]> {
        return this._httpClient.get<IComment[]>(`${ environment.apiUrl }api/Comment/${ newsId }`);
    }

    /**
     * Удаляет комментарии у новости по id.
     * @param {number} id
     */
    public deleteCommentById(id: number): void {
        this._httpClient.delete(`${ environment.apiUrl }api/Comment/${ id }`)
            .subscribe();
    }

}
