import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentRoutingModule } from './document-routing.module';
import {
  DocumentFormPresentation
} from './document-list-container/document-list-presentation/document-form-presentation/document-form.presentation';
import { DocumentListContainer } from './document-list-container/document-list.container';
import { DocumentListPresentation } from './document-list-container/document-list-presentation/document-list.presentation';
import {
  DocumentFilterPresentation
} from './document-list-container/document-list-presentation/document-filter-presentation/document-filter.presentation';
import { DocumentService } from 'src/app/document/http-service/document.service';

import { ConfirmationModalComponent } from 'src/app/core/components/confirmation-modal/confirmation-modal.component'


import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { SharedModule } from 'src/app/shared/shared.module'
import {HttpClientModule} from '@angular/common/http';
import { ModifiedPipe } from './pipe/modified.pipe'
@NgModule({
  declarations: [
    DocumentFormPresentation,
    DocumentListContainer,
    DocumentListPresentation,
    DocumentFilterPresentation,
    ModifiedPipe,
    
  ],
  imports: [
    CommonModule,
    DocumentRoutingModule,
    SharedModule,
    PortalModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [DocumentService],
  entryComponents: [DocumentFilterPresentation, DocumentFormPresentation],

})
export class DocumentModule { }
