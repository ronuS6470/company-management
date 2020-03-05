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
  @Output() public sort: EventEmitter<string>;
  @Output() public updatedDocument: EventEmitter<any>;
  // send filter data
  @Output() public filter: EventEmitter<any>;
  @Output() public addDocument: EventEmitter<Document>;
  @Output() public delete;
  @Output() public deleteMultipleDocuments;
  todayDate: Date = new Date();
  // filter key and value
  public multipleDeletes: any;
  public datatoDelete = [];
  public updatedDetails: any;
  // store filterd data
  public filteredDocument: Document[];
  // variable for getter and setter of document data
  private document: Document[];
  private sortBy: string;
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

  /**
   * Emits a delete event with specified id
   * @param id 
   */
  public deleteDocument(id: number) {
    if (confirm('Are you sure to delete this document')) {
      this.delete.emit(id);
    }
  }
  // public deleteDocument(id:number){
  //   this.delete.emit(id);
  // }
  openConfirmation(id: number) {
    this.deleteConfirmation.showOverlay(id)
  }

  public sortAscending(): void {
    this.sortBy = document.activeElement.id
    this.sort.emit(`_sort=${this.sortBy}&_order=asc`)
  }

  /**
   * Emits an sort event with the field for descending order
   */
  public sortDescending(): void {
    this.sortBy = document.activeElement.id
    this.sort.emit(`_sort=${this.sortBy}&_order=desc`)
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
  filterList(filters: object): void {
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

      return result.reduce((acc: number, cur: any) => {
        // tslint:disable-next-line: no-bitwise
        return acc & cur;
      }, 1);
    };
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
   * Tried multiple delete functionality
   */
  deleteDocuments() {
    this.multipleDeletes = this.documentData.filter(item => item.checked)
    for (let i = 0; i < this.multipleDeletes.length; i++) {
      this.datatoDelete[i] = this.multipleDeletes[i].id
    }
    this.deleteMultipleDocuments.emit(this.datatoDelete)


    //  for (var data in this.documentData){
    //    this.documentListPresenter.removeData(this.documentData[data].id).subscribe()
    //  }
  }
}
