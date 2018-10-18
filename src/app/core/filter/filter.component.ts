import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  options: any[] = [
    { value: 2, showValue: '2 חדרים' },
    { value: 3, showValue: '3 חדרים' },
    { value: 4, showValue: '4 חדרים' },
    { value: 5, showValue: '5 חדרים' },
    { value: 6, showValue: '6 חדרים ויותר' }
  ];

  constructor() {}

  ngOnInit() {
  }

}
