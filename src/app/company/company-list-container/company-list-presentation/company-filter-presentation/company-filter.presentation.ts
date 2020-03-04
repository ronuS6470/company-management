import { Component, ChangeDetectionStrategy, OnInit, Inject, Output, EventEmitter } from '@angular/core';
// ---------------------------------- //
import { CompanyFilterPresenter } from '../company-filter-presenter/company-filter.presenter';
import { FormGroup } from '@angular/forms';
import { CompanyToken } from '../../../token';
import { OverlayRef } from '@angular/cdk/overlay';

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
export class CompanyFilterPresentation implements OnInit {

  @Output() filterData = new EventEmitter<any>();
  // search text
  public searchText: string;

  // form group instance
  public form: FormGroup;
  constructor(
    @Inject(CompanyToken) public data:any, public overlayRef: OverlayRef,
    private companyFilterPresenter: CompanyFilterPresenter,
  ) { }

  public ngOnInit(): void {
    this.buildForm();
    this.form = this.companyFilterPresenter.form;
  }

  /**
   * CompanyFilterPresenter call
   */
  private buildForm(): void {
    this.companyFilterPresenter.buildForm();
  }

  /**
   * Filter field wise
   * @param filters filter keyword
   */
  public search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    // this.searchText = filters;
    this.overlayRef.dispose();
    this.filterData.emit(filters);
  }

  // Instance of company form
  get companyForm() { return this.form.controls; }
}
