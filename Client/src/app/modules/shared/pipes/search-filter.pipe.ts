import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'filter' })
export class SearchFilterPipe implements PipeTransform {
    public transform(items: any[], trim: string, filterKey: string | null = null): any[] {
        return !trim ?
            items
            : items.filter((item: any) =>
                filterKey
                    ? item[filterKey].toUpperCase().includes(trim.toUpperCase())
                    : item.toUpperCase().includes(trim.toUpperCase()));
    }
}
