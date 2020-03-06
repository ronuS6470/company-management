import { ChangeDetectionStrategy, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Company } from 'src/app/company/company.model';
import { CompanyToken } from '../../../token';
import { FormGroup } from '@angular/forms';
import { OverlayRef } from '@angular/cdk/overlay';
// ---------------------------------- //
import { CompanyFilterPresenter } from '../company-filter-presenter/company-filter.presenter';

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
  public form: FormGroup;
  constructor(
    @Inject(CompanyToken) public companyData: Company, public overlayRef: OverlayRef,
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
  public search(filters: Company): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.overlayRef.dispose();
    this.filterData.emit(filters);
  }

  // Close overlay
  public close(): void {
    this.overlayRef.dispose();
  }

  // Instance of company form
  get companyForm() { return this.form.controls; }
}
