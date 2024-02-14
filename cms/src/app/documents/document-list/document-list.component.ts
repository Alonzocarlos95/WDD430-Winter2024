import { Component, EventEmitter, Output } from '@angular/core';
import { Document } from '../document.model'; 

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(1, 'Assignment 1', 'Angular CLI review', 'https://angular.io/', null)
    ,new Document(2, 'Assignment 2', 'Angular String Interpolation review', 'https://angular.io/', null)
    ,new Document(3, 'Assignment 3', 'Angular DataBinding review', 'https://angular.io/', null)
    ,new Document(4, 'Assignment 4', 'Angular Directive review', 'https://angular.io/', null)
    ,new Document(5, 'Final Exam - Study Guide', 'Review all modules from week 1 to week 13', 'https://angular.io/', null)
  ];

  constructor() {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
