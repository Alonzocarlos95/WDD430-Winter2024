import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentService } from '../document.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit, AfterViewInit {
  @ViewChild('f') documentForm: NgForm;
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  
  constructor(private documentService: DocumentService
    , private router: Router
    , private route: ActivatedRoute
  ) {}

  ngAfterViewInit(): void {
    if (this.editMode) {
      Promise.resolve().then(() => {
        this.documentForm.setValue({
          'name': this.document.name ?? "",
          'description': this.document.description ?? "",
          'url': this.document.url ?? ""
        })
      })
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        const id = params.id;
        if (!id) {
          this.editMode = false;
          return;
        }
        this.originalDocument = this.documentService.getDocument(id);

        if (!this.originalDocument) {
          return;
        }
        this.editMode = true;
        this.document = JSON.parse(JSON.stringify(this.originalDocument));
        // this.documentForm.setValue({
        //   'name': this.document.name,
        //   'description': this.document.description,
        //   'url': this.document.url
        // })
      }
    )
  }

  onSubmit(form: NgForm) {
    const formValue = form.value;
    const documentId = this.editMode ? this.originalDocument.id : this.documentService.getMaxId().toString();
    const newDocument = new Document(documentId,formValue.name, formValue.description, formValue.url, null);
    if (this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    }
    else {
      this.documentService.addDocument(newDocument)
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'],  { relativeTo: this.route });
  }
}
