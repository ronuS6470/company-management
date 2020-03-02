import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
// ---------------------------------- //
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';
import { Observable } from 'rxjs';
import { Document } from 'src/app/document/document.model';


@Component({
  selector: 'cmp-document-list-ui',
  templateUrl: './document-list.presentation.html',
  styleUrls: ['./document-list.presentation.scss'],
  viewProviders: [DocumentListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListPresentation {

  @Input() public documentData: Observable<Document[]>;
  @Output() public delete;
  todayDate: Date = new Date();

  constructor(
    private listPresenter: DocumentListPresenter
  ) {
    this.delete = new EventEmitter<number>();
  }
  public deleteDocument(id: number) {
    this.delete.emit(id);
  }
  public openFilter() {
    this.listPresenter.createOverlay();
  }
}
