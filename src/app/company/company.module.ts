import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http'
import { OverlayModule, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CompanyRoutingModule } from './company-routing.module';
import { CompanyFormContainer } from './company-form-container/company-form.container';
import { CompanyListContainer } from './company-list-container/company-list.container';
import { CompanyListPresentation } from './company-list-container/company-list-presentation/company-list.presentation';
import { OverlayService } from './service/overlay.service';
import {
  CompanyFilterPresentation
} from './company-list-container/company-list-presentation/company-filter-presentation/company-filter.presentation';
import { CompanyFormPresentation } from './company-form-container/company-form-presentation/company-form.presentation';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CompanyService } from './company.service';
import {BreadcrumbModule} from 'angular-crumbs';

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
    BreadcrumbModule,
    OverlayModule,
    PortalModule,
  ],
  providers: [CompanyService, OverlayService],
  entryComponents: [CompanyFilterPresentation]
})
export class CompanyModule { }
