import { Component } from '@angular/core';
import { NewsService } from '../news/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { INews } from '../news/interfaces';

@Component({
    selector: 'app-styles',
    templateUrl: './news-description.component.html',
    styleUrls: ['./styles/news-description.component.scss']
})
export class NewsDescriptionComponent {

    public news!: INews | undefined;

    constructor(
    private _newsService: NewsService,
    private _route: ActivatedRoute,
    ) {
        this.news = this._newsService.getNewsById(Number.parseInt(_route.snapshot.paramMap.get('id') ?? '1'));
    }

}
