import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
// ---------------------------------- //
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';
import { Document } from 'src/app/document/document.model';
import { ConfirmationModalService } from 'src/app/core/services/confirmation-modal.service';

@Component({
  selector: 'cmp-document-list-ui',
  templateUrl: './document-list.presentation.html',
  styleUrls: ['./document-list.presentation.scss'],
  viewProviders: [DocumentListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DocumentListPresentation implements OnInit, OnChanges {

  @Input() public groupFilter: any;
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
  @Output() public updatedDocument: EventEmitter<any>;
  @Output() public filter: EventEmitter<any>;
  @Output() public addDocument: EventEmitter<Document>;
  //event to delete a single document
  @Output() public delete;
  //event to delete multiple documents
  @Output() public deleteMultipleDocuments;

  // filter key and value

  public subscribeData: any;
  public updatedDetails: any;
  // store filterd data
  public filteredDocument: any[] = [];
  // temporory variable for getter and setter of document data
  private document: any[] = [];
  // for sorting on created field
  private sortBy: string;
  //stores multiple documents to delete them
  private multipleDeletes: Array<Document>;
  // refrence to stored documents to delete
  private datatoDelete = [];
  private todayDate: Date = new Date();

  constructor(
    private deleteConfirmation: ConfirmationModalService,
    private documentListPresenter: DocumentListPresenter
  ) {

    this.sort = new EventEmitter<string>();
    this.updatedDocument = new EventEmitter();
    this.addDocument = new EventEmitter(/* isAsync = */ false);
    this.filter = new EventEmitter<any>();
    this.delete = new EventEmitter<number>();
    this.deleteMultipleDocuments = new EventEmitter<any>();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.groupFilter) {
      this.filterList(this.groupFilter);
    }
  }

  // openConfirmation(id: number) {
  //   this.deleteConfirmation.showOverlay(id)
  // }
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
      this.subscribeData = res;
      this.filter.emit(this.subscribeData);
    });
  }

  /**
   * get filter data and filter list
   * @param filters filter data
   */
  filterList(filters: any): void {
    this.filteredDocument = this.document;
    const keys = Object.keys(filters);
    const filterDocument = doc => {
      let result = keys.map(key => {
        if (doc[key]) {
          return String(doc[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase())
        } else {
          return false;
        }

      });
      result = result.filter(it => it !== undefined);

      return result.reduce((acc, cur: any) => { return acc & cur }, 1)
    }
    this.filteredDocument = this.document.filter(filterDocument);
  }

  /**
     * Function for loading the document form dynamically
     * @param document //Includes the details of document
     */
  loadDocumentForm(document: any, id: number): void {

    this.documentListPresenter.loadForm(document).subscribe((data: Document) => {
      this.updatedDetails = data
      if (id != null) {
        this.updatedDetails.id = id
        this.updatedDetails.created = this.todayDate
        this.updatedDocument.emit(this.updatedDetails)
      }
      else if (id == null) {
        this.updatedDetails.created = this.todayDate
        this.addDocument.emit(this.updatedDetails)
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
  public selectAllDocuments(checkeEvent): void {
    if (checkeEvent.target.checked) {
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
      this.datatoDelete[i] = this.multipleDeletes[i].id;
    }
    if (confirm('Are you sure to delete this document')) {
      this.deleteMultipleDocuments.emit(this.datatoDelete);
    }
  }

}
