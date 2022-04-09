import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'news',
  templateUrl: './news.component.html',
  styleUrls: ['./styles/news.component.scss']
})
export class NewsComponent implements OnInit {

  @Input()
  public title!: string;
  @Input()
  public description!: string;
  @Input()
  public imgUrl!: string | undefined;
  @Input()
  public date!: Date;

  constructor() {
  }

  ngOnInit(): void {
  }

}
