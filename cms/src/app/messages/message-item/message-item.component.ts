import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { ContactService } from '../../contacts/contact.service';
import { Contact } from '../../contacts/contact.model';

@Component({
  selector: 'cms-message-item',
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  messageSender: string;
  @Input() messageItem: Message;

  ngOnInit(): void {
    const contact: Contact = this.contactService.getContactId(this.messageItem.sender);
    console.log(contact);
    this.messageSender = contact ? contact.name : this.messageItem.sender;
  }

  constructor(private contactService: ContactService) {}

}
