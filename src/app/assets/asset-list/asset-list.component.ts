import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Asset} from '../asset.model';
import {AssetService} from '../asset.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-asset-list',
  templateUrl: './asset-list.component.html',
  styleUrls: ['./asset-list.component.css']
})
export class AssetListComponent implements OnInit, OnDestroy {
  assets: Asset[] = [];
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
      });
  }

  ngOnDestroy() {
    this.assetsSubscription.unsubscribe();
  }
}
