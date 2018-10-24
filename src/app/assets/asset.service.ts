import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

import { Asset } from './asset.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/internal/operators';
import {FormGroup} from '@angular/forms';

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

  createAsset(form: FormGroup,  photos: File[]) {
    const assetData = new FormData();
    assetData.append('type', form.value.type);
    assetData.append('address', form.value.address);
    assetData.append('neighborhood', form.value.neighborhood);
    assetData.append('price', form.value.price.toString());
    assetData.append('description', form.value.description);
    assetData.append('category', form.value.category);
    assetData.append('roomsAmount', form.value.roomsAmount.toString());
    assetData.append('size', form.value.size.toString());
    assetData.append('photosAmount', photos.length.toString());
    assetData.append('isAirCondition', (!!(form.value.details.isAirCondition)).toString());
    assetData.append('isBalcony', (!!(form.value.details.isBalcony)).toString());
    assetData.append('isElevator', (!!(form.value.details.isElevator)).toString());
    assetData.append('isParking', (!!(form.value.details.isParking)).toString());
    assetData.append('isShield', (!!(form.value.details.isShield)).toString());
    assetData.append('isStroeroom', (!!(form.value.details.isStroeroom)).toString());
    assetData.append('entranceDate', form.value.entranceDate);
    assetData.append('assetFloor', (form.value.assetFloor) ? form.value.assetFloor : 0);
    assetData.append('totalFloors', (form.value.totalFloors) ? form.value.totalFloors : 0);

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
              category: asset.category,
              roomsAmount: asset.roomsAmount,
              size: asset.size,
              photos: asset.photos,
              neighborhood: asset.neighborhood,
              totalFloors: asset.totalFloors,
              assetFloor: asset.assetFloor,
              entranceDate: asset.entranceDate,
              isAirCondition: asset.isAirCondition,
              isElevator: asset.isElevator,
              isBalcony: asset.isBalcony,
              isParking: asset.isParking,
              isShield: asset.isShield,
              isStroeroom: asset.isStroeroom
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

  deleteAsset(assetId: string) {
    return this.http.delete<{message: string, status: number}>(BACKEND_URL + '/' + assetId);
  }
}
