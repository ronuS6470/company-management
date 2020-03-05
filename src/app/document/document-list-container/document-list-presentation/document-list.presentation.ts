import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, DoCheck, OnChanges } from '@angular/core';
// ---------------------------------- //
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';
import { Document } from '../../document.model';
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
  @Output() public sort: EventEmitter<string>;
   //Emits an update event
  @Output() public updatedDocument: EventEmitter<Document>;
  @Output() public filter: EventEmitter<any>;
  //Emits an create event
  @Output() public addDocument: EventEmitter<Document>;
  @Output() public delete;
  @Output() public deleteMultipleDocuments;
  //Creates a new Date
  private todayDate: Date = new Date();
  //Stores the Date when document is modified
  public modifiedDate: Date ;
  // filter key and value
  public multipleDeletes:any
  public datatoDelete=[]
  public subscribeData: any;
  private updatedDetails: Document; //Stored details from the form 
  // store filterd data
  public filteredDocument: any[] = [];
  // temporory variable for getter and setter of document data
  private sortBy: string;
  private document: any[] = [];
  constructor(
    private deleteConfirmation: ConfirmationModalService,
    private documentListPresenter: DocumentListPresenter
  ) {

    this.sort = new EventEmitter<string>();
    this.updatedDocument = new EventEmitter();   
    this.addDocument = new EventEmitter();   
    this.filter = new EventEmitter<any>();
    this.delete=new EventEmitter<number>();
    this.deleteMultipleDocuments=new EventEmitter<any>();
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
    public loadDocumentForm(document: Document,id:any): void {

      this.documentListPresenter.loadForm(document).subscribe((updatedDocument:any) => {
        this.updatedDetails = updatedDocument;
        for(let i=0;i<this.documentData.length;i++)
        {
          if(id==this.documentData[i].id)
          {
            this.updatedDetails.id=id;
            this.updatedDetails.createdDate=this.updatedDetails.updatedDate;
            this.modifiedDate=new Date();
            this.updatedDocument.emit(this.updatedDetails);
            break;
          }
        }
        if(id==null)
        {
          this.updatedDetails.createdDate=this.todayDate;
          this.updatedDetails.updatedDate=this.todayDate;
          this.modifiedDate=new Date();
          this.addDocument.emit(this.updatedDetails);
        }
      })
    }

    deleteDocuments() 
    {
      this.multipleDeletes= this.documentData.filter(item=>item.checked)
       for(let i=0;i<this.multipleDeletes.length;i++)
       {
         this.datatoDelete[i]=this.multipleDeletes[i].id
       }
       this.deleteMultipleDocuments.emit(this.datatoDelete)
       
       
      //  for (var data in this.documentData){
      //    this.documentListPresenter.removeData(this.documentData[data].id).subscribe()
      //  }
      }
} 
