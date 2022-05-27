import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NewsService } from '../services/news.service';

@Directive({
    selector: '[appInfinityScroll]'
})
export class InfinityScrollDirective {

    @Input()
    public additionalPaddingTop: number = 705;

    constructor(
        private _element: ElementRef,
        private _newsService: NewsService) {
    }

    @HostListener('window:scroll', ['$event'])
    public onWindowScroll(): void {
        const { clientHeight }: { clientHeight: number } = this._element.nativeElement;
        const yPosition: number = window.scrollY + this.additionalPaddingTop;

        if (clientHeight <= yPosition) {
            this._newsService.getNewsByRequest();
        }
    }

}
