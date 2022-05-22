import { Component, OnDestroy } from '@angular/core';
import { IBreadcrumb } from './interfaces/breadcrumb.interface';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Subject, takeUntil, tap } from 'rxjs';
import { BreadcrumbService } from './services/breadcrumb.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./styles/breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnDestroy {

    public breadcrumbs: IBreadcrumb[] = [];

    private _unsubscriber: Subject<void> = new Subject<void>();

    constructor(
        private _router: Router,
        private _breadcrumbService: BreadcrumbService,
    ) {
        this._router.events
            .pipe(
                filter((event: any) => event instanceof NavigationEnd),
                map(() => this._breadcrumbService.getBreadcrumbTranslation()),
                tap((value: string[]) => {
                    this.breadcrumbs = this._breadcrumbService.updateBreadcrumbs(this._router.url, value);
                }),
                takeUntil(this._unsubscriber)
            )
            .subscribe();
    }

    public ngOnDestroy(): void {
        this._unsubscriber.next();
        this._unsubscriber.complete();
    }
}
