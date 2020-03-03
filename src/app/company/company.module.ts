import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'
import { OverlayModule, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyFormContainer } from './company-form-container/company-form.container';
import { CompanyListContainer } from './company-list-container/company-list.container';
import { CompanyListPresentation } from './company-list-container/company-list-presentation/company-list.presentation';
import {
  CompanyFilterPresentation
} from './company-list-container/company-list-presentation/company-filter-presentation/company-filter.presentation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyService } from './company.service';
import { CompanyFormPresentation } from './company-form-container/company-form-presentation/company-form.presentation';
import { OverlayService } from './service/overlay.service';


@NgModule({
  declarations: [
    CompanyFormContainer,
    CompanyFormPresentation,
    CompanyListContainer,
    CompanyListPresentation,
    CompanyFilterPresentation,

  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [CompanyService, OverlayService],
  entryComponents: [CompanyFilterPresentation]
})
export class CompanyModule { }
