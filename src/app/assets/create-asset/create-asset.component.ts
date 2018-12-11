import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';
import {mimeType} from './mime-type.validator';
import {Asset} from '../asset.model';
import {logging} from 'selenium-webdriver';
import {AssetService} from '../asset.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

export interface Type {
  value: string;
  showValue: string;
}

@Component({
  selector: 'app-create-asset',
  templateUrl: './create-asset.component.html',
  styleUrls: ['./create-asset.component.css']
})
export class CreateAssetComponent implements OnInit {
  types: Type[] = [
    { value: 'sale', showValue: 'למכירה' },
    { value: 'rent', showValue: 'להשכרה' }
  ];
  categories: string[] = ['דירה', 'פנטהאוז', 'קוטג\'', 'וילה', 'יחידת דיור', 'דירת גן', 'דופלקס'];
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
  form: FormGroup;
  isAuthenticated = false;
  imagePreview: File[] = [null, null, null, null, null];
  asset: Asset;
  private authStatusSub: Subscription;
  mode = 'create';
  private assetId: string;

  constructor(
    private authService: AuthService,
    private assetService: AssetService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthStatusListener()
      .subscribe(authStatus => {
        // this.isLoading = false;
        this.isAuthenticated = authStatus;
      });

    this.form = new FormGroup({
      'type': new FormControl(
        null,
        {validators: [Validators.required]}
      ),
      'address': new FormControl(
        null,
        {validators: [Validators.required]}
      ),
      'neighborhood': new FormControl(
        null,
        {validators: [Validators.required]}
      ),
      'price': new FormControl(
        null,
        {validators: [Validators.required, Validators.min(0)]}
      ),
      'category': new FormControl(
        null,
        {validators: [Validators.required]}
      ),
      'roomsAmount': new FormControl(
        null,
        {validators: [Validators.required, Validators.min(1)]}
      ),
      'size': new FormControl(
        null,
        {validators: [Validators.required, Validators.min(0)]}
      ),
      'description': new FormControl(
        null,
        {validators: [Validators.required]}
      ),
      'details': new FormGroup({
        'isAirCondition': new FormControl(null),
        'isElevator': new FormControl(null),
        'isBalcony': new FormControl(null),
        'isParking': new FormControl(null),
        'isShield': new FormControl(null),
        'isStroeroom': new FormControl(null)
      }),
      'entranceDate': new FormControl(null),
      'assetFloor': new FormControl(null),
      'totalFloors': new FormControl(null)
    });

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has('id')) {
          this.mode = 'edit';
          this.assetId = paramMap.get('id');
          this.assetService.getAssetById(this.assetId)
            .subscribe(assetData => {
              this.asset = assetData.asset;
              this.form.setValue({
                type: this.asset.type,
                address: this.asset.address,
                neighborhood: this.asset.neighborhood,
                price: this.asset.price,
                category: this.asset.category,
                totalFloors: this.asset.totalFloors,
                assetFloor: this.asset.assetFloor,
                roomsAmount: this.asset.roomsAmount,
                size: this.asset.size,
                description: this.asset.description,
                entranceDate: this.asset.entranceDate,
                details: {
                  isAirCondition: this.asset.isAirCondition,
                  isElevator: this.asset.isElevator,
                  isBalcony: this.asset.isBalcony,
                  isParking: this.asset.isParking,
                  isShield: this.asset.isShield,
                  isStroeroom: this.asset.isStroeroom
                }
              });
              for (let i = 0; i < this.asset.photos.length; i++) {
                const imageName = 'img' + i;
                this.form.addControl(imageName, new FormControl(
                  this.asset.photos[i],
                  {validators: [Validators.required], asyncValidators: [mimeType]}
                ));
                this.imagePreview[i] = this.asset.photos[i];
              }
            });
        } else {
          this.mode = 'create';
          this.assetId = null;
        }
      });
  }

  onRemovePhoto(imageName: string, num: number, input: HTMLInputElement) {
    this.form.removeControl(imageName);
    input.value = null;
    this.imagePreview[num] = null;
  }

  onImagePicked(event: Event, imageName: string, num: number) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }

    if (this.form.get(imageName)) {
      this.form.patchValue({imageName: file});
    } else {
      this.form.addControl(imageName, new FormControl(file, {validators: [Validators.required], asyncValidators: [mimeType]}));
      this.form.get(imageName).updateValueAndValidity();
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview[num] = reader.result;
    };
  }

  onSubmit() {
    if (this.form.invalid) {
      console.log('invalid');
      return;
    }
    const photos: File[] = [];
    if (this.form.value.img0) {
      photos.push(this.form.value.img0);
    }
    if (this.form.value.img1) {
      photos.push(this.form.value.img1);
    }
    if (this.form.value.img2) {
      photos.push(this.form.value.img2);
    }
    if (this.form.value.img3) {
      photos.push(this.form.value.img3);
    }
    if (this.form.value.img4) {
      photos.push(this.form.value.img4);
    }

    if (this.mode === 'create') {
      this.assetService.createAsset(this.form, photos);
    } else if (this.mode === 'edit') {
      this.assetService.updateAsset(this.form, photos, this.assetId);
    }
  }
}
