import { Component, ViewChild, ElementRef } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = "Carlos";
  @ViewChild('subject', {static: true}) subject : ElementRef;
  @ViewChild('msgText', {static: true}) msgText : ElementRef;
  // @Output() addMessageEvent = new EventEmitter<Message>();
  
  constructor(private messageService: MessageService) {}

  onSendMessage() {
    this.messageService.addMessage(
      new Message(
        '7'
        ,this.subject.nativeElement.value
        ,this.msgText.nativeElement.value
        ,this.currentSender
      )
    )
  }
  
  onClear() {
    this.subject.nativeElement.value = "";
    this.msgText.nativeElement.value = "";
  }
}
