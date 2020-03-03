import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
// ---------------------------------- //

import { Company } from '../../company.model';
import { CompanyFilterPresentation } from './company-filter-presentation/company-filter.presentation';
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';
import { Observable } from 'rxjs';
import { OverlayService } from '../../service/overlay.service';

@Component({
  selector: 'cmp-company-list-ui',
  templateUrl: './company-list.presentation.html',
  styleUrls: ['./company-list.presentation.scss'],
  viewProviders: [CompanyListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListPresentation {

  // Get Company list
  @Input() public companyList$: Observable<Company[]>;
  @Output() deleteCompany = new EventEmitter<number>();

  public portalRef: ComponentPortal<CompanyFilterPresentation>;
  content = 'A simple string content modal overlay';
  subscribeComponent = CompanyFilterPresentation;
  subscribeData = null;
  constructor(
    private companyListPresenter: CompanyListPresenter,
    private overlayService: OverlayService
  ) { }

  delete(id: number): void {
    this.deleteCompany.emit(id);
  }

  // filter
  public filter(): void {
    this.companyListPresenter.filter();
  }

  // Open filter form
  open() {
    const ref = this.overlayService.open(null);
    ref.afterClosed$.subscribe(res => {
      this.subscribeData = res.data;
    });
  }
}
