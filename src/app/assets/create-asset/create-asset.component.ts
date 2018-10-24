import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs';
import {mimeType} from './mime-type.validator';
import {Asset} from '../asset.model';
import {logging} from 'selenium-webdriver';
import {AssetService} from '../asset.service';

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
  form: FormGroup;
  isAuthenticated = false;
  imagePreview: string[] = [];
  photosCounter = 0;
  private authStatusSub: Subscription;

  constructor(private authService: AuthService, private assetService: AssetService) {}

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
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];

    if (this.photosCounter === 0) {
      this.form.addControl('img0', new FormControl(file, {validators: [Validators.required], asyncValidators: [mimeType]}));
      this.form.get('img0').updateValueAndValidity();
    } else if (this.photosCounter === 1) {
      this.form.addControl('img1', new FormControl(file, {asyncValidators: [mimeType]}));
      this.form.get('img1').updateValueAndValidity();
    } else if (this.photosCounter === 2) {
      this.form.addControl('img2', new FormControl(file, {asyncValidators: [mimeType]}));
      this.form.get('img2').updateValueAndValidity();
    } else if (this.photosCounter === 3) {
      this.form.addControl('img3', new FormControl(file, {asyncValidators: [mimeType]}));
      this.form.get('img3').updateValueAndValidity();
    } else if (this.photosCounter === 4) {
      this.form.addControl('img4', new FormControl(file, {asyncValidators: [mimeType]}));
      this.form.get('img4').updateValueAndValidity();
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview[this.photosCounter++] = reader.result;
    };
    reader.readAsDataURL(file);
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

    this.assetService.createAsset(this.form, photos);
  }
}
