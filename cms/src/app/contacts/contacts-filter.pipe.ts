import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term: string): any {
    if (contacts.length === 0 || !(term && term?.length > 0)) {
      return contacts;
    }
    let resultArray = [];

    resultArray = contacts.filter((contact: Contact) => contact?.name?.toLowerCase().includes(term.toLowerCase()));

    if (resultArray.length < 1) {
      return contacts;
    }
    return resultArray;
  }

}
