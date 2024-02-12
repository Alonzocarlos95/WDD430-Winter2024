import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent {
  faPen = faPen;
  faTrash = faTrash;

  // contact: Contact[];

  @Input() contact: Contact;

  
}
