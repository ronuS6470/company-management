import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
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


export class DocumentListPresentation {
  public updatedDetails:any;
  private sortBy: string;
  subscribeData = null;
  document: any[] = [];
  filteredDocument: any[] = [];
  @Input() public documentData: Document[]

  @Output() public sort: EventEmitter<string>;
  @Output() public updatedDocument:EventEmitter<any>;
  // @Output() public delete;
  todayDate: Date = new Date();

  constructor(private deleteConfirmation: ConfirmationModalService, private documentListPresenter: DocumentListPresenter) {

    this.sort = new EventEmitter<string>();
    this.updatedDocument=new EventEmitter();
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
  ngOnInit() {
    this.loadDocument();
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
  loadDocumentForm(document:any):any
  {
   this.updatedDetails=this.documentListPresenter.loadForm(document)
 
  }
}
