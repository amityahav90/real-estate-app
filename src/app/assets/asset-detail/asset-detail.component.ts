import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AssetService} from '../asset.service';
import {Asset} from '../asset.model';

@Component({
  selector: 'app-asset-detail',
  templateUrl: './asset-detail.component.html',
  styleUrls: ['./asset-detail.component.css']
})
export class AssetDetailComponent implements OnInit {
  assetId: string;
  asset: Asset;

  constructor(private route: ActivatedRoute, private assetService: AssetService) {}

  ngOnInit() {
    this.assetId = this.route.snapshot.params['id'];
    this.assetService.getAssetById(this.assetId)
      .subscribe(assetData => {
        this.asset = assetData.asset;
      });
  }

}
