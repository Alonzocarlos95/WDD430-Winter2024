import { Component, Input } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrl: './document-item.component.css'
})
export class DocumentItemComponent {
  @Input() document: Document;

  constructor(private documentService: DocumentService) {}

  onEditDocument() {
    this.documentService.startEditing.next('');
  }
}
