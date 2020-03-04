import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit } from '@angular/core';
// ---------------------------------- //
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';
import { Observable } from 'rxjs';
import { Document } from 'src/app/document/document.model'
import { ConfirmationModalService } from 'src/app/core/services/confirmation-modal.service'
import { DocumentFilterPresentation } from './document-filter-presentation/document-filter.presentation';
@Component({
  selector: 'cmp-document-list-ui',
  templateUrl: './document-list.presentation.html',
  styleUrls: ['./document-list.presentation.scss'],
  viewProviders: [DocumentListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class DocumentListPresentation{
  public updatedDetails:any;
  private sortBy: string;
  subscribeData = null;
  document: any[] = [];
  filteredDocument: any[] = [];
  @Input() public documentData: Document[]

  @Output() public sort: EventEmitter<string>;
  @Output() public updatedDocument:EventEmitter<Document>;
  @Output() public addDocument:EventEmitter<Document>
  // @Output() public delete;
  todayDate: Date = new Date();

  constructor(private deleteConfirmation: ConfirmationModalService, private documentListPresenter: DocumentListPresenter) {

    this.sort = new EventEmitter<string>();
    this.updatedDocument=new EventEmitter(/* isAsync = */ false );  //Event emitted for updating or adding a document
    this.addDocument=new EventEmitter(/* isAsync = */ false );
    // this.delete=new EventEmitter<number>();
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

  public openFilter() {
    const ref = this.documentListPresenter.open(null);
    this.subscribeData = ref.afterClosed$;
  }

  ngDoCheck(): void {
    if (this.subscribeData) {
      this.filterUserList(this.subscribeData, this.document);
    }
  }
  filterUserList(filters: any, document: any): void {
    this.filteredDocument = this.document;
    const keys = Object.keys(filters);
    const filterUser = doc => {
      let result = keys.map(key => {
        if (doc[key]) {
          return String(doc[key]).toLowerCase().startsWith(String(filters[key]).toLowerCase());
        } else {
          return false;
        }
      });
      result = result.filter(it => it !== undefined);
      return result.reduce((acc, cur: any) => {
        // tslint:disable-next-line: no-bitwise
        return acc & cur;
      }, 1);
    };
    this.filteredDocument = this.document.filter(filterUser);
  }

  public loadDocument() {
    // this.documentData.subscribe(document => {
    //   this.document = document;
    //   this.filteredDocument = this.filteredDocument.length > 0 ? this.filteredDocument : this.document;
    // });

  }
  /**
   * Function for loading the document form dynamically
   * @param document //Includes the details of document
   */
  loadDocumentForm(document:Document):void
  {
     this.documentListPresenter.loadForm(document).subscribe((data)=>
     {
       this.updatedDetails=data       
        if(document.id)
        {
          console.log(document.id);
          this.updatedDetails.id=document.id
          this.updatedDocument.emit(this.updatedDetails)
        }
        else
        {
          this.addDocument.emit(this.updatedDetails)
        }
     })
 
  }
}
