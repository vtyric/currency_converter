import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'numericSeparator'
})
export class NumericSeparatorPipe implements PipeTransform {
  transform(value: string, divisionLength: number): string {
    if (!value.trim()) {
      return "";
    }
    const dotIndex = value.indexOf('.');

    return dotIndex !== -1
      ? this.getSeparatedString(value.slice(0, dotIndex), divisionLength) + "." + value.slice(dotIndex + 1)
      : this.getSeparatedString(value, divisionLength);
  }

  private getSeparatedString(value: string, divisionLength: number): string {
    return Array(
      ...Array(...value)
        .filter(c => c !== " ")
        .reverse()
        .reduce((res, cur, index) => index % divisionLength === 0 ? res + " " + cur : res + cur), "")
      .reverse()
      .join("");
  }
}
