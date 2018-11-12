import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: `shortDatePipe`
})
export class ShortDatePipe implements PipeTransform {
  transform(value: Date) {
    const day = value.getDay().toString();
    const month = value.getMonth().toString();
    const year = value.getFullYear().toString();
    return day + '/' + month + '/' + year;
  }
}
