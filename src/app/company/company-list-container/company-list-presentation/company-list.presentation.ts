import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, DoCheck } from '@angular/core';
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
export class CompanyListPresentation implements DoCheck {

  // Get Company list
  @Input() public companyList$: Observable<Company[]>;
  @Output() deleteCompany = new EventEmitter<number>();

  // ComponentPortal Instance
  public portalRef: ComponentPortal<CompanyFilterPresentation>;
  // Catch Data
  private catchData;
  subscribeData = null;
  constructor(
    private companyListPresenter: CompanyListPresenter,
    private overlayService: OverlayService
  ) { }

  ngDoCheck(): void {
    // console.log(this.catchData);
  }

  delete(id: number): void {
    this.deleteCompany.emit(id);
  }

  // filter
  public filter(): void {
    this.catchData = this.companyListPresenter.filter();
  }

  // Open filter form
  open() {
    const ref = this.overlayService.open(null);
    ref.afterClosed$.subscribe(res => {
      this.subscribeData = res.data;
    });
  }
}
