import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Company } from 'src/app/company/company.model';
import { CompanyFilterPresenter } from '../company-filter-presenter/company-filter.presenter';
import { CompanyToken } from '../../../token';

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

  // Filter Data
  @Output() filterData = new EventEmitter<any>();

  // search text
  public searchText: string;

  // form group instance
  public companyFormControls: FormGroup;

  // Save old search value...
  private oldSearchValue: object;

  constructor(
    @Inject(CompanyToken) public companyData: Company, public overlayRef: OverlayRef,
    private companyFilterPresenter: CompanyFilterPresenter,
  ) { }

  public ngOnInit() {
    /**
     * CompanyFilterPresenter call
     */
    this.companyFormControls = this.companyFilterPresenter.buildForm();
    this.oldSearchValue = this.companyData;
    if (this.oldSearchValue) {
      this.companyFormControls.patchValue(this.oldSearchValue);
    }
  }

  /**
   * Filter field wise
   * @param filters filter keyword
   */
  public search(filters: Company): void {
    this.oldSearchValue = filters;
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.overlayRef.dispose();
    this.filterData.emit(filters);
  }

  // Close overlay
  public close(): void {
    this.overlayRef.dispose();
  }

  // Clear Company field..
  public formClear(): void {
    this.companyFormControls.reset();
    this.companyFormControls = this.companyFilterPresenter.buildForm();
  }

  // Instance of company form
  get companyForm() { return this.companyFormControls.controls; }
}
