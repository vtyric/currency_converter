import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBreadcrumb } from '../interfaces/breadcrumb.interface';

@Injectable()
export class BreadcrumbService {

    constructor(
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
    ) {
    }

    /**
     * Возвращает перевод до последнего маршрута.
     * @returns {string[]}
     */
    public getBreadcrumbTranslation(): string[] {
        let child: ActivatedRoute | null = this._activatedRoute.firstChild;

        while (child) {
            if (child.firstChild) {
                child = child.firstChild;
                continue;
            }
            if (child.snapshot.data && child.snapshot.data['place']) {
                return child.snapshot.data['place'];
            }
        }

        return [];
    }

    /**
     * По переданной url, определяет перевод и маршрут. Здесь когда текущее в reduce number <=> id чего-то,
     * там немного по другому сделан перевод, поэтому пришлось писать такой костыль.
     * @param {string} url
     * @param {string[]} translation
     * @returns {IBreadcrumb[]}
     */
    public updateBreadcrumbs(url: string, translation: string[]): IBreadcrumb[] {
        const breadcrumbs: IBreadcrumb[] = [];
        const splitUrl: string[] = url.split('/');

        splitUrl
            .filter((s: string) => translation.length === splitUrl.length || !!s)
            .reduce(
                (res: string, cur: string, index: number) => {
                    res += isNaN(+cur) ? '/' + cur : '/';

                    breadcrumbs.push(
                        isNaN(+cur)
                            ? {
                                label: translation[index],
                                route: res
                            }
                            : {
                                label: cur + ' ' + translation[index],
                                route: res
                            }
                    );

                    return res;
                }, '');

        return breadcrumbs;
    }
}
