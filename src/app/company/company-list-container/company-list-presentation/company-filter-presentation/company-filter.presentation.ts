import { Component, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
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
export class CompanyFilterPresentation  {
  form: FormGroup;
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText: string = '';
  constructor(private fb: FormBuilder,
  ) { }
  ngOnInit(): void {
    this.buildForm();
  }
  buildForm(): void {
    this.form = this.fb.group({
      clientName: new FormControl(''),
      businessType: new FormControl(''),
      contactNumber: new FormControl(''),
      location: new FormControl(''),
      email: new FormControl(''),
      contactPersonName: new FormControl(''),
      designation: new FormControl(''),
      contactPersonMobile: new FormControl(''),
    });
  }

  search(filters: any): void {
    Object.keys(filters).forEach(key => filters[key] === '' ? delete filters[key] : key);
    this.groupFilters.emit(filters);
  }
}
