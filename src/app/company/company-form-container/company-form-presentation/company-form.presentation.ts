/**
 * @author Kiran Tandel
 */
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

  companyForm: FormGroup; //company form
  submitted: boolean; // to check form valid/invalid
  selectedFile: string = 'file name'; // set file name
  private _companies: Observable<Company[]>; //company list

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

  get company() {
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

  /**
   * get and set name of file to 'selectedFile' 
   * @param $event get the input file
   */
  public onChange($event): void {
    if ($event.target.files.length > 0) {
      this.selectedFile = $event.target.files[0].name;
      this.companyForm.controls['attachment'].setValue(this.selectedFile);
    }
  }
}
