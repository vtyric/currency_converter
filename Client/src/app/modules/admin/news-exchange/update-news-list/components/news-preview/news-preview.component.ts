import { Component, Input } from '@angular/core';
import { INews } from '../../../../../shared/news/interfaces';

@Component({
    selector: 'app-news-preview',
    templateUrl: './news-preview.component.html',
    styleUrls: ['./styles/news-preview.component.scss']
})
export class NewsPreviewComponent {

  @Input()
    public news!: INews;

  constructor() {
  }
}
