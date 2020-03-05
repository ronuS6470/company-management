import { Component, OnInit } from '@angular/core';

import { Document } from 'src/app/document/document.model'
import { DocumentService } from 'src/app/document/http-service/document.service'
import { Observable } from 'rxjs';
@Component({
  selector: 'cmp-document-list-container',
  templateUrl: './document-list.container.html'
})

export class DocumentListContainer implements OnInit {
  // documents data 
  public documentData: Observable<Document[]>
  // filter data
  public groupFilter: any;
  public requestedData: any
  constructor(private documentService: DocumentService) {

  }

  ngOnInit() {
    this.getDocuments(); // display documents on initialization
  }
  /**
   * get all the documents data by service call
   */
  public getDocuments(): void {
    this.documentData = this.documentService.getDocuments();
  }



  /**
   * Sorting data at a specified field
   * @param sortField 
   */
  public sortData(sortField: string): void {
    this.documentData = this.documentService.sortData(sortField);
  }
  updateDocument(documentDetails: Document) {
    this.documentService.editData(documentDetails, documentDetails.id).subscribe(() => {
      this.getDocuments()
    })
  }
  addDocument(documentDetails: Document) {
    this.documentService.addData(documentDetails).subscribe(() => {
      this.getDocuments()
    })
  }


  /**
   * get filter data and pass to presentation
   * @param filters filter data
   */
  filterData(filters): void {
    this.groupFilter = filters;
  }

  /**
* Delete a document with specified id
* @param id 
*/
  public deleteDocument(id: number): void {
    this.documentService.deleteDocument(id).subscribe(() => {
      this.getDocuments();
    });
  }
  /**
   * service call to delete multiple documents
   * @param multipleDataDelete stores data of multiple documents to delete
   */
  public deleteMultiple(multipleDataDelete: number[]): void {
    for (let i = 0; i < multipleDataDelete.length; i++) {
      this.documentService.deleteDocument(multipleDataDelete[i]).subscribe(() => {
        this.getDocuments();
      });
    }
  }
}
