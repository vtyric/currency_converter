import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { INews } from '../news/interfaces';
import { AuthService } from '../authentification/services/auth.service';

@Component({
    selector: 'app-news-description',
    templateUrl: './news-description.component.html',
    styleUrls: ['./styles/news-description.component.scss']
})
export class NewsDescriptionComponent implements OnInit {

    public news!: INews | undefined;
    public userId!: string | null;

    constructor(
        private _newsService: NewsService,
        private _route: ActivatedRoute,
        private _authService: AuthService,
    ) {
    }

    public ngOnInit(): void {
        const newsId: number = Number.parseInt(this._route.snapshot.paramMap.get('id') ?? '1');
        this.news = this._newsService.getNewsById(newsId);
        this.userId = this._authService.getCurrentUserId();
    }
}
