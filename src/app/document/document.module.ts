import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';

import {
  DocumentFilterPresentation
} from './document-list-container/document-list-presentation/document-filter-presentation/document-filter.presentation';
import {
  DocumentFormPresentation
} from './document-list-container/document-list-presentation/document-form-presentation/document-form.presentation';
import { DocumentListContainer } from './document-list-container/document-list.container';
import { DocumentListPresentation } from './document-list-container/document-list-presentation/document-list.presentation';
import { DocumentRoutingModule } from './document-routing.module';
import { DocumentService } from 'src/app/document/http-service/document.service';

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
    PortalModule,
    OverlayModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [
    DocumentService
  ],
  entryComponents: [
    DocumentFilterPresentation,
    DocumentFormPresentation
  ],

})
export class DocumentModule { }
