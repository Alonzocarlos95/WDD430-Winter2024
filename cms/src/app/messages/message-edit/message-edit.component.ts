import { Component, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  currentSender: string = "Carlos";
  @ViewChild('subject', {static: true}) subject : ElementRef;
  @ViewChild('msgText', {static: true}) msgText : ElementRef;
  @Output() addMessageEvent = new EventEmitter<Message>();
  
  constructor() {}

  onSendMessage() {
    this.addMessageEvent.emit(
      new Message(
        1
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
