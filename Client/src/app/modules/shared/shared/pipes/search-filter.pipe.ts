import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'filter'})
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], trim: string, filterKey: string | null = null): any[] {
    return !trim ?
      items
      : items.filter(item =>
        filterKey
          ? item[filterKey].includes(trim)
          : item.includes(trim));
  }
}
