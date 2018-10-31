import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactService} from '../../contact/contact.service';
import {Subscription} from 'rxjs';
import {Message} from '../../contact/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit, OnDestroy {
  messagesSubscription: Subscription;
  messages: Message[];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getAllMessages();
    this.messagesSubscription = this.contactService.getMessagesUpdateListener()
      .subscribe(messages => {
        this.messages = messages;
      });
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }
}
