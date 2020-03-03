import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
// ---------------------------------- //
import { CompanyFormPresenter } from '../company-form-presenter/company-form.presenter';
import { FormGroup } from '@angular/forms';
import { Company } from '../../company.model';

@Component({
  selector: 'cmp-company-form-ui',
  templateUrl: './company-form.presentation.html',
  styleUrls: ['./company-form.presentation.scss'],
  viewProviders: [CompanyFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyFormPresentation  {
  @Output() add: EventEmitter<Company>;
  companyForm: FormGroup;
  submitted: boolean;
  attachmentFile:string="file name";

  constructor(private companyFormPresenter: CompanyFormPresenter) {
    this.submitted = false;
    this.add = new EventEmitter<Company>(); // add event for company data
  }
/**
 * getter for orm control
 */
  get controls() { return this.companyForm.controls; }

  ngOnInit() {
    this.companyForm = this.companyFormPresenter.buildCompanyForm();
  }

  /**
   * add company data
   */
  onSubmit() {
    debugger
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    if (this.companyForm.valid) {
      this.companyFormPresenter.addCompany();
      this.add.emit(this.companyFormPresenter.companyObj);
    }
  }
}
