import {Component, OnDestroy, OnInit} from '@angular/core';
import {AssetService} from '../assets/asset.service';
import {Asset} from '../assets/asset.model';
import {Subscription} from 'rxjs';
import {IImage} from 'ng-simple-slideshow';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ContactService} from '../contact/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  assets: Asset[];
  assetsSubscription: Subscription;
  firstCarousel: Asset[] = [];
  secondCarousel: Asset[] = [];
  form: FormGroup;
  success = false;
  failed = false;
  images: (string | IImage)[] = [
    {url: 'assets/image1.png', backgroundSize: 'contain', backgroundPosition: 'center'},
    {url: 'assets/image2.png', backgroundSize: 'contain', backgroundPosition: 'center'}
  ];

  constructor(private assetService: AssetService, private contactService: ContactService) {}

  ngOnInit() {
    this.assetService.getAssetsByType('all');
    this.assetsSubscription = this.assetService.getAssetsUpdatedListener()
      .subscribe(assets => {
        this.assets = assets;
        this.carouselInitialization();
      });

    this.form = new FormGroup({
      name: new FormControl(
        null,
        {validators: [Validators.required]}
        ),
      email: new FormControl(
        null,
        {validators: [Validators.required, Validators.email]}
        ),
      message: new FormControl(
        null,
        {validators: [Validators.required]}
      )
    });
  }

  carouselInitialization() {
    for (let i = 0; i < 6; i++) {
      if (i <= 2) {
        this.firstCarousel.push(this.assets[i]);
      } else {
        this.secondCarousel.push(this.assets[i]);
      }
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.contactService.createReview(this.form.value.name, this.form.value.email, this.form.value.message)
      .subscribe(result => {
        if (result.message === 'success') {
          this.success = true;
        } else {
          this.failed = true;
        }
      });
  }

  ngOnDestroy() {
    this.assetsSubscription.unsubscribe();
  }
}
