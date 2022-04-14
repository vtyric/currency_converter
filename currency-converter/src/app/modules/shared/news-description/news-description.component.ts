import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news/services/news.service';
import { Router } from '@angular/router';
import { INews } from '../news/interfaces';

@Component({
  selector: 'app-styles',
  templateUrl: './news-description.component.html',
  styleUrls: ['./styles/news-description.component.scss']
})
export class NewsDescriptionComponent implements OnInit {

  public news!: INews | undefined;

  constructor(
    private _newsService: NewsService,
    private _router: Router,
  ) {
    this.news = this._newsService.getNewsById(Number.parseInt(_router.url.split('/').slice(-1)[0]));
  }

  ngOnInit(): void {
  }

}
