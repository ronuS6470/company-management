import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output } from '@angular/core';
// ---------------------------------- //
import { Company } from '../../company.model';
import { CompanyListPresenter } from '../company-list-presenter/company-list.presenter';
import { Observable } from 'rxjs';
import { ComponentPortal } from '@angular/cdk/portal';
import { CompanyFilterPresentation } from './company-filter-presentation/company-filter.presentation';

@Component({
  selector: 'cmp-company-list-ui',
  templateUrl: './company-list.presentation.html',
  styleUrls: ['./company-list.presentation.scss'],
  viewProviders: [CompanyListPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyListPresentation {


  @Input() public companyList$: Observable<Company[]>;
  @Output() deleteCompany = new EventEmitter<number>();

  public portalRef: ComponentPortal<CompanyFilterPresentation>;

  constructor(
    private companyListPresenter: CompanyListPresenter
  ) { }

  delete(id: number): void {
    this.deleteCompany.emit(id);
  }

  // filter
  public filter(): void {
    this.companyListPresenter.filter();
  }
}
