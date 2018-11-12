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
      case 'address':
        result = 'כתובת';
        break;
      case 'Type':
        result = 'סוג הנכס';
        break;
      case 'type':
        result = 'סוג הנכס';
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
      case 'username':
        result = 'שם משתמש';
        break;
      case 'firstName':
        result = 'שם פרטי';
        break;
      case 'lastName':
        result = 'שם משפחה';
        break;
      case 'email':
        result = 'אימייל';
        break;
      case 'role':
        result = 'תפקיד';
        break;
      case 'name':
        result = 'שם מלא';
        break;
      case 'phone':
        result = 'מספר טלפון';
        break;
      case 'asset':
        result = 'שם הנכס';
        break;
      case 'date':
        result = 'תאריך';
        break;
      default:
        result = value;
    }
    return result;
  }

}
