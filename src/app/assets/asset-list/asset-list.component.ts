import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Asset} from '../asset.model';
import {AssetService} from '../asset.service';
import {Subscription} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit, OnDestroy {
  assets: Asset[] = [];
  filteredAssets: Asset[] = [];
  assetsSubscription: Subscription;
  navigationSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private assetService: AssetService,
    private router: Router) {
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialize();
      }
    });
  }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    const type = this.route.snapshot.params['type'];
    this.assetService.getAssetsByType(type);
    this.assetsSubscription = this.assetService.getAssetsUpdatedListener()
      .subscribe((assets: Asset[]) => {
        this.assets = assets;
        this.filteredAssets = this.assets;
      });
  }

  onSelection(event) {
    if (event.length === 0) {
      this.filteredAssets = this.assets;
      return;
    }
    this.filteredAssets = [];
    for (const asset of this.assets) {
      for (const value of event) {
        if (value === 6) {
          if (asset.roomsAmount >= value) {
            this.filteredAssets.push(asset);
          }
        } else if (asset.roomsAmount === value) {
          this.filteredAssets.push(asset);
        }
      }
    }
  }

  ngOnDestroy() {
    this.assetsSubscription.unsubscribe();
  }
}
