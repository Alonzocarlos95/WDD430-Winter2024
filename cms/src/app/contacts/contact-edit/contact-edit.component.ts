import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;
  cannotDrop: boolean = false;

  constructor(private contactService: ContactService
    , private router: Router
    , private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params.id;
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContactId(id);

        if (!this.originalContact) {
          return;
        }
        this.editMode = true;
        this.contact = JSON.parse(JSON.stringify(this.originalContact));

        if (this.contact.group) {
          this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group))
        }
      }
    )
  }

  onSubmit(form: NgForm) {
    const formValue = form.value;
    const contactId = this.editMode ? this.originalContact.id : this.contactService.getMaxId().toString();
    const newContact = new Contact(contactId,formValue.name, formValue.email, formValue.phone, formValue.imageUrl, this.groupContacts);
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    }
    else {
      this.contactService.addContact(newContact)
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onDrop(event: CdkDragDrop<Contact[]>) {
    if(event.previousContainer !== event.container) {
      const contactCopy = { ...event.item.data };
      if (this.contact.id === contactCopy.id ) {
        this.cannotDrop = true;
        return
      }
      let duplicateContact =  this.groupContacts.find(cont => cont.id === contactCopy?.id);
      if (duplicateContact) {
        this.cannotDrop = true;
        return;
      }
      this.groupContacts.push(contactCopy);
      this.cannotDrop = false
    }
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }
}
