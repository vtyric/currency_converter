import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numericSeparator'
})
export class NumericSeparatorPipe implements PipeTransform {
  /**
   * Разделяет строку из чисел по divisionLength до точки.
   * @param {string} value исходная строка
   * @param {number} divisionLength по сколько чисел нужно делить
   * @returns {string} строка с пробелами
   */
  transform(value: string, divisionLength: number): string {
    if (!value.trim()) {
      return '';
    }
    const dotIndex = value.indexOf('.');

    return dotIndex !== -1
      ? this.getSeparatedString(value.slice(0, dotIndex), divisionLength) + '.' + value.slice(dotIndex + 1)
      : this.getSeparatedString(value, divisionLength);
  }

  /**
   * Разделяет строку без точек по divisionLength.
   * @param {string} value часть строки, состоящая из пробелов и цифр
   * @param {number} divisionLength по сколько делить число
   * @returns {string} изменённая строка
   * @private
   */
  private getSeparatedString(value: string, divisionLength: number): string {
    return Array(
      ...Array(...value)
        .filter(c => c !== ' ')
        .reverse()
        .reduce((res, cur, index) => index % divisionLength === 0 ? res + ' ' + cur : res + cur), '')
      .reverse()
      .join('');
  }
}
