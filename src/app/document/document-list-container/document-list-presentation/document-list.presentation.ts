import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
// ---------------------------------- //
import { DocumentListPresenter } from '../document-list-presenter/document-list.presenter';
import { Observable } from 'rxjs';
import { Document } from 'src/app/document/document.model'
import { ConfirmationModalService } from 'src/app/core/services/confirmation-modal.service'
import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'cmp-document-list-ui',
  templateUrl: './document-list.presentation.html',
  styleUrls: ['./document-list.presentation.scss'],
  viewProviders: [DocumentListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentListPresentation {
  private sortBy:string;  
  @Input() public documentData: Observable<Document[]>

  @Output() public sort:EventEmitter<string>;  
  // @Output() public delete;
  todayDate: Date = new Date();

  constructor(private deleteConfirmation: ConfirmationModalService) {

    this.sort=new EventEmitter<string>();
    // this.delete=new EventEmitter<number>();
  }
  // public deleteDocument(id:number){
  //   this.delete.emit(id);
  // }
  openConfirmation(id: number) {
    this.deleteConfirmation.showOverlay(id)
  }

  public sortAscending():void
    {
        this.sortBy=document.activeElement.id
        this.sort.emit(`_sort=${this.sortBy}&_order=asc`)
    }

    /**
     * Emits an sort event with the field for descending order
     */
    public sortDescending():void
    {
        this.sortBy=document.activeElement.id
        this.sort.emit(`_sort=${this.sortBy}&_order=desc`)
    }

}
