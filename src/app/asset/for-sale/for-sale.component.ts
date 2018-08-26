import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Asset } from '../asset.model';
import { AssetService } from '../asset.service';

@Component({
  selector: 'app-for-sale',
  templateUrl: './for-sale.component.html',
  styleUrls: ['./for-sale.component.css']
})
export class ForSaleComponent implements OnInit, OnDestroy {
  assets: Asset[];
  subscription: Subscription;

  constructor(private assetService: AssetService) {}

  ngOnInit() {
    this.subscription = this.assetService.assetChanged
      .subscribe(
        (assets: Asset[]) => {
          this.assets = assets;
        }
      );
    this.assets = this.assetService.getSaleAssets();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
