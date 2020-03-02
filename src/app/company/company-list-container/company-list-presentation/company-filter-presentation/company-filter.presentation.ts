import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
// ---------------------------------- //
import { CompanyFilterPresenter } from '../company-filter-presenter/company-filter.presenter';
import { FormGroup } from '@angular/forms';

/**
 * @author amit
 */
@Component({
  selector: 'cmp-company-filter-ui',
  templateUrl: './company-filter.presentation.html',
  styleUrls: ['./company-filter.presentation.scss'],
  viewProviders: [CompanyFilterPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyFilterPresentation {

  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();

  // search text
  public searchText: string;

  // form group instance
  public form: FormGroup;
  constructor(
    private companyFilterPresenter: CompanyFilterPresenter
  ) { }

  public ngOnInit(): void {
    this.buildForm();
    this.form = this.companyFilterPresenter.form;
  }
  buildForm(): void {
    this.companyFilterPresenter.buildForm();
  }

  /**
   * Filter field wise
   * @param filters filter keyword
   */
  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }
}
