import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { INews } from '../news/interfaces';
import { AuthService } from '../authentification/services/auth.service';
import { NewsRequestService } from '../news/services/news-request.service';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
    selector: 'app-news-description',
    templateUrl: './news-description.component.html',
    styleUrls: ['./styles/news-description.component.scss']
})
export class NewsDescriptionComponent implements OnInit, OnDestroy {

    public news!: INews | undefined;
    public userId!: string | null;

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _newsRequestService: NewsRequestService,
        private _route: ActivatedRoute,
        private _authService: AuthService,
    ) {
    }

    public ngOnInit(): void {
        const newsId: string | null = this._route.snapshot.paramMap.get('id');

        if (newsId !== null) {
            this._newsRequestService.getNewsById(+newsId)
                .pipe(
                    tap((news: INews) => {
                        if (!!news) {
                            this.news = news;
                        }
                    }),
                    takeUntil(this._unsubscriber)
                )
                .subscribe();
        }

        this.userId = this._authService.getCurrentUserId();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }
}
