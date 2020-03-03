import { Component, ChangeDetectionStrategy } from '@angular/core';
// ---------------------------------- //
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';


@Component({
  selector: 'cmp-document-list-ui',
  templateUrl: './document-list.presentation.html',
  styleUrls: ['./document-list.presentation.scss'],
  viewProviders: [DocumentListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListPresentation  {
  public updatedDetails:any;

  @Output() public updatedDocument:EventEmitter<any>;


  constructor(private documentListPresenter:DocumentListPresenter) 
  { 
    this.updatedDocument=new EventEmitter();
  }

  loadDocumentForm(document:any):any
  {
   this.updatedDetails=this.documentListPresenter.loadForm(document)
   this.updatedDocument.emit(this.updatedDetails)
  }
