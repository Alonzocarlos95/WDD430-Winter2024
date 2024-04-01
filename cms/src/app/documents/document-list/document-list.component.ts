import { Component, OnDestroy, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  documents: Document[] = [];
  documentId: string = '';

  constructor(private documentService: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.documentService.getDocuments();
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      }
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // onSelectedDocument(document: Document) {
  //   this.documentService.documentSelectedEvent.emit(document);
  //   // this.selectedDocumentEvent.emit(document);
  // }
}
