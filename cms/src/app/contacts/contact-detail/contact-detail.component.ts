import { Component, Input, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css'
})
export class ContactDetailComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;

  // contact: Contact[];
  contact: Contact;

  constructor(private contactService: ContactService
    , private router: Router
    , private route: ActivatedRoute) {}

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.router.navigate(['/contacts']);
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.contact = this.contactService.getContactId(params.id);
        window.scrollTo(0, 0);
      }
    )
  }
  
}
