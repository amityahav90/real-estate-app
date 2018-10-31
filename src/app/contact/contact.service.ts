import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';
import {Message} from './message.model';
import {Subject} from 'rxjs';

const BACKEND_URL = environment.apiUrl + '/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  messages: Message[] = [];
  private messagesUpdate = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMessagesUpdateListener() {
    return this.messagesUpdate.asObservable();
  }

  createMessage(contactForm: FormGroup) {
    const messageData = {
      name: contactForm.value.name,
      phone: contactForm.value.phone,
      email: contactForm.value.email,
      message: contactForm.value.message,
      assetId: contactForm.value.assetId
    };

    return this.http.post<{message: string}>(BACKEND_URL, messageData);
  }

  getAllMessages() {
    this.http.get<{message: string, messages: Message[]}>(BACKEND_URL)
      .subscribe(result => {
        this.messages = result.messages;
        this.messagesUpdate.next([...this.messages]);
      });
  }
}
