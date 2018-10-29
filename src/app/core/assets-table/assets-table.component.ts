import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AssetService} from '../../assets/asset.service';
import {Asset} from '../../assets/asset.model';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material';
import {ModalDirective} from 'angular-bootstrap-md';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

export interface AssetElement {
  address: string;
  neighborhood: string;
  category: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-assets-table',
  templateUrl: './assets-table.component.html',
  styleUrls: ['./assets-table.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class AssetsTableComponent implements OnInit, OnDestroy {
  dataSource;
  columnsToDisplay = ['Price', 'Category', 'Neighborhood', 'Type', 'Address'];
  expandedElement: AssetElement;
  assets: Asset[] = [];
  assetsSubscription: Subscription;
  assetsType: string;
  navigationSubscription: Subscription;

  constructor(
    private assetService: AssetService,
    private router: Router,
    private route: ActivatedRoute) {
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
    this.assetsType = this.route.snapshot.params['type'];
    this.assetService.getAssetsByType(this.assetsType);
    this.assetsSubscription = this.assetService.getAssetsUpdatedListener()
      .subscribe((assets: Asset[]) => {
        this.assets = assets;
        this.dataSource = new MatTableDataSource(this.assets);
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(assetId: string) {
    this.router.navigate(['assets/edit', assetId]);
  }

  onDelete(assetId: string) {
    this.assetService.deleteAsset(assetId)
      .subscribe(res => {
        this.assetService.getAssetsByType('sale');
        this.assetService.getAssetsUpdatedListener()
          .subscribe((assets: Asset[]) => {
            this.assets = assets;
            this.dataSource = new MatTableDataSource(this.assets);
          });
      });
  }

  ngOnDestroy () {
    this.assetsSubscription.unsubscribe();
  }
}


