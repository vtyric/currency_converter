import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numericSeparator'
})
export class NumericSeparatorPipe implements PipeTransform {
  transform(value: string, divisionLength: number): string {
    return !value.trim()
      ? ""
      : Array(
        ...Array(...value)
          .filter(c => c !== " ")
          .reverse()
          .reduce((res, cur, index) => index % divisionLength === 0 ? res + " " + cur : res + cur), "")
        .reverse()
        .join("");
  }
}
