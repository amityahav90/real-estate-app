import {Component, Input, OnInit} from '@angular/core';
import {Asset} from '../../assets/asset.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  @Input() asset: Asset;

  constructor() {}

  ngOnInit() {
  }

}
