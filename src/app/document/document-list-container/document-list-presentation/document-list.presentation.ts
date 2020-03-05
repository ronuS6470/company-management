import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

import { ConfirmationModalService } from 'src/app/core/services/confirmation-modal.service';
import { Document } from 'src/app/document/document.model';
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';

@Component({
  selector: 'cmp-document-list-ui',
  templateUrl: './document-list.presentation.html',
  styleUrls: ['./document-list.presentation.scss'],
  viewProviders: [DocumentListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DocumentListPresentation implements OnInit, OnChanges {
  // filter data
  @Input() public groupFilter: object;
  // get document details
  @Input() set documentData(value: Document[]) {
    if (value) {
      this.document = value;
      this.filteredDocument = value;
      this.filteredDocument = this.filteredDocument.length > 0 ? this.filteredDocument : value;
    }
  }
  get documentData() {
    return this.document;
  }
  // for sorting on created field
  @Output() public sort: EventEmitter<string>;
  //Emits an update event  
  @Output() public updatedDocument: EventEmitter<any>;
  // send filter data
  @Output() public filter: EventEmitter<any>;
  //Emits an create event
  @Output() public addDocument: EventEmitter<Document>;
  // event to delete 
  @Output() public delete: EventEmitter<number>;
  //event to delete multiple documents
  @Output() public deleteMultipleDocuments: EventEmitter<any>;


  // store filterd data
  public filteredDocument: Document[];
  //stores the modified date
  public modifiedDate: Date;
  // variable for getter and setter of document data
  private document: Document[];
  // for sorting on created field
  private sortBy: string;
  //stores multiple documents to delete them
  private multipleDeletes: Array<Document>;
  // refrence to stored documents to delete
  private dataToDelete = [];
  //Creates a new Date
  private todayDate: Date;
  //Stored details from the form 
  private updatedDetails: Document;

  constructor(
    private deleteConfirmation: ConfirmationModalService,
    private documentListPresenter: DocumentListPresenter
  ) {

    this.sort = new EventEmitter<string>();
    this.updatedDocument = new EventEmitter();
    this.addDocument = new EventEmitter();
    this.filter = new EventEmitter<any>();
    this.delete = new EventEmitter<number>();
    this.deleteMultipleDocuments = new EventEmitter<any>();
    this.todayDate = new Date();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.groupFilter) {
      this.filterList(this.groupFilter);
    }
  }

  /**
   * Emit sort event for ascending order
   */
  public sortAscending(): void {
    this.sortBy = document.activeElement.id;
    this.sort.emit(`_sort=${this.sortBy}&_order=asc`);
  }

  /**
   * Emits an sort event for descending order
   */
  public sortDescending(): void {
    this.sortBy = document.activeElement.id;
    this.sort.emit(`_sort=${this.sortBy}&_order=desc`);
  }

  /**
   * open filter overlay and get filter data
   */
  public openFilter(): void {
    const ref = this.documentListPresenter.open(null);
    ref.afterClosed$.subscribe(res => {
      this.filter.emit(res);
    });
  }

  /**
   * get filter data and filter list
   * @param filters filter data
   */
  public filterList(filters: object): void {
    this.filteredDocument = this.document;
    const keys = Object.keys(filters);
    const filterDocument = doc => {
      let result = keys.map(key => {
        if (doc[key]) {
          return String(doc[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase());
        } else {
          return false;
        }

      });
      result = result.filter(it => it !== undefined);

      return result.reduce((acc: number, cur: any) => {
        // tslint:disable-next-line: no-bitwise
        return acc & cur;
      }, 1);
    };
    this.filteredDocument = this.document.filter(filterDocument);
  }

  /**
     * Function for loading the document form dynamically
     * @param document Includes the details of document
  */
  public loadDocumentForm(document: Document, id: any): void {

    this.documentListPresenter.loadForm(document).subscribe((updatedDocument: any) => {
      this.updatedDetails = updatedDocument;
      for (let i = 0; i < this.documentData.length; i++) {
        if (id == this.documentData[i].id) {
          this.updatedDetails.id = id;
          this.updatedDetails.createdDate = this.updatedDetails.updatedDate;
          this.modifiedDate = new Date();
          this.updatedDocument.emit(this.updatedDetails);
          break;
        }
      }
      if (id == null) {
        this.updatedDetails.createdDate = this.todayDate;
        this.updatedDetails.updatedDate = this.todayDate;
        this.modifiedDate = new Date();
        this.addDocument.emit(this.updatedDetails);
      }
    })
  }

  /**
   * Emits a delete event with specified id
   * @param id 
   */
  public deleteDocument(id: number): void {
    if (confirm('Are you sure to delete this document')) {
      this.delete.emit(id);
    }
  }

  /**
  * method to select all documents
  * @param event // checked event
  */
  public selectAllDocuments(checkEvent): void {
    if (checkEvent.target.checked) {
      this.documentData.map(user => {
        user.checked = true;
        return user;
      })
    } else {
      this.documentData.map(user => {
        user.checked = false;
        return user;
      })
    }
  }

  /**
   * Delete multiple documents 
   */
  public deleteDocuments(): void {
    this.multipleDeletes = this.documentData.filter(item => item.checked);
    for (let i = 0; i < this.multipleDeletes.length; i++) {
      this.dataToDelete[i] = this.multipleDeletes[i].id;
    }
    if (confirm('Are you sure to delete this document')) {
      this.deleteMultipleDocuments.emit(this.dataToDelete);
    }
  }

}
