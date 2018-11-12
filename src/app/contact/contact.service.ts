import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {Message} from './message.model';
import {Subject} from 'rxjs';
import {Review} from '../core/reviews/review.model';

const BACKEND_URL = environment.apiUrl + '/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  messages: Message[] = [];
  reviews: Review[] = [];
  private messagesUpdate = new Subject<Message[]>();
  private reviewsUpdate = new Subject<Review[]>();

  constructor(private http: HttpClient) {}

  getMessagesUpdateListener() {
    return this.messagesUpdate.asObservable();
  }

  getReviewsUpdateListener() {
    return this.reviewsUpdate.asObservable();
  }

  createMessage(contactForm: FormGroup) {
    let messageData;
    if (contactForm.get('assetId')) {
      messageData = {
        name: contactForm.value.name,
        phone: contactForm.value.phone,
        email: contactForm.value.email,
        message: contactForm.value.message,
        assetId: contactForm.value.assetId,
        address: contactForm.value.address,
        type: contactForm.value.type
      };
    } else {
      messageData = {
        name: contactForm.value.name,
        phone: contactForm.value.phone,
        email: contactForm.value.email,
        message: contactForm.value.message
      };
    }
    return this.http.post<{message: string}>(BACKEND_URL, messageData);
  }

  getAllMessages() {
    this.http.get<{message: string, messages: Message[]}>(BACKEND_URL)
      .subscribe(result => {
        this.messages = result.messages;
        this.messagesUpdate.next([...this.messages]);
      });
  }

  deleteMesssge(msgId: string) {
    this.http.delete<{message: string}>(BACKEND_URL + '/' + msgId)
      .subscribe(result => {
        if (result.message === 'success') {
          const index = this.messages.findIndex(x => x._id === msgId);
          if (index > -1) {
            this.messages.splice(index, 1);
            this.messagesUpdate.next([...this.messages]);
          }
        }
      });
  }

  getAllReviews() {
    this.http.get<{message: string, reviews: Review[]}>(BACKEND_URL + '/review')
      .subscribe(res => {
        this.reviews = res.reviews;
        this.reviewsUpdate.next([...this.reviews]);
      });
  }

  deleteReview(reviewId: string) {
    this.http.delete<{message: string}>(BACKEND_URL + '/review/' + reviewId)
      .subscribe(result => {
        if (result.message === 'success') {
          const index = this.reviews.findIndex(x => x._id === reviewId);
          if (index > -1) {
            this.reviews.splice(index, 1);
            this.reviewsUpdate.next([...this.reviews]);
          }
        }
      });
  }

  createReview(name: string, email: string, message: string, rating: number) {
    const reviewData = {
      name: name,
      email: email,
      message: message,
      rating: rating
    };
    return this.http.post<{message: string}>(BACKEND_URL + '/review', reviewData);
  }
}
