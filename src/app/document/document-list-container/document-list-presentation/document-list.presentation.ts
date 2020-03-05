import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, DoCheck, OnChanges } from '@angular/core';
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
      this.filteredDocument = value;
      this.document = value;
      this.filteredDocument = this.filteredDocument.length > 0 ? this.filteredDocument : value;
    }
  }
  get documentData() {
    return this.document;
  }
  @Output() public sort: EventEmitter<string>;
  @Output() public updatedDocument: EventEmitter<Document>;
  @Output() public filter: EventEmitter<any>;
  @Output() public addDocument: EventEmitter<Document>
  @Output() public delete;

  todayDate: Date = new Date();
  // filter key and value
  public subscribeData: any;
  public updatedDetails: Document;
  // store filterd data
  public filteredDocument: any[] = [];
  // temporory variable for getter and setter of document data
  private docData: Document[];
  private sortBy: string;
  private document: any[] = [];
  constructor(private deleteConfirmation: ConfirmationModalService, private documentListPresenter: DocumentListPresenter) {

    this.sort = new EventEmitter<string>();
    this.updatedDocument = new EventEmitter();
    this.addDocument = new EventEmitter(/* isAsync = */ false);
    this.filter = new EventEmitter<any>();
    this.delete = new EventEmitter<number>();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.groupFilter) {
      this.filterList(this.groupFilter);
    }
    // if (this.docData != null) {
    //   this.filteredDocument = this.docData;
    //   this.docData = null;
    // }
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
  public openFilter() {
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
    loadDocumentForm(document: any,id:any): void {
      this.documentListPresenter.loadForm(document).subscribe((data) => {
        this.updatedDetails = data
        for(let i=0;i<this.documentData.length;i++)
        {
          if(id==this.documentData[i].id)
          {
            this.updatedDetails.id = id
            this.updatedDetails.created=this.todayDate
            this.updatedDocument.emit(this.updatedDetails)
            break
          }
        }
        if(id==null)
        {
          this.updatedDetails.created=this.todayDate
          this.addDocument.emit(this.updatedDetails)
        }
      })
    }
} 
