import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Asset} from '../asset.model';
import {AssetService} from '../asset.service';
import {Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';
import {MatOption} from '@angular/material';

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
  type: string;
  regularDistribution = 100 / 3 + '%';

  rooms: FormControl;
  roomsSelection: number[] = [];
  roomsList: {value: number, showValue: string}[] = [
    { value: 2, showValue: '2 חדרים' },
    { value: 3, showValue: '3 חדרים' },
    { value: 4, showValue: '4 חדרים' },
    { value: 5, showValue: '5 חדרים' },
    { value: 6, showValue: '6 חדרים ויותר' }
  ];

  neighborhood = new FormControl();
  neighborhoodSelection: string[] = [];
  neighborhoodList: {value: string, showValue: string}[] = [
    { value: 'ofir', showValue: 'אופיר' },
    { value: 'urim', showValue: 'אורים' },
    { value: 'amdar', showValue: 'אמדר' },
    { value: 'bne-beitcha', showValue: 'בנה ביתך' },
    { value: 'ganim-a', showValue: 'גנים א' },
    { value: 'ganim-b', showValue: 'גנים ב' },
    { value: 'haeshel', showValue: 'האשל' },
    { value: 'hadekel', showValue: 'הדקל' },
    { value: 'yeelim', showValue: 'יעלים' },
    { value: 'mitspe-yam', showValue: 'מצפה ים' },
    { value: 'neve-midbar', showValue: 'נווה מדבר' },
    { value: 'arava', showValue: 'ערבה' },
    { value: 'zeelim', showValue: 'צאלים' },
    { value: 'tsofit', showValue: 'צופית' },
    { value: 'rova4', showValue: 'רובע 4' },
    { value: 'rova5', showValue: 'רובע 5' },
    { value: 'rova6', showValue: 'רובע 6' },
    { value: 'rova7', showValue: 'רובע 7' },
    { value: 'rova8', showValue: 'רובע 8' },
    { value: 'rova9', showValue: 'רובע 9' },
    { value: 'rova10', showValue: 'רובע 10' },
    { value: 'rova11', showValue: 'רובע 11' },
    { value: 'shahamon', showValue: 'שחמון' }
  ];

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
    this.rooms = new FormControl();
    this.type = this.route.snapshot.params['type'];
    this.assetService.getAssetsByType(this.type);
    this.assetsSubscription = this.assetService.getAssetsUpdatedListener()
      .subscribe((assets: Asset[]) => {
        this.assets = assets;
        this.filteredAssets = this.assets;
      });
  }

  // onSelection(event) {
  //   const index = this.roomsSelection.findIndex(x => x === event.source.value.value);
  //   if (index >= 0) {
  //     this.roomsSelection.splice(index, 1);
  //   } else {
  //     this.roomsSelection.push(event.source.value.value);
  //   }
  //
  //   if (this.roomsSelection.length === 0) {
  //     this.filteredAssets = this.assets;
  //     return;
  //   }
  //
  //   this.filteredAssets = [];
  //   for (const asset of this.assets) {
  //     for (const amount of this.roomsSelection) {
  //       if (amount === 6) {
  //         if (asset.roomsAmount >= 6) {
  //           this.filteredAssets.push(asset);
  //         }
  //       } else if (asset.roomsAmount === amount) {
  //         this.filteredAssets.push(asset);
  //       }
  //     }
  //   }
  // }

  // onNeighborhoodSelection(event) {
  //   const index = this.neighborhoodSelection.findIndex(x => x === event.source.value.showValue);
  //   if (index >= 0) {
  //     this.neighborhoodSelection.splice(index, 1);
  //   } else {
  //     this.neighborhoodSelection.push(event.source.value.showValue);
  //   }
  //
  //   if (this.neighborhoodSelection.length === 0) {
  //     this.filteredAssets = this.assets;
  //     return;
  //   }
  //
  //   this.filteredAssets = [];
  //   for (const asset of this.assets) {
  //     for (const neighborhood of this.neighborhoodSelection) {
  //       if (asset.neighborhood === neighborhood) {
  //         this.filteredAssets.push(asset);
  //       }
  //     }
  //   }
  // }

  onClickFilter() {
    if (!this.neighborhood.value && !this.rooms.value) {
      this.filteredAssets = this.assets;
      return;
    }
    this.filteredAssets = [];

    if (this.rooms.value) {
      for (const asset of this.assets) {
        for (const room of this.rooms.value) {
          if (asset.roomsAmount === room.value) {
            this.filteredAssets.push(asset);
          }
        }
      }
      if (this.neighborhood.value) {
        for (const asset of this.filteredAssets) {
          let flag = false;
          for (const neighborhood of this.neighborhood.value) {
            if (asset.neighborhood === neighborhood.showValue) {
              flag = true;
            }
          }
          if (flag === false) {
            const index = this.filteredAssets.findIndex(x => x === asset);
            if (index >= 0) {
              this.filteredAssets.splice(index, 1);
            }
          }
        }
      }
    } else {
      for (const asset of this.assets) {
        for (const neighborhhod of this.neighborhood.value) {
          if (asset.neighborhood === neighborhhod.showValue) {
            this.filteredAssets.push(asset);
          }
        }
      }
      if (this.rooms.value) {
        for (const asset of this.filteredAssets) {
          let flag = false;
          for (const room of this.rooms.value) {
            if (asset.roomsAmount === room) {
              flag = true;
            }
          }
          if (!flag) {
            const index = this.filteredAssets.findIndex(x => x === asset);
            if (index >= 0) {
              this.filteredAssets.splice(index, 1);
            }
          }
        }
      }
    }
  }

  onClickClear() {
    this.filteredAssets = this.assets;
    this.rooms.reset();
    this.neighborhood.reset();
  }

  ngOnDestroy() {
    this.assetsSubscription.unsubscribe();
  }
}
