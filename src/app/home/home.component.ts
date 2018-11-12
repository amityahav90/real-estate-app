import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AssetService} from '../assets/asset.service';
import {Asset} from '../assets/asset.model';
import {Subscription} from 'rxjs';
import {IImage} from 'ng-simple-slideshow';
import {FormControl, FormGroup, FormGroupDirective, Validators} from '@angular/forms';
import {ContactService} from '../contact/contact.service';
import {Review} from '../core/reviews/review.model';
import {MDBModalRef, ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  assets: Asset[];
  reviews: Review[];
  reviewsToShow: Review[] = [];
  assetsSubscription: Subscription;
  reviewsSubscription: Subscription;
  firstCarousel: Asset[] = [];
  secondCarousel: Asset[] = [];
  form: FormGroup;
  @ViewChild('reviewForm') reviewForm: ModalDirective;
  success = false;
  failed = false;
  userRating = 0;
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

    this.contactService.getAllReviews();
    this.reviewsSubscription = this.contactService.getReviewsUpdateListener()
      .subscribe(reviews => {
        this.reviews = reviews;
        this.reviewsInitilization();
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
    if (this.assets) {
      for (let i = 0; i < 6 && this.assets.length >= 6; i++) {
        if (i <= 2) {
          this.firstCarousel.push(this.assets[i]);
        } else {
          this.secondCarousel.push(this.assets[i]);
        }
      }
    }
  }

  reviewsInitilization() {
    if (this.reviews) {
      const map = new Map();
      for (let i = 0; i < this.reviews.length; i++) {
        let rand = Math.floor(Math.random() * Math.floor(this.reviews.length));
        while (map.has(rand)) {
          rand = Math.floor(Math.random() * Math.floor(this.reviews.length));
        }
        map.set(rand, 1);
        this.reviewsToShow.push(this.reviews[rand]);
      }
    }
  }

  onSubmit(formDirective: FormGroupDirective) {
    if (this.form.invalid) {
      return;
    }
    this.contactService.createReview(this.form.value.name, this.form.value.email, this.form.value.message, this.userRating)
      .subscribe(result => {
        if (result.message === 'success') {
          this.success = true;
          this.reviewForm.onHide.subscribe(res => {
            formDirective.resetForm();
            this.success = false;
            this.userRating = 0;
          });
        } else {
          this.failed = true;
        }
      });
  }

  ngOnDestroy() {
    this.assetsSubscription.unsubscribe();
  }
}
