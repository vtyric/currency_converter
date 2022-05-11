import { Component, Input, OnInit } from '@angular/core';
import { INews } from "../../../../../shared/news/interfaces";

@Component({
  selector: 'news-preview',
  templateUrl: './news-preview.component.html',
  styleUrls: ['./styles/news-preview.component.scss']
})
export class NewsPreviewComponent implements OnInit {

  @Input()
  public news!: INews;

  constructor() {
  }

  ngOnInit(): void {
  }

}
