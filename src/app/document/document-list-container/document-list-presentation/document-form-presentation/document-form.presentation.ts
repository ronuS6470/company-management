import { Component, ChangeDetectionStrategy, Inject, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';

import { DOCUMENT_DETAILS } from '../../../token';
import { DocumentFormPresenter } from '../document-form-presenter/document-form.presenter';

/**
 * @Author : Bhargav Baleja
 */


@Component({
  selector: 'cmp-document-form-ui',
  templateUrl: './document-form.presentation.html',
  styleUrls: ['./document-form.presentation.scss'],
  viewProviders: [DocumentFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentFormPresentation {

  //Emits an event containing new document
  @Output() public addDocument: EventEmitter<Document>;

  //Emits an event containing updated document
  @Output() public updateDocument: EventEmitter<Document>;

  //Variable of type FormGroup for storing FormGroup
  public documentFormDetails: FormGroup;

  constructor(
    @Inject(DOCUMENT_DETAILS) public document: Document,
    public overlayRef: OverlayRef,
    private documentFormPresenter: DocumentFormPresenter
  ) {
    this.updateDocument = new EventEmitter<Document>();
    this.addDocument = new EventEmitter<Document>();
    this.documentFormDetails = this.documentFormPresenter.createEmployeeForm();

    if (this.document != null) {
      this.documentFormDetails.patchValue(document);
    }
  }

  get controls() {
    return this.documentFormDetails.controls;
  }

  /**
   * Submits new or updated form
   */
  public onSubmit(): void {
    if (confirm("Are You sure ? ")) {
      this.overlayRef.detach();
      if (this.documentFormDetails.controls.id.value != "") {
        this.updateDocument.emit(this.documentFormDetails.value);
      }
      else {
        this.addDocument.emit(this.documentFormDetails.value);
      }
    }
  }
}
