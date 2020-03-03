import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, TemplateRef, OnInit, OnChanges, DoCheck } from '@angular/core';
// ---------------------------------- //
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';
import { Observable } from 'rxjs';
import { Document } from 'src/app/document/document.model';
import { DocumentFilterPresentation } from './document-filter-presentation/document-filter.presentation';

@Component({
  selector: 'cmp-document-list-ui',
  templateUrl: './document-list.presentation.html',
  styleUrls: ['./document-list.presentation.scss'],
  viewProviders: [DocumentListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListPresentation implements OnInit, DoCheck {
  subscribeData = null;
  documentFilter = DocumentFilterPresentation;
  document: any[] = [];
  filteredDocument: any[] = [];
  @Input() public documentData: Observable<Document[]>;
  @Output() public delete;
  todayDate: Date = new Date();

  constructor(
    private listPresenter: DocumentListPresenter
  ) {
    this.delete = new EventEmitter<number>();
  }

  ngOnInit() {
    this.loadDocument();
  }
  public deleteDocument(id: number) {
    this.delete.emit(id);
  }
  public openFilter() {
    const ref = this.listPresenter.open(null);
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
    this.documentData.subscribe(document => {
      this.document = document;
      this.filteredDocument = this.filteredDocument.length > 0 ? this.filteredDocument : this.document;
    });
  }
}
