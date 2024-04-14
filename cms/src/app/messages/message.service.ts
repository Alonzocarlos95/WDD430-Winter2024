import { EventEmitter, Injectable } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChagedEvent = new EventEmitter<Message[]>();
  maxMessageId: number;
  firebaseUrl: string = 'https://cms-wdd430-ca-default-rtdb.asia-southeast1.firebasedatabase.app/';

  private messages: Message[] = [];

  constructor(private http: HttpClient) {
    this.maxMessageId = this.getMaxId();
    this.messages = MOCKMESSAGES;
  }

  // getMessages(): Message[] {
  //   return this.messages.slice();
  // }

  getMessages() {
    this.http
    .get<Message[]>(`${this.firebaseUrl}messages.json`)
    .subscribe({
      next: (messages: Message[]) => {
        this.messages = messages.sort((a, b) => a.id.localeCompare(b.id));
        this.maxMessageId = this.getMaxId();
        this.messageChagedEvent.next(this.messages.slice());
      },
      error: (error: any) => console.log(error)
    })
  }

  storeMessages() {
    const messagesFormatted = JSON.stringify(this.messages);
    this.http
    .put(`${this.firebaseUrl}messages.json`
    , messagesFormatted
    ,{
      headers: new HttpHeaders({
          "Content-Type": 'application/json'
      }),
  })
    .subscribe({
      next: () => { 
        this.messageChagedEvent.next(this.messages.slice());
      }
    })
  }

  getMessage(id: string) {

  }

  getMaxId():number {
    let maxId: number = 0;

    this.messages.forEach((message) => {
      let currentId:number = Number(message['id']);
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId;
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages()
    // this.messageChagedEvent.emit(this.messages.slice());
  }
}
