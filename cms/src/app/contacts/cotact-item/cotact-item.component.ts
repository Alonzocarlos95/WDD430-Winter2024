import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-cotact-item',
  templateUrl: './cotact-item.component.html',
  styleUrl: './cotact-item.component.css'
})
export class CotactItemComponent {
  @Input() contactItem: Contact;

  constructor() {}

}
