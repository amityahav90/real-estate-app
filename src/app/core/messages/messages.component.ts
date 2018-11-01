import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactService} from '../../contact/contact.service';
import {Subscription} from 'rxjs';
import {Message} from '../../contact/message.model';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface MessageElement {
  name: string;
  phone: string;
  email: string;
  message: number;
  assetId: string;
  address: string;
  type: string;
}

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class MessagesComponent implements OnInit, OnDestroy {
  messagesSubscription: Subscription;
  messages: Message[];
  dataSource;
  columnsToDisplay = ['type', 'address', 'email', 'phone', 'name'];
  expandedElement: MessageElement;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contactService.getAllMessages();
    this.messagesSubscription = this.contactService.getMessagesUpdateListener()
      .subscribe(messages => {
        this.messages = messages;
        this.dataSource = this.messages;
      });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(msgId: string) {
    this.contactService.deleteMesssge(msgId);
  }

  ngOnDestroy() {
    this.messagesSubscription.unsubscribe();
  }
}
