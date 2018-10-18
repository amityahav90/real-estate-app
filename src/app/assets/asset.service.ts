import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Asset } from './asset.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';

const BACKEND_URL = environment.apiUrl + '/assets';


@Injectable()
export class AssetService {
  private assetsUpdated = new Subject<Asset[]>();
  private assets: Asset[] = [];

  constructor(private http: HttpClient) {}

  getAssets(type: string) {
    return this.assets.filter(asset => asset.type === type).slice();
  }

  getSaleAsset(index: number) {
    return this.assets[index];
  }

  createAsset(type: string,
              address: string,
              price: number,
              description: string,
              isPrivate: boolean,
              roomsAmount: number,
              size: number,
              photos: File[]) {
    const assetData = new FormData();
    assetData.append('type', type);
    assetData.append('address', address);
    assetData.append('price', price.toString());
    assetData.append('description', description);
    assetData.append('isPrivate', isPrivate.toString());
    assetData.append('roomsAmount', roomsAmount.toString());
    assetData.append('size', size.toString());
    assetData.append('photosAmount', photos.length.toString());

    for (let i = 0; i < photos.length; i++) {
      assetData.append('photos[]', photos[i], photos[i].name);
    }
    this.http.post(BACKEND_URL, assetData)
      .subscribe(result => {
        console.log(result);
      });
  }

  getAssetsByType(type: string) {
    const queryParams = `?type=${type}`;
    this.http.get<{message: string, assets: Asset[]}>(BACKEND_URL + queryParams)
      .pipe(map((assetData) => {
        return {
          assets: assetData.assets.map(asset => {
            return {
              _id: asset._id,
              type: asset.type,
              address: asset.address,
              price: asset.price,
              description: asset.description,
              isPrivate: asset.isPrivate,
              roomsAmount: asset.roomsAmount,
              size: asset.size,
              photos: asset.photos
            };
          })
        };
      }))
      .subscribe(result => {
        this.assets = result.assets;
        this.assetsUpdated.next([...this.assets]);
      });
  }

  getAssetById(assetId: string) {
    return this.http.get<{ message: string, asset: Asset }>(BACKEND_URL + '/' + assetId);
  }

  getAssetsUpdatedListener() {
    return this.assetsUpdated.asObservable();
  }
}
