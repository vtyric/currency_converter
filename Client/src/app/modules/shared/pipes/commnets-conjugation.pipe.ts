import { Pipe, PipeTransform } from "@angular/core";

@Pipe({name: 'CommentsConjugation'})
export class CommentsConjugationPipe implements PipeTransform {
  transform(value: number): string {
    if (value === 0) {
      return 'нет комментариев';
    }
    if (value % 10 === 1) {
      return `${value} комментарий`
    }
    if ((value % 10 === 2 || value % 10 === 3 || value % 10 === 4) && (value < 10 || value > 20)) {
      return `${value} комментария`;
    }
    return `${value} комментариев`;
  }
}
