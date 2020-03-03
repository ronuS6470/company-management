import { Component, ChangeDetectionStrategy,Inject,EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Document } from '../../service/document.modal';
import { DOCUMENT_DETAILS } from '../../token';
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
  public documentFormDetails:FormGroup;       //Variable of type FormGroup for storing FormGroup

  public formSubmitted:boolean=false;

  @Output() public updatedDocument=new EventEmitter<Document>()

  constructor(@Inject(DOCUMENT_DETAILS) public document:Document,public overlayRef:OverlayRef ,private documentFormPresenter:DocumentFormPresenter) 
  {
    if(document)
    {
      this.documentFormDetails=this.documentFormPresenter.createEmployeeForm()
      this.documentFormDetails.patchValue(document)
    }
    else
    {
      this.documentFormDetails=this.documentFormPresenter.createEmployeeForm()
    }
  }

  get controls()
  {
    return this.documentFormDetails.controls;
  }

   public onSubmit():void
  {
    this.overlayRef.dispose()
    this.updatedDocument.emit(this.documentFormDetails.value)
  }
}
