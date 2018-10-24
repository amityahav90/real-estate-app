import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: `hebPipe`
})
export class HebrewPipe implements PipeTransform {
  transform(value: string): string {
    let result: string;
    switch (value) {
      case 'Address':
        result = 'כתובת';
        break;
      case 'Neighborhood':
        result = 'שכונה';
        break;
      case 'Category':
        result = 'קטגוריה';
        break;
      case 'Price':
        result = 'מחיר';
        break;
      default:
        result = value;
    }
    return result;
  }

}
