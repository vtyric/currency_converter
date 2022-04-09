import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NewsService } from './services/news.service';
import { FilterType } from './types';

@Component({
  selector: 'news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./styles/news-page.component.scss']
})
export class NewsPageComponent implements OnInit {

  public filter!: FilterType;

  private _selectedMenuItem!: EventTarget | null;
  @ViewChild('menu')
  private _menu!: ElementRef;

  constructor(public newsService: NewsService, private _renderer: Renderer2) {
  }

  ngOnInit(): void {
  }

  /**
   * События происходящее при нажатии на меню. Фильтрация по типу новости.
   * @param menuItem элемент на который нажали
   * @param filter фильтер, который выбирается при нажатии на кнопку
   */
  public onMenuButtonClick(menuItem: EventTarget | null, filter: FilterType): void {
    this.filter = filter;
    this._renderer.removeClass(
      this._selectedMenuItem ? this._selectedMenuItem : this._menu.nativeElement.children[0],
      'selected'
    );
    this._renderer.addClass(menuItem, 'selected');
    this._selectedMenuItem = menuItem;
  }

}
