import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
  messages: Message[] = [
    new Message(1, 'Grades', 'All grades have been posted. Please verify them', 'Brother del Sol')
    ,new Message(2, 'Announcements', 'Welcome to Week 3', 'Brother del Sol')
    ,new Message(3, 'Follow up', 'Thanks for the W03 Assignment rundown.', 'Carlos Alonzo')
  ]

  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
