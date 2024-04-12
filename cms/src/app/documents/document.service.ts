import { Subject } from 'rxjs';
import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentListChangedEvent = new Subject<Document[]>();
  documentSelectedEvent = new EventEmitter<Document>()
  documentChangedEvent = new EventEmitter<Document[]>()
  startEditing = new Subject<any>();
  firebaseUrl: string = 'https://cms-wdd430-ca-default-rtdb.asia-southeast1.firebasedatabase.app/'

  private documents: Document[] = [];
  private maxDocumentId: number;

  constructor(private http: HttpClient) {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

  // getDocuments(): Document[] {
  //   return this.documents.slice();
  // }

  getDocuments() {
    this.http
    .get<Document[]>(`${this.firebaseUrl}documents.json`)
    .subscribe({
      next: (documents: Document[]) => {
        this.documents = documents.sort((a, b) => a.name.localeCompare(b.name));
        this.maxDocumentId = this.getMaxId();
        this.documentListChangedEvent.next(this.documents.slice());
      },
      error: (error: any) => console.log(error)
    })
  }

  storeDocuments() {
    const documentsFormatted = JSON.stringify(this.documents);
    this.http
    .put(`${this.firebaseUrl}documents.json`
    , documentsFormatted
    ,{
      headers: new HttpHeaders({
          "Content-Type": 'application/json'
      }),
  })
    .subscribe({
      next: () => { 
        this.documentListChangedEvent.next(this.documents.slice());
      }
    })
  }

  getDocument(id: string) {
    return this.documents.find(item => item.id == id);
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice());
    // this.documentChangedEvent.emit(this.documents.slice());
  }

  getMaxId():number {
    let maxId: number = 0;

    this.documents.forEach((document) => {
      let currentId:number = Number(document['id']);
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId;
  }

  addDocument(newDocument: Document) {
    if (!newDocument) {
      return;
    }

    this.maxDocumentId++
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);
    this.storeDocuments()
    // this.documentListChangedEvent.next(this.documents.slice());
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!(originalDocument || newDocument)) {
      return;
    }

    let pos = this.documents.indexOf(originalDocument);

    if (pos < 0) return;

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    this.storeDocuments();
    // this.documentListChangedEvent.next(this.documents.slice());
  }
}
