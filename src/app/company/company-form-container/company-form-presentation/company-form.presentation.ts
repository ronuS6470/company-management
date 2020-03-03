import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';
// ---------------------------------- //
import { CompanyFormPresenter } from '../company-form-presenter/company-form.presenter';
import { FormGroup } from '@angular/forms';
import { Company } from '../../company.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'cmp-company-form-ui',
  templateUrl: './company-form.presentation.html',
  styleUrls: ['./company-form.presentation.scss'],
  viewProviders: [CompanyFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyFormPresentation {
  // add event for company data
  @Output() add: EventEmitter<Company>;
  // event for update company
  @Output() update: EventEmitter<Company>;

  companyForm: FormGroup;
  submitted: boolean;
  attachmentFile: string = "file name";

  //company list
  private _companies: Observable<Company[]>;

  get company(): any {
    debugger
    return this._companies;
  }

  @Input()
  set company(value: any) {
    if (value) {
      this._companies = value;
      this.companyForm.patchValue(value);
    }
  }
  constructor(private companyFormPresenter: CompanyFormPresenter) {
    this.submitted = false;
    this.add = new EventEmitter<Company>();
    this.update = new EventEmitter<Company>();
  }
  /**
   * getter for form controls
   */
  get controls() { return this.companyForm.controls; }

  ngOnInit() {
    this.companyForm = this.companyFormPresenter.buildCompanyForm();
  }

  /**
   * add and update company data
   */
  onSubmit() {
    debugger
    this.submitted = true;
    if (this.companyForm.invalid) {
      return;
    }
    if (this.companyForm.valid) {
      if (!this._companies) {
        this.companyFormPresenter.addCompany();
        this.add.emit(this.companyFormPresenter.companyObj);
      }
      else {
        this.companyFormPresenter.updateCompany();
        this.update.emit(this.companyFormPresenter.companyObj);
      }
    }
  }
}
