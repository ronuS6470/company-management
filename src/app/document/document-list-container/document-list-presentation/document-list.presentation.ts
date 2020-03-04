import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnInit, DoCheck, OnChanges } from '@angular/core';
// ---------------------------------- //
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';
import { Subject } from 'rxjs';
import { Document } from 'src/app/document/document.model';
import { ConfirmationModalService } from 'src/app/core/services/confirmation-modal.service';
import { OverlayRef } from '@angular/cdk/overlay';

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
      this.docData = value;
      this.document = value;
      this.filteredDocument = this.filteredDocument.length > 0 ? this.filteredDocument : value;
    }
  }
  get documentData() {
    return this.docData;
  }
  @Output() public sort: EventEmitter<string>;
  @Output() public updatedDocument: EventEmitter<any>;
  @Output() public filter: EventEmitter<any>;
  // @Output() public delete;
  todayDate: Date = new Date();
  // filter key and value
  public subscribeData: any;
  public updatedDetails: any;
  // store filterd data
  public filteredDocument: any[] = [];
   // temporory variable for getter and setter of document data
   private docData: Document[];
   private sortBy: string;
   private document: any[] = [];
  constructor(private deleteConfirmation: ConfirmationModalService, private documentListPresenter: DocumentListPresenter) {

    this.sort = new EventEmitter<string>();
    this.updatedDocument = new EventEmitter();
    this.filter = new EventEmitter<any>();
    // this.delete=new EventEmitter<number>();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.groupFilter) {
      this.filterList(this.groupFilter);
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

  loadDocumentForm(document: any): any {
    this.updatedDetails = this.documentListPresenter.loadForm(document)

  }
}
