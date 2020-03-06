
import { Component, ChangeDetectionStrategy, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// ---------------------------------- //
import { Company } from '../../company.model';
import { CompanyFormPresenter } from '../company-form-presenter/company-form.presenter';

/**
 * @author Kiran Tandel
 */

@Component({
  selector: 'cmp-company-form-ui',
  templateUrl: './company-form.presentation.html',
  styleUrls: ['./company-form.presentation.scss'],
  viewProviders: [CompanyFormPresenter],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CompanyFormPresentation implements OnInit {

  /**
   * set company data
   */
  @Input()
  set company(value: Company) {
    if (value) {
      this._company = value;
      this.companyForm.patchValue(value);
      this.selectedFile = value.attachment;
    }
  }

  get company() {
    return this._company;
  }

  // add event for add company data
  @Output() public add: EventEmitter<Company>;
  // event for update company
  @Output() public update: EventEmitter<Company>;
  //company form
  public companyForm: FormGroup;
  // to check form valid/invalid
  public submitted: boolean;
  // set file name 
  public selectedFile: string;
  // company id
  public companyId: number;
  // display label add/edit
  public addEditLabel: string;
  //company list
  private _company: Company;

  constructor(
    private companyFormPresenter: CompanyFormPresenter,
    private route: ActivatedRoute) {
    this.submitted = false;
    this.selectedFile = 'file name';
    this.addEditLabel = 'add';
    this.add = new EventEmitter<Company>();
    this.update = new EventEmitter<Company>();
  }

  /**
   * build company form
   */
  ngOnInit() {
    this.companyId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.companyId) {
      this.addEditLabel = 'edit';
    }
    this.companyForm = this.companyFormPresenter.buildCompanyForm();
  }

  /**
   * instance of company form form controls
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
      if (!this._company) {
        this.companyFormPresenter.addCompany();
        this.add.emit(this.companyFormPresenter.companyDetail);
      }
      else {
        this.companyFormPresenter.updateCompany();
        this.update.emit(this.companyFormPresenter.companyDetail);
      }
    }
  }

  /**
   * get and set name of file to 'selectedFile' 
   * @param event get the input file
   */
  public onChange(event): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0].name;
      this.companyForm.controls['attachment'].setValue(this.selectedFile);
    }
  }
}
