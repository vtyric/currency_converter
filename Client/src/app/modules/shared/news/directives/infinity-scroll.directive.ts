import {Directive, ElementRef, HostListener} from '@angular/core';
import {NewsService} from '../services/news.service';

@Directive({
  selector: '[infinityScroll]'
})
export class InfinityScrollDirective {

  constructor(
    private _element: ElementRef,
    private _newsService: NewsService) {
  }

  @HostListener('window:scroll', ['$event'])
  public onWindowScroll(): void {
    if (this._element.nativeElement.clientHeight / window.scrollY < 1.6) {
      this._newsService.makeStep()
    }
  }

}
