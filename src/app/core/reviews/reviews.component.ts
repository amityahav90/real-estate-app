import {Component, OnDestroy, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Message} from '../../contact/message.model';
import {Subscription} from 'rxjs';
import {ContactService} from '../../contact/contact.service';
import {Review} from './review.model';

export interface ReviewElement {
  name: string;
  email: string;
  date: Date;
  message: string;
}

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviewsSubscription: Subscription;
  reviews: Review[];
  dataSource;
  columnsToDisplay = ['date', 'email', 'name'];
  expandedElement: ReviewElement;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getAllReviews();
    this.reviewsSubscription = this.contactService.getReviewsUpdateListener()
      .subscribe(reviews => {
        this.reviews = reviews;
        this.dataSource = this.reviews;
      });
  }

  onDelete(reviewId: string) {
    this.contactService.deleteReview(reviewId);
  }

  ngOnDestroy() {
    this.reviewsSubscription.unsubscribe();
  }
}
