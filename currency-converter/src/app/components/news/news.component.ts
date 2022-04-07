import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./styles/news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input()
  public title!: string;
  @Input()
  public description!: string;
  @Input()
  public imgUrl!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
