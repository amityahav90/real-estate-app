import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Asset } from './asset.model';

@Injectable()
export class AssetService {
  assetChanged = new Subject<Asset[]>();

  private saleAssets: Asset[] = [
    new Asset(
      'sale',
      'נחל חיון 10/15',
      1500000,
      'דירת ארבעה חדרים עם מרפסת ונוף לים',
      false,
      4,
      105,
      [
        'http://s0.geograph.org.uk/geophotos/04/06/97/4069775_7ed3e86f.jpg',
        'https://s.iha.com/962600004154/Short-term-rentals-Lublin-Apartment-Flat_4.jpeg',
        'https://s.iha.com/2649100023914/Short-term-rentals-Bodrum-Apartment-Flat_23.jpeg'
      ]
    ),
    new Asset(
      'sale',
      'נחל חיון 10/15',
      1500000,
      'דירת ארבעה חדרים עם מרפסת ונוף לים',
      false,
      4,
      105,
      [
        'http://s0.geograph.org.uk/geophotos/04/06/97/4069775_7ed3e86f.jpg',
        'https://s.iha.com/962600004154/Short-term-rentals-Lublin-Apartment-Flat_4.jpeg',
        'https://s.iha.com/2649100023914/Short-term-rentals-Bodrum-Apartment-Flat_23.jpeg'
      ]
    ),
    new Asset(
      'sale',
      'נחל חיון 10/15',
      1500000,
      'דירת ארבעה חדרים עם מרפסת ונוף לים',
      false,
      4,
      105,
      [
        'http://s0.geograph.org.uk/geophotos/04/06/97/4069775_7ed3e86f.jpg',
        'https://s.iha.com/962600004154/Short-term-rentals-Lublin-Apartment-Flat_4.jpeg',
        'https://s.iha.com/2649100023914/Short-term-rentals-Bodrum-Apartment-Flat_23.jpeg'
      ]
    ),
  ];

  getSaleAssets() {
    return this.saleAssets.slice();
  }

  getSaleAsset(index: number) {
    return this.saleAssets[index];
  }
}
