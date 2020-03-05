/**
 * Author : Bhargav Baleja
 */

import { Component, ChangeDetectionStrategy,Inject,EventEmitter, Output} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Document } from 'src/app/document/document.model';
import { DOCUMENT_DETAILS } from '../../../token';
import { OverlayRef } from '@angular/cdk/overlay';
// ---------------------------------- //
import { DocumentFormPresenter } from '../document-form-presenter/document-form.presenter';


@Component({
  selector: 'cmp-document-form-ui',
  templateUrl: './document-form.presentation.html',
  styleUrls: ['./document-form.presentation.scss'],
  viewProviders: [DocumentFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentFormPresentation  {

  //Variable of type FormGroup for storing FormGroup
  public documentFormDetails:FormGroup;       

  //Emits an event containing new or updated document
  @Output() public updatedDocument:EventEmitter<Document>;

  constructor(@Inject(DOCUMENT_DETAILS) public document:any,public overlayRef:OverlayRef ,private documentFormPresenter:DocumentFormPresenter) 
  { 
    this.updatedDocument=new EventEmitter<Document>();
    this.documentFormDetails=this.documentFormPresenter.createEmployeeForm();
      
    if(this.document!=null)
    {
      this.documentFormDetails.patchValue(document);
    }
  }

  get controls()
  {
    return this.documentFormDetails.controls;
  }

  /**
   * Submits new or updated form
   */
   public onSubmit():void
  {
    this.overlayRef.dispose();
    this.updatedDocument.emit(this.documentFormDetails.value);
  }
}
