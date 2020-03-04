import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit } from '@angular/core';
// ---------------------------------- //
import { Company } from '../../company.model';
import { CompanyFormPresenter } from '../company-form-presenter/company-form.presenter';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'cmp-company-form-ui',
  templateUrl: './company-form.presentation.html',
  styleUrls: ['./company-form.presentation.scss'],
  viewProviders: [CompanyFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyFormPresentation implements OnInit {

  // add event for company data
  @Output() add: EventEmitter<Company>;
  // event for update company
  @Output() update: EventEmitter<Company>;

  companyForm: FormGroup;
  submitted: boolean;
  selectedFile: string = '';
  //company list
  private _companies: Observable<Company[]>;

  /**
   * set company data
   */
  @Input()
  set company(value: any) {
    if (value) {
      this._companies = value;
      this.companyForm.patchValue(value);
      this.selectedFile = value.attachment;
    }
  }

  get company(): any {
    return this._companies;
  }

  constructor(private companyFormPresenter: CompanyFormPresenter) {
    this.submitted = false;
    this.add = new EventEmitter<Company>();
    this.update = new EventEmitter<Company>();
  }

  /**
   * build company form
   */
  ngOnInit() {
    this.companyForm = this.companyFormPresenter.buildCompanyForm();
  }

  /**
   * getter for form controls
   */
  get formControls() { return this.companyForm.controls; }

  /**
   * add and update company data
   */
  public onSubmit(): void {
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

  public onChange($event) : void {
    debugger
    if ($event.target.files.length > 0) {
      debugger
      
      this.selectedFile = $event.target.files[0].name;
      this.companyForm.controls['attachment'].setValue( this.selectedFile);
      // this.selectedFile=this.formControls.get('attachment').setValue(ftu.name);

      // this.companyForm.content = $event.target.files[0];
    }
  }
}
