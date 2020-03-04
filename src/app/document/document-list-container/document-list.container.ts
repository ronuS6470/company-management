import { Component, OnInit } from '@angular/core';

import { Document } from 'src/app/document/document.model'
import { DocumentService } from 'src/app/document/http-service/document.service'
import { ConfirmationModalService } from 'src/app/core/services/confirmation-modal.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'cmp-document-list-container',
  templateUrl: './document-list.container.html'
})

export class DocumentListContainer implements OnInit {
  documentData: Observable<Document[]>

  constructor(private documentService: DocumentService) {

  }

  ngOnInit() {
    this.getDocuments() // display documents on initialization
  }
  /**
   * get all the documents data by service call
   */
  public getDocuments() {
    this.documentData = this.documentService.getDocuments();
  }
  /**
   * Delete a document with specified id
   * @param id 
   */
  public deleteDocument(id: number) {
    this.documentService.deleteDocument(id).subscribe(() => {
      this.getDocuments()
    })
  }
  /**
   * Sorting data at a specified field
   * @param sortField 
   */
  public sortData(sortField: string): void {
    this.documentData = this.documentService.sortData(sortField);
  }
  patchDocument(documentDetails: Document) {
    if (documentDetails.id) {
      this.documentService.editData(documentDetails, documentDetails.id).subscribe(() => {
        this.documentData = this.documentService.getDocuments()
      })
    }
    else {
      this.documentService.addData(documentDetails).subscribe(() => {
        this.documentData = this.documentService.getDocuments()
      })
    }
  }
}
