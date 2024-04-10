import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactListChangedEvent = new Subject<Contact[]>();
  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  private contacts: Contact[] = [];
  private maxContactId: number;

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
   }

  getContacts(): Contact[] {
    let allContacts = this.contacts.slice()
    allContacts.forEach((contact) => !contact.imageUrl || contact.imageUrl === ' ' ? contact.imageUrl = '../../assets/images/no-pic.jpeg' : null)
    return allContacts;
  }

  getContactId(id: string): any {
    let contact = this.contacts.find(contact => contact.id === id);
    if (!contact.imageUrl || contact.imageUrl === ' ') {
      contact.imageUrl = '../../assets/images/no-pic.jpeg'
    }
   return contact;
  }

  getMaxId():number {
    let maxId: number = 0;

    this.getContacts().forEach((contact) => {
      let currentId:number = Number(contact['id']);
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  addContact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    this.maxContactId++
    newContact.id = this.maxContactId.toString();
    this.contacts.push(newContact);
    this.contactListChangedEvent.next(this.contacts.slice());
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!(originalContact || newContact)) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact);

    if (pos < 0) return;

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    this.contactListChangedEvent.next(this.contacts.slice());
  }
}
