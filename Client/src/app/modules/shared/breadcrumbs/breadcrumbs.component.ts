import { Component, OnInit } from '@angular/core';
import { IBreadcrumb } from "./interfaces/breadcrumb.interface";
import { NavigationEnd, Router } from "@angular/router";
import { filter, Subject, takeUntil, tap } from "rxjs";
import { BreadcrumbService } from "./services/breadcrumb.service";

@Component({
  selector: 'breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./styles/breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {

  public breadcrumbs: IBreadcrumb[] = [];

  private _unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private _router: Router,
    private _breadcrumbService: BreadcrumbService,
  ) {
    this.updateBreadcrumbs(this._router.url);
  }

  ngOnInit(): void {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        tap(
          _ => {
            this.updateBreadcrumbs(this._router.url);
          },
        ),
        takeUntil(this._unsubscriber)
      )
      .subscribe()
  }

  ngOnDestroy(): void {
    this._unsubscriber.next();
    this._unsubscriber.complete();
  }

  /**
   * По переданной url, определяет перевод и маршрут. Здесь когда текущее в reduce number <=> id чего-то,
   * там немного по другому сделан перевод, поэтому пришлось писать такой костыль.
   * @param {string} url
   * @private
   */
  private updateBreadcrumbs(url: string): void {
    this.breadcrumbs = [];
    url
      .split('/')
      .filter(u => u !== "")
      .reduce(
        (res, cur) => {
          res += isNaN(+cur) ? '/' + cur : '/';
          this.breadcrumbs.push(
            isNaN(+cur)
              ? {
                label: this._breadcrumbService.getTranslation(res) ?? '',
                route: res
              }
              : {
                label: cur + ' ' + this._breadcrumbService.getTranslation(res) ?? '',
                route: res
              }
          )
          return res;
        }, "");
  }

}
